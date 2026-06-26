/**
 * Population-data engine for the assessment.
 *
 * Every figure below is drawn from a real, named source (see SOURCE_LIST). The
 * job of this module is to take an answer and place it inside the actual
 * distribution — never to score, grade, or judge it. Output statements are
 * deliberately neutral: "around the middle", "more than most", "fewer than
 * most" — framing, not verdicts.
 *
 * Imported into the assessment page's client bundle.
 */

export type Position = 'lower' | 'around' | 'higher' | 'neutral';

export interface ContextResult {
  /** A neutral one-word tag, e.g. "Around the middle". */
  tag: string;
  position: Position;
  /** A plain, honest sentence placing the answer in context. */
  statement: string;
}

export type Answers = Record<string, string | number | undefined>;

const PARA = (s: string) => s;

/** SCF 2022 median net worth (USD) by age of household head. */
const NET_WORTH_MEDIAN: Record<string, number> = {
  '18-24': 39000, // under-35 figure; the youngest end is typically far lower
  '25-34': 39000,
  '35-44': 135600,
  '45-54': 247200,
  '55-64': 364500,
  '65+': 409900,
};

const NET_WORTH_LABEL: Record<string, string> = {
  '18-24': 'under 35',
  '25-34': 'under 35',
  '35-44': '35–44',
  '45-54': '45–54',
  '55-64': '55–64',
  '65+': '65–74',
};

/** US household income quintile upper thresholds, ~2023 Census (USD). */
const INCOME_Q = [33000, 63000, 101000, 165000];
const US_MEDIAN_HOUSEHOLD = 80610;

function fmtUSD(n: number): string {
  if (!isFinite(n)) return '$0';
  return '$' + Math.round(n).toLocaleString('en-US');
}

/* ---- Per-question contextualisers ------------------------------------- */

function incomeContext(value: number): ContextResult {
  let band: number;
  for (band = 0; band < INCOME_Q.length; band++) {
    if (value < INCOME_Q[band]) break;
  }
  const bandNames = [
    'in the lower fifth of U.S. household incomes',
    'in the second fifth of U.S. household incomes',
    'near the middle of U.S. household incomes',
    'in the upper-middle fifth of U.S. household incomes',
    'in roughly the top fifth of U.S. household incomes',
  ];
  const rel =
    value >= US_MEDIAN_HOUSEHOLD
      ? `above the U.S. median household income of about ${fmtUSD(US_MEDIAN_HOUSEHOLD)}`
      : `below the U.S. median household income of about ${fmtUSD(US_MEDIAN_HOUSEHOLD)}`;
  // Global framing — household income at the U.S. median is very high globally.
  const global =
    value >= 40000
      ? ' In global terms, a household income at this level places you among roughly the richest 10–15% of people on earth — a fact that rarely matches how it feels day to day.'
      : value >= 15000
        ? ' In global terms this is still above the income of most people alive, even though it can feel tight in a high-cost economy.'
        : '';
  const pos: Position = band <= 1 ? 'lower' : band >= 3 ? 'higher' : 'around';
  return {
    tag:
      band === 2
        ? 'Near the U.S. middle'
        : band <= 1
          ? 'Below the U.S. median'
          : 'Above the U.S. median',
    position: pos,
    statement: PARA(
      `An income of ${fmtUSD(value)} is ${rel}, placing you ${bandNames[band]}.${global}`
    ),
  };
}

function netWorthContext(value: number, age?: string): ContextResult {
  const key = age && NET_WORTH_MEDIAN[age] ? age : '35-44';
  const median = NET_WORTH_MEDIAN[key];
  const label = NET_WORTH_LABEL[key];
  const rel =
    value >= median
      ? `at or above the median for households ${label}`
      : `below the median for households ${label}`;
  const pos: Position = value >= median ? 'higher' : value >= median * 0.4 ? 'around' : 'lower';
  const note =
    value <= 0
      ? ' Having little or negative net worth is common, especially earlier in adult life — for U.S. households under 35 the median is only about $39,000, and many sit near zero.'
      : '';
  return {
    tag: value >= median ? 'At or above the age median' : 'Below the age median',
    position: pos,
    statement: PARA(
      `Median net worth for U.S. households ${label} is about ${fmtUSD(median)} (Federal Reserve, 2022). Your figure of ${fmtUSD(value)} is ${rel}.${note} Medians are not targets — half of people in any age group fall below them by definition.`
    ),
  };
}

