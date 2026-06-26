/**
 * Context Assessment — client application.
 *
 * Runs entirely in the browser. Answers live in a plain in-memory object and
 * are never written to storage or sent anywhere. Refreshing the page clears
 * everything by design.
 *
 * Flow: intro (privacy) → one step per section → results placed in context.
 */
import { ASSESSMENT, AREA_SECTIONS, type Question, type Section } from '../data/assessment';
import { contextFor, SOURCE_LIST, type Answers, type Position } from '../data/populationData';

type View = 'intro' | 'step' | 'results';

const root = document.getElementById('assessment-root');
if (root) {
  init(root);
}

function init(mount: HTMLElement) {
  const answers: Answers = {};
  let stepIndex = 0; // index into ASSESSMENT
  const totalSteps = ASSESSMENT.length;

  // Insight slug → title, provided by the page for result links.
  const titleEl = document.getElementById('insight-titles');
  const insightTitles: Record<string, string> = titleEl
    ? safeJson(titleEl.textContent) ?? {}
    : {};

  render('intro');

  function render(view: View) {
    mount.innerHTML = '';
    if (view === 'intro') mount.appendChild(renderIntro());
    else if (view === 'step') mount.appendChild(renderStep());
    else mount.appendChild(renderResults());
    // Move focus to the top of the new view for screen readers / keyboard.
    const focusTarget = mount.querySelector<HTMLElement>('[data-autofocus]');
    if (focusTarget) focusTarget.focus();
    else mount.querySelector('h2')?.scrollIntoView({ block: 'nearest' });
    window.scrollTo({ top: scrollAnchor(), behavior: 'smooth' });
  }

  function scrollAnchor(): number {
    const top = mount.getBoundingClientRect().top + window.scrollY;
    return Math.max(0, top - 90);
  }

  /* ---- Intro / privacy ------------------------------------------------- */
  function renderIntro(): HTMLElement {
    const wrap = el('div', { class: 'asmt-intro' });
    wrap.append(
      el('div', { class: 'asmt-privacy', role: 'note' }, [
        el('span', { class: 'asmt-privacy__icon', 'aria-hidden': 'true' }, [
          iconLock(),
        ]),
        el('div', {}, [
          el('p', { class: 'asmt-privacy__title' }, 'Before you start'),
          el(
            'p',
            {},
            'Your answers are used only to generate your context picture. Nothing is stored or transmitted. Everything runs in your browser and disappears when you close this page. No account, no tracking of answers.'
          ),
        ]),
      ]),
      el('p', { class: 'asmt-intro__meta muted' }, [
        `Six areas · about 20 honest questions · roughly 5 minutes. Every question is optional — skip anything you would rather not answer.`,
      ]),
      el('div', { class: 'asmt-actions asmt-actions--start' }, [
        button('Begin the assessment', 'btn btn--primary btn--lg', () => {
          stepIndex = 0;
          render('step');
        }, { autofocus: true }),
      ])
    );
    return wrap;
  }

  /* ---- A section step -------------------------------------------------- */
  function renderStep(): HTMLElement {
    const section = ASSESSMENT[stepIndex];
    const wrap = el('div', { class: 'asmt-step' });

    wrap.appendChild(renderProgress());

    const head = el('div', { class: 'asmt-step__head' }, [
      el('p', { class: 'asmt-step__eyebrow' }, `Section ${stepIndex + 1} of ${totalSteps}`),
      el('h2', { tabindex: '-1', 'data-autofocus': '' }, section.title),
      el('p', { class: 'asmt-step__intro muted' }, section.intro),
    ]);
    wrap.appendChild(head);

    const form = el('form', { class: 'asmt-questions', novalidate: 'true' });
    section.questions.forEach((q) => form.appendChild(renderQuestion(q)));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      goNext();
    });
    wrap.appendChild(form);

    const actions = el('div', { class: 'asmt-actions' });
    if (stepIndex > 0) {
      actions.appendChild(
        button('Back', 'btn btn--ghost', () => {
          stepIndex--;
          render('step');
        })
      );
    }
    const isLast = stepIndex === totalSteps - 1;
    actions.appendChild(
      button(
        isLast ? 'See my picture' : 'Continue',
        'btn btn--primary',
        () => goNext()
      )
    );
    wrap.appendChild(actions);

    if (stepIndex > 0) {
      wrap.appendChild(
        el('p', { class: 'asmt-skip' }, [
          linkButton('Skip this section', () => {
            section.questions.forEach((q) => delete answers[q.id]);
            goNext();
          }),
        ])
      );
    }

    return wrap;
  }

  function goNext() {
    if (stepIndex < totalSteps - 1) {
      stepIndex++;
      render('step');
    } else {
      render('results');
    }
  }

  function renderProgress(): HTMLElement {
    const pct = Math.round(((stepIndex + 1) / totalSteps) * 100);
    const wrap = el('div', { class: 'asmt-progress' });
    const track = el('div', {
      class: 'asmt-progress__track',
      role: 'progressbar',
      'aria-valuemin': '0',
      'aria-valuemax': '100',
      'aria-valuenow': String(pct),
      'aria-label': `Assessment progress: ${pct}%`,
    });
    const bar = el('div', { class: 'asmt-progress__bar' });
    bar.style.width = `${pct}%`;
    track.appendChild(bar);
    const dots = el('div', { class: 'asmt-progress__dots' });
    ASSESSMENT.forEach((s, i) => {
      dots.appendChild(
        el('span', {
          class: `asmt-progress__dot${i <= stepIndex ? ' is-done' : ''}`,
          title: s.title,
        })
      );
    });
    wrap.append(track, dots);
    return wrap;
  }

  /* ---- A single question ---------------------------------------------- */
  function renderQuestion(q: Question): HTMLElement {
    const field = el('fieldset', { class: 'asmt-q' });
    const legend = el('legend', { class: 'asmt-q__text' }, q.text);
    field.appendChild(legend);
    if (q.help) field.appendChild(el('p', { class: 'asmt-q__help' }, q.help));

    if (q.type === 'number') {
      field.appendChild(renderNumber(q));
    } else if (q.type === 'scale10') {
      field.appendChild(renderScale(q));
    } else {
      field.appendChild(renderChoice(q));
    }
    return field;
  }

  function renderNumber(q: Question): HTMLElement {
    const wrap = el('div', { class: 'asmt-number' });
    if (q.prefix) wrap.appendChild(el('span', { class: 'asmt-number__prefix' }, q.prefix));
    const input = el('input', {
      type: 'text',
      inputmode: 'numeric',
      class: 'asmt-number__input num',
      placeholder: q.placeholder ?? '',
      'aria-label': q.text,
      autocomplete: 'off',
    }) as HTMLInputElement;
    const existing = answers[q.id];
    if (existing !== undefined && existing !== '') input.value = String(existing);
    input.addEventListener('input', () => {
      const cleaned = input.value.replace(/[^0-9.\-]/g, '');
      if (cleaned !== input.value) input.value = cleaned;
      answers[q.id] = cleaned === '' || cleaned === '-' ? undefined : Number(cleaned);
    });
    wrap.appendChild(input);
    if (q.unit) wrap.appendChild(el('span', { class: 'asmt-number__unit' }, q.unit));
    return wrap;
  }

  function renderScale(q: Question): HTMLElement {
    const wrap = el('div', { class: 'asmt-scale' });
    const row = el('div', { class: 'asmt-scale__row', role: 'radiogroup', 'aria-label': q.text });
    for (let v = 1; v <= 10; v++) {
      const selected = Number(answers[q.id]) === v;
      const b = el(
        'button',
        {
          type: 'button',
          class: `asmt-scale__btn${selected ? ' is-selected' : ''}`,
          role: 'radio',
          'aria-checked': selected ? 'true' : 'false',
        },
        String(v)
      );
      b.addEventListener('click', () => {
        answers[q.id] = v;
        row.querySelectorAll('.asmt-scale__btn').forEach((n) => {
          n.classList.remove('is-selected');
          n.setAttribute('aria-checked', 'false');
        });
        b.classList.add('is-selected');
        b.setAttribute('aria-checked', 'true');
      });
      row.appendChild(b);
    }
    wrap.appendChild(row);
    wrap.appendChild(
      el('div', { class: 'asmt-scale__labels' }, [
        el('span', {}, q.lowLabel ?? 'Low'),
        el('span', {}, q.highLabel ?? 'High'),
      ])
    );
    return wrap;
  }

  function renderChoice(q: Question): HTMLElement {
    const wrap = el('div', { class: 'asmt-choice', role: 'radiogroup', 'aria-label': q.text });
    (q.options ?? []).forEach((opt) => {
      const selected = answers[q.id] === opt.value;
      const b = el(
        'button',
        {
          type: 'button',
          class: `asmt-choice__btn${selected ? ' is-selected' : ''}`,
          role: 'radio',
          'aria-checked': selected ? 'true' : 'false',
        },
        opt.label
      );
      b.addEventListener('click', () => {
        answers[q.id] = opt.value;
        wrap.querySelectorAll('.asmt-choice__btn').forEach((n) => {
          n.classList.remove('is-selected');
          n.setAttribute('aria-checked', 'false');
        });
        b.classList.add('is-selected');
        b.setAttribute('aria-checked', 'true');
      });
      wrap.appendChild(b);
    });
    return wrap;
  }

  /* ---- Results --------------------------------------------------------- */
  function renderResults(): HTMLElement {
    const wrap = el('div', { class: 'asmt-results' });

    const answeredCount = Object.values(answers).filter(
      (v) => v !== undefined && v !== ''
    ).length;

    wrap.appendChild(
      el('div', { class: 'asmt-results__head' }, [
        el('p', { class: 'eyebrow' }, 'Your honest picture'),
        el('h2', { tabindex: '-1', 'data-autofocus': '' }, 'Here is your life, placed in context.'),
        el(
          'p',
          { class: 'lede' },
          answeredCount === 0
            ? 'You didn’t answer anything yet — go back and try a few questions to see your context.'
            : 'There is no score here, on purpose. No grade, no verdict — just where your answers sit inside the real distribution of how people live, and what the research says about it.'
        ),
      ])
    );

    const areas = el('div', { class: 'asmt-areas' });
    AREA_SECTIONS.forEach((section) => {
      const block = renderAreaResult(section);
      if (block) areas.appendChild(block);
    });
    wrap.appendChild(areas);

    if (answeredCount > 0) wrap.appendChild(renderMattersBlock());

    wrap.appendChild(renderSources());

    wrap.appendChild(
      el('div', { class: 'asmt-results__actions' }, [
        button('Start over', 'btn btn--ghost', () => {
          for (const k of Object.keys(answers)) delete answers[k];
          stepIndex = 0;
          render('intro');
        }),
        link('Read the research library', '/research-library', 'btn btn--accent'),
      ])
    );

    wrap.appendChild(
      el('div', { class: 'asmt-results__disclaimer' }, [
        el(
          'p',
          { class: 'faint' },
          'Educational and informational only. Not medical, psychological, financial, or legal advice. If you are struggling, please reach out to a qualified professional.'
        ),
      ])
    );

    return wrap;
  }

  function renderAreaResult(section: Section): HTMLElement | null {
    const answered = section.questions.filter((q) => {
      const v = answers[q.id];
      return v !== undefined && v !== '' && !(typeof v === 'number' && isNaN(v));
    });
    if (answered.length === 0) return null;

    const block = el('section', { class: 'asmt-area' });
    block.appendChild(
      el('div', { class: 'asmt-area__head' }, [
        el('h3', {}, section.title),
        section.categorySlug
          ? link(
              'About this area →',
              `/${section.categorySlug}`,
              'asmt-area__link'
            )
          : el('span', {}),
      ])
    );

    const items = el('div', { class: 'asmt-area__items' });
    answered.forEach((q) => {
      const value = answers[q.id];
      const ctx = contextFor(q.id, value, answers);
      const item = el('div', { class: 'asmt-item' });
      item.appendChild(
        el('div', { class: 'asmt-item__top' }, [
          el('p', { class: 'asmt-item__q' }, q.text),
          el('p', { class: 'asmt-item__a num' }, displayAnswer(q, value)),
        ])
      );
      if (ctx) {
        item.appendChild(
          el('div', { class: `asmt-item__ctx pos-${ctx.position}` }, [
            el('span', { class: 'asmt-item__tag' }, ctx.tag),
            el('p', { class: 'asmt-item__stmt' }, ctx.statement),
          ])
        );
      }
      items.appendChild(item);
    });
    block.appendChild(items);

    if (section.researchNote) {
      block.appendChild(
        el('div', { class: 'asmt-note asmt-note--research' }, [
          el('span', { class: 'asmt-note__label' }, 'What the research says'),
          el('p', {}, section.researchNote),
        ])
      );
    }
    if (section.moreCommon) {
      block.appendChild(
        el('div', { class: 'asmt-note asmt-note--common' }, [
          el('span', { class: 'asmt-note__label' }, 'More common than people realise'),
          el('p', {}, section.moreCommon),
        ])
      );
    }

    if (section.insights && section.insights.length) {
      const links = el('div', { class: 'asmt-area__reading' });
      links.appendChild(el('span', { class: 'asmt-area__reading-label' }, 'Go deeper'));
      const ul = el('ul', {});
      section.insights.forEach((slug) => {
        const title = insightTitles[slug];
        if (title) {
          const li = el('li', {});
          li.appendChild(link(title, `/insights/${slug}`));
          ul.appendChild(li);
        }
      });
      if (ul.childElementCount > 0) {
        links.appendChild(ul);
        block.appendChild(links);
      }
    }

    return block;
  }

  function renderMattersBlock(): HTMLElement {
    const wrap = el('section', { class: 'asmt-matters' });
    wrap.appendChild(el('h3', {}, 'What the data says actually matters — and what matters less'));
    wrap.appendChild(
      el(
        'p',
        { class: 'muted' },
        'Across decades of wellbeing research, the inputs that move long-term life satisfaction are remarkably consistent — and remarkably different from what gets marketed as the path to a good life.'
      )
    );
    const cols = el('div', { class: 'asmt-matters__cols' });
    cols.append(
      mattersCol('Tends to matter most', 'matters', [
        'The quality of a few close relationships',
        'Physical and mental health',
        'A sense of meaning, contribution, or progress',
        'Escaping financial hardship and instability',
        'Autonomy over how you spend your days',
      ]),
      mattersCol('Matters less than people assume', 'matters-less', [
        'Income above a comfortable, stable level',
        'Hitting milestones on a particular schedule',
        'Status, prestige, and how you compare online',
        'Consumption and most one-off purchases',
        'Achieving a specific goal you imagined would fix things',
      ])
    );
    wrap.appendChild(cols);
    wrap.appendChild(
      el('p', { class: 'asmt-matters__src faint' }, [
        'Drawn from the broad wellbeing literature — see ',
        link('What the research shows about money and happiness', '/insights/what-the-research-actually-shows-about-money-and-happiness'),
        ' and ',
        link('what fulfilled people have in common', '/insights/what-people-who-feel-fulfilled-actually-have-in-common'),
        '.',
      ])
    );
    return wrap;
  }

  function mattersCol(heading: string, kind: string, items: string[]): HTMLElement {
    const col = el('div', { class: `asmt-matters__col asmt-matters__col--${kind}` });
    col.appendChild(el('h4', {}, heading));
    const ul = el('ul', {});
    items.forEach((t) => ul.appendChild(el('li', {}, t)));
    col.appendChild(ul);
    return col;
  }

  function renderSources(): HTMLElement {
    const wrap = el('details', { class: 'asmt-sources' });
    wrap.appendChild(el('summary', {}, 'The population data behind this picture'));
    const ul = el('ul', {});
    SOURCE_LIST.forEach((s) => ul.appendChild(el('li', {}, s)));
    wrap.appendChild(ul);
    return wrap;
  }

  /* ---- helpers --------------------------------------------------------- */
  function displayAnswer(q: Question, value: string | number | undefined): string {
    if (value === undefined) return '—';
    if (q.type === 'number') {
      const n = Number(value);
      const formatted = isNaN(n) ? String(value) : n.toLocaleString('en-US');
      return `${q.prefix ?? ''}${formatted}${q.unit ? ' ' + q.unit : ''}`.trim();
    }
    if (q.type === 'scale10') return `${value} / 10`;
    const opt = (q.options ?? []).find((o) => o.value === value);
    return opt ? opt.label : String(value);
  }
}