function leftoverContext(value: number): ContextResult {
  if (value <= 0) {
    return {
      tag: 'A very common position',
      position: 'around',
      statement: PARA(
        'Having little or nothing left at the end of the month is extremely common: surveys regularly find around half of U.S. adults describe living paycheck to paycheck, and many could not cover a $400 emergency from savings (Federal Reserve, Economic Well-Being of U.S. Households). This is a feature of the cost of living, not a personal failing.'
      ),
    };
  }
  return {
    tag: 'Some monthly slack',
    position: 'neutral',
    statement: PARA(
      `Having about ${fmtUSD(value)} left in a typical month puts you ahead of the large share of households — often around half in U.S. surveys — who report little or nothing left over. The U.S. personal saving rate has recently hovered around 4–5% of disposable income, so consistent slack of any size is meaningful.`
    ),
  };
}

function stressContext(value: number): ContextResult {
  return {
    tag: value >= 6 ? 'Widely shared' : 'Common either way',
    position: 'neutral',
    statement: PARA(
      `Money is the single most commonly reported source of stress in large surveys — the American Psychological Association’s Stress in America work routinely finds the majority of adults citing money as a significant stressor. Rating your financial stress at ${value}/10 places you ${value >= 6 ? 'with the many adults who report substantial money stress regardless of income' : 'on the lower end, which is less common than people assume given how widespread money stress is'}.`
    ),
  };
}

function moneyFeelingContext(value: string): ContextResult {
  if (value === 'behind') {
    return {
      tag: 'The most common answer',
      position: 'around',
      statement: PARA(
        'Feeling behind financially is the most common response across nearly every income level. Because it is driven heavily by comparison and visible spending rather than by your actual position, the feeling and the facts frequently point in different directions.'
      ),
    };
  }
  if (value === 'ahead') {
    return {
      tag: 'Less common',
      position: 'neutral',
      statement: PARA(
        'Feeling ahead is the least common of the three answers. Notably, the feeling of being ahead or behind correlates only loosely with measured net worth — perception is shaped more by your reference group than by your balance sheet.'
      ),
    };
  }
  return {
    tag: 'A steady middle',
    position: 'around',
    statement: PARA(
      'Feeling "on track" is less common than feeling behind. Perceived financial standing is shaped more by who you compare yourself to than by your actual numbers.'
    ),
  };
}

function workHoursContext(value: number): ContextResult {
  const pos: Position = value >= 50 ? 'higher' : value <= 30 ? 'lower' : 'around';
  return {
    tag: value >= 50 ? 'More than most' : value <= 30 ? 'Fewer than most' : 'Around typical',
    position: pos,
    statement: PARA(
      `Across the OECD the average worker logs roughly 1,750 paid hours a year — about 34 a week averaged across the year — and U.S. full-time workers average closer to 40 paid hours plus a commute that averages about 27 minutes each way (BLS, OECD). At ${value} hours including commute, you are ${value >= 50 ? 'working more than the typical full-time worker' : value <= 30 ? 'below the typical full-time load, which many people reach through part-time or flexible arrangements' : 'close to the typical full-time range'}.`
    ),
  };
}

function screenContext(value: number): ContextResult {
  const perDay = value / 7;
  const pos: Position = perDay >= 4 ? 'higher' : perDay <= 1.5 ? 'lower' : 'around';
  return {
    tag: perDay >= 4 ? 'Above the reported average' : 'Within the common range',
    position: pos,
    statement: PARA(
      `Adults in the U.S. report roughly 3–4 hours a day of leisure screen time on average, and total media exposure measured by Nielsen is higher still. At about ${perDay.toFixed(1)} hours a day, you are ${perDay >= 4 ? 'above the self-reported average — which is common, and most people underestimate their own total' : perDay <= 1.5 ? 'below the self-reported average, which is less common than people think' : 'within the typical range'}. People consistently underestimate their own screen time, so honest figures here are unusually informative.`
    ),
  };
}