/* ---- tiny DOM utilities ------------------------------------------------ */
function el(
  tag: string,
  attrs: Record<string, string> = {},
  children?: string | (Node | string)[]
): HTMLElement {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else node.setAttribute(k, v);
  }
  if (typeof children === 'string') node.textContent = children;
  else if (Array.isArray(children)) {
    for (const c of children) node.append(c);
  }
  return node;
}

function button(
  label: string,
  cls: string,
  onClick: () => void,
  opts: { autofocus?: boolean } = {}
): HTMLElement {
  const b = el('button', { type: 'button', class: cls }, label);
  if (opts.autofocus) b.setAttribute('data-autofocus', '');
  b.addEventListener('click', onClick);
  return b;
}

function linkButton(label: string, onClick: () => void): HTMLElement {
  const b = el('button', { type: 'button', class: 'asmt-linkbtn' }, label);
  b.addEventListener('click', onClick);
  return b;
}

function link(label: string, href: string, cls = ''): HTMLElement {
  const a = el('a', cls ? { href, class: cls } : { href }, label);
  return a;
}

function safeJson<T = unknown>(text: string | null): T | null {
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

function iconLock(): SVGElement {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '20');
  svg.setAttribute('height', '20');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.7');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  const rect = document.createElementNS(ns, 'rect');
  rect.setAttribute('x', '4');
  rect.setAttribute('y', '10.5');
  rect.setAttribute('width', '16');
  rect.setAttribute('height', '10');
  rect.setAttribute('rx', '2');
  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', 'M8 10.5V7.5a4 4 0 0 1 8 0v3');
  svg.append(rect, path);
  return svg;
}

// Mark Position import as used for type-checkers in all branches.
export type { Position };