function freeTimeContext(value: string): ContextResult {
  if (value === 'notenough') {
    return {
      tag: 'The majority view',
      position: 'around',
      statement: PARA(
        'Feeling short of free time is the majority experience, even though time-use surveys record an average of roughly 4–5 hours of daily leisure for adults (American Time Use Survey). The leisure exists but is fragmented and often interrupted, which is why it rarely feels like enough.'
      ),
    };
  }
  return {
    tag: 'Less common',
    position: 'neutral',
    statement: PARA(
      'Feeling you have enough or even too much free time is less common than feeling short of it. Average measured leisure is about 4–5 hours a day, so this likely reflects how protected and unfragmented your time is, not just its quantity.'
    ),
  };
}

function scale10Context(
  value: number,
  opts: { lowCommon: string; midCommon: string; highCommon: string; label: string }
): ContextResult {
  let band: 'low' | 'mid' | 'high';
  let text: string;
  if (value <= 4) {
    band = 'low';
    text = opts.lowCommon;
  } else if (value <= 7) {
    band = 'mid';
    text = opts.midCommon;
  } else {
    band = 'high';
    text = opts.highCommon;
  }
  return {
    tag: band === 'mid' ? 'Around the middle' : band === 'high' ? 'Toward the higher end' : 'Toward the lower end',
    position: band === 'mid' ? 'around' : band === 'high' ? 'higher' : 'lower',
    statement: PARA(`${opts.label} of ${value}/10. ${text}`),
  };
}

function crisisContactsContext(value: number): ContextResult {
  const pos: Position = value === 0 ? 'lower' : value >= 5 ? 'higher' : 'around';
  return {
    tag: value === 0 ? 'More common than people admit' : value >= 5 ? 'A strong network' : 'A typical handful',
    position: pos,
    statement: PARA(
      `Most adults report only a small number of people they could truly rely on in a crisis. The median number of close friends in U.S. surveys is around three to four, and a meaningful, growing share report one or none (Survey Center on American Life, 2021). ${
        value === 0
          ? 'Reporting no one is more common than people admit and reflects how thin modern networks have become — not a verdict on you.'
          : value >= 5
            ? 'Naming five or more puts you among the better-connected; close, dependable ties at this number are less common than they used to be.'
            : 'Naming a few places you squarely in the typical range.'
      }`
    ),
  };
}

function lonelinessContext(value: string): ContextResult {
  if (value === 'often' || value === 'most') {
    return {
      tag: 'Widely shared',
      position: 'around',
      statement: PARA(
        'Frequent loneliness is far more common than its silence suggests: depending on the survey, roughly a third to a half of adults report meaningful loneliness, and rates have risen over the past two decades (e.g., Cigna; Gallup; Meta-Gallup global work). It is better understood as a common signal than as a personal defect.'
      ),
    };
  }
  return {
    tag: 'Less common than you might expect',
    position: 'neutral',
    statement: PARA(
      'Rarely or only sometimes feeling lonely is less common than people assume — a third to a half of adults report meaningful loneliness in large surveys. Stable connection is genuinely valuable and not the default.'
    ),
  };
}

function connectionTrendContext(value: string): ContextResult {
  if (value === 'less') {
    return {
      tag: 'A common direction',
      position: 'around',
      statement: PARA(
        'Feeling less connected than several years ago is a common direction of travel. Measured time spent with friends has fallen substantially over the past two decades, especially for younger adults (American Time Use Survey), so this often reflects a broad social shift rather than anything specific to you.'
      ),
    };
  }
  return {
    tag: 'Against the trend',
    position: 'neutral',
    statement: PARA(
      'Feeling as connected or more connected than five years ago runs against the broad trend — measured time with friends has fallen over the past two decades — and is worth recognising.'
    ),
  };
}

function energyContext(value: string): ContextResult {
  if (value === 'rarely' || value === 'sometimes') {
    return {
      tag: 'Very common',
      position: 'around',
      statement: PARA(
        'Feeling energized only rarely or sometimes is where most people land. Fatigue is among the most common complaints adults bring to clinicians, has many ordinary causes, and tends to drift downward with age. Common does not mean dismissable — anything persistent is worth raising with a clinician.'
      ),
    };
  }
  return {
    tag: 'Less common',
    position: 'neutral',
    statement: PARA(
      'Feeling energized often or most days is less common than you might think and worth noticing, given how widely adults report ordinary, persistent tiredness.'
    ),
  };
}

function healthLimitsContext(value: string): ContextResult {
  if (value === 'alot') {
    return {
      tag: 'You are not alone in this',
      position: 'neutral',
      statement: PARA(
        'A substantial minority of adults report that physical health meaningfully limits their daily activities, and the share rises with age (CDC/BRFSS). This is more common than everyday conversation reflects.'
      ),
    };
  }
  return {
    tag: value === 'some' ? 'The common middle' : 'Less limited than many',
    position: 'neutral',
    statement: PARA(
      value === 'some'
        ? 'Some limitation is the common middle ground — most adults report their health gets in the way at least a little.'
        : 'Reporting no physical limits is less common than people assume, especially past early adulthood, and is worth recognising.'
    ),
  };
}

function dailyAlignmentContext(value: string): ContextResult {
  return {
    tag: value === 'rarely' ? 'A common gap' : 'Worth noticing',
    position: value === 'rarely' ? 'around' : 'neutral',
    statement: PARA(
      value === 'rarely'
        ? 'A gap between daily life and what matters to you is extremely common — most people’s days are dominated by obligations rather than chosen meaning. Research suggests meaning is usually built in small, repeated increments rather than discovered all at once.'
        : value === 'sometimes'
          ? 'Feeling that your days sometimes reflect what matters is the typical experience. The research suggests these moments compound more than people expect.'
          : 'Frequently feeling that your days reflect what matters is less common than the alternatives and worth recognising.'
    ),
  };
}

function momentumContext(value: string): ContextResult {
  if (value === 'still' || value === 'drifting') {
    return {
      tag: 'A normal chapter',
      position: 'around',
      statement: PARA(
        '"Standing still" and "drifting" are among the most common ways adults describe ordinary stretches of life. Large shares of people across their 30s, 40s, and 50s report uncertainty about direction — it is a phase the data treats as normal, not a verdict on your trajectory.'
      ),
    };
  }
  return {
    tag: 'Less common day to day',
    position: 'neutral',
    statement: PARA(
      'A clear sense of moving toward something is less common as a steady day-to-day feeling than people assume. Research links it more to engagement and contribution than to having the whole plan figured out.'
    ),
  };
}

/* ---- Dispatch ---------------------------------------------------------- */

/** Returns a context result for a single answered question, or null. */
export function contextFor(
  id: string,
  value: string | number | undefined,
  answers: Answers
): ContextResult | null {
  if (value === undefined || value === '' || (typeof value === 'number' && isNaN(value))) {
    return null;
  }
  const age = typeof answers.age === 'string' ? answers.age : undefined;
  const n = typeof value === 'number' ? value : Number(value);

  switch (id) {
    case 'income':
      return incomeContext(n);
    case 'networth':
      return netWorthContext(n, age);
    case 'leftover':
      return leftoverContext(n);
    case 'moneyStress':
      return stressContext(n);
    case 'moneyFeeling':
      return moneyFeelingContext(String(value));
    case 'workHours':
      return workHoursContext(n);
    case 'screenHours':
      return screenContext(n);
    case 'freeTime':
      return freeTimeContext(String(value));
    case 'workSatisfaction':
      return scale10Context(n, {
        label: 'Work satisfaction',
        lowCommon:
          'Lower work satisfaction is common: global engagement surveys find only a minority of workers feel actively engaged, with most "not engaged." You are far from alone here.',
        midCommon:
          'A middling rating is the most common outcome — most people are neither thrilled nor miserable about their work, which is the statistical norm rather than a problem to be solved.',
        highCommon:
          'High work satisfaction is genuinely less common — only a minority of workers report being actively engaged — so this is worth recognising.',
      });
    case 'relationshipSatisfaction':
      return scale10Context(n, {
        label: 'Relationship satisfaction',
        lowCommon:
          'Lower satisfaction with close relationships is more common than people admit, and it fluctuates over time. The research consistently ties wellbeing to a few dependable bonds rather than to a large or perfect circle.',
        midCommon:
          'A middle rating is typical. Close relationships ebb and flow, and most people sit somewhere in the middle most of the time.',
        highCommon:
          'High satisfaction with close relationships is strongly associated with long-term wellbeing in the research — among the most robust findings in the field.',
      });
    case 'physicalHealth':
      return scale10Context(n, {
        label: 'Self-rated health',
        lowCommon:
          'Lower self-rated health is meaningful and common; it is worth discussing anything persistent with a clinician. Self-ratings like this are a strong predictor of real outcomes, which is exactly why they are worth taking seriously rather than dismissing.',
        midCommon:
          'A middle rating is where most adults land — in national surveys most people rate their health as "good" or "very good" rather than "excellent." The middle is the norm.',
        highCommon:
          'Rating your health highly is less common than people assume and is associated with better measured outcomes down the line.',
      });
    case 'futureClarity':
      return scale10Context(n, {
        label: 'Clarity about the next five years',
        lowCommon:
          'Low clarity about the future is normal at every age — large shares of people in their 30s, 40s, and 50s report exactly this. The expectation that adults have it figured out is a cultural story, not a description of how people feel.',
        midCommon:
          'Partial clarity is the typical state. Most people have a rough sense of direction without a detailed map, and the research suggests clarity tends to follow action rather than precede it.',
        highCommon:
          'A clear picture of the next five years is less common than people assume. Worth holding loosely — plans change for almost everyone — but worth recognising.',
      });
    case 'crisisContacts':
      return crisisContactsContext(n);
    case 'loneliness':
      return lonelinessContext(String(value));
    case 'connectionTrend':
      return connectionTrendContext(String(value));
    case 'energy':
      return energyContext(String(value));
    case 'healthLimits':
      return healthLimitsContext(String(value));
    case 'dailyAlignment':
      return dailyAlignmentContext(String(value));
    case 'momentum':
      return momentumContext(String(value));
    case 'workMeaning':
      return String(value) === 'waste'
        ? {
            tag: 'More common than admitted',
            position: 'around',
            statement:
              'Experiencing work as a waste of time is more common than people admit out loud — only a minority of workers report feeling actively engaged. It often reflects a mismatch of autonomy or fit rather than a flaw in you.',
          }
        : String(value) === 'neutral'
          ? {
              tag: 'The common middle',
              position: 'around',
              statement:
                'Neutral is the most common relationship people have with their work — most jobs are experienced as neither deeply meaningful nor actively pointless, and that is the statistical norm.',
            }
          : {
              tag: 'Less common, worth noticing',
              position: 'neutral',
              statement:
                'Finding work genuinely meaningful is less common than people assume — only a minority report being actively engaged — and tends to come from autonomy, relationships, and contribution more than pay.',
            };
    case 'incomeStability':
      return String(value) === 'unstable'
        ? {
            tag: 'More common than it looks',
            position: 'around',
            statement:
              'Unstable or unpredictable income is more common than it looks from the outside, and the research suggests instability weighs on wellbeing more heavily than a lower-but-steady income does.',
          }
        : {
            tag: 'A real advantage',
            position: 'neutral',
            statement:
              'Stable, predictable income is a genuine advantage for wellbeing — predictability tends to matter more than the size of the paycheque above a moderate level.',
          };
    case 'workExpected':
      return String(value) === 'no' || String(value) === 'partly'
        ? {
            tag: 'The norm, not the exception',
            position: 'around',
            statement:
              'Not doing the work you expected is the norm, not the exception. Careers are far less linear than finished résumés make them look, and most people end up somewhere they did not plan.',
          }
        : {
            tag: 'Less common than you’d think',
            position: 'neutral',
            statement:
              'Ending up roughly where you expected is less common than you might think — most people’s paths diverge substantially from what they imagined.',
          };
    default:
      return null;
  }
}

/** The full source list backing the assessment’s population figures. */
export const SOURCE_LIST: string[] = [
  'Federal Reserve, Survey of Consumer Finances (2022) — net worth by age.',
  'Federal Reserve, Report on the Economic Well-Being of U.S. Households (SHED, 2023) — emergency expenses, financial fragility.',
  'U.S. Census Bureau, Income in the United States (2023) — household income distribution.',
  'U.S. Bureau of Labor Statistics, American Time Use Survey (2023) — leisure, screen time, time with friends, commuting.',
  'OECD, Average annual hours actually worked (2023).',
  'American Psychological Association, Stress in America surveys — money as a stressor.',
  'Survey Center on American Life, American Perspectives Survey (2021) — number of close friends.',
  'Cigna U.S. Loneliness Index (2018, 2021); Meta-Gallup, State of Social Connections (2023) — loneliness prevalence.',
  'Gallup, State of the Global Workplace — employee engagement.',
  'U.S. CDC, Behavioral Risk Factor Surveillance System — self-rated health and activity limitation.',
  'Nielsen Total Audience Report — media and screen exposure.',
];
