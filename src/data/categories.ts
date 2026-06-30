/**
 * Category / life-area taxonomy.
 *
 * These categories are the top-level URLs (e.g. /money-and-financial-reality)
 * and the buckets every insight page belongs to. `targetPages` encodes the
 * 1,000-page plan: the original ten categories (the first ~500 pages, now
 * complete) plus five newer areas opened up as the library expands toward 1,000.
 */

export interface Category {
  /** URL slug and the value used in an insight's `category` field. */
  slug: string;
  /** Full display title for the category page H1. */
  title: string;
  /** Short label for nav, chips, cards. */
  shortLabel: string;
  /** Human-readable life-area name (matches insight `lifeArea`). */
  lifeArea: string;
  /** One honest paragraph: what this area covers. */
  description: string;
  /** The single most important research finding in this area, plainly stated. */
  keyFinding: string;
  /** Whether this is one of the six core assessment life areas. */
  coreArea: boolean;
  /** Long-term page target (sums to 1,000 across all categories). */
  targetPages: number;
  /** Accent token used for the category's visual tag. */
  accent: 'teal' | 'amber' | 'green' | 'slate';
  /** Category-page FAQ. */
  faqs: { question: string; answer: string }[];
  /** Related category slugs for cross-linking. */
  related: string[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'money-and-financial-reality',
    title: 'Money & Financial Reality',
    shortLabel: 'Money',
    lifeArea: 'Money & Financial Reality',
    description:
      'This area covers income, savings, net worth, debt, and the gap between how secure your finances are and how secure they feel. The goal is not to tell you whether you have "enough" — it is to place your numbers inside the actual distribution of what people earn and hold, so the picture is based on data rather than the curated finances of the people around you.',
    keyFinding:
      'Most adults hold far less in savings and net worth than public conversation implies, and financial stress tracks income far more weakly above a moderate threshold than people expect — security is as much about stability and comparison set as about the size of the number.',
    coreArea: true,
    targetPages: 110,
    accent: 'amber',
    faqs: [
      {
        question: 'How much should I have saved by my age?',
        answer:
          'There is no universal "should." The honest reference point is the actual distribution: median net worth in the U.S. rises from roughly $39,000 for households under 35 to around $135,000 for ages 35–44 and about $247,000 for 45–54 (Federal Reserve Survey of Consumer Finances, 2022). "Should" figures from financial firms describe an aspirational top slice, not where most people are.',
      },
      {
        question: 'Does more money make people happier?',
        answer:
          'Up to a point, clearly yes — moving out of financial hardship reliably improves day-to-day wellbeing. Above a comfortable income, the relationship continues but flattens, and within any income band the variation between individuals is large. Money buys a higher floor more reliably than a higher ceiling.',
      },
      {
        question: 'Is feeling financially behind a sign something is wrong?',
        answer:
          'Usually not. Feeling behind is extremely common across income levels and is driven heavily by comparison and visible spending rather than by your actual position. The feeling and the facts often point in different directions.',
      },
    ],
    related: [
      'comparison-and-self-perception',
      'work-and-career',
      'happiness-research',
    ],
  },
  {
    slug: 'time-and-how-you-use-it',
    title: 'Time & How You Use It',
    shortLabel: 'Time',
    lifeArea: 'Time & How You Spend It',
    description:
      'This area covers how your hours are actually distributed across work, care, leisure, screens, and sleep — and how that compares to what large time-use surveys record for people in similar situations. Time is the one resource that is genuinely equal at the start of each day, which makes the data about how it is spent unusually revealing.',
    keyFinding:
      'People consistently misestimate their own time use — overstating productive hours and understating both leisure and screen time — and the amount of truly discretionary time most adults have is smaller, and more fragmented, than the cultural story of "if you wanted it badly enough you would find the time" suggests.',
    coreArea: true,
    targetPages: 75,
    accent: 'slate',
    faqs: [
      {
        question: 'How much free time does the average adult actually have?',
        answer:
          'Time-use surveys in the U.S. and U.K. put average daily leisure at roughly 4–5 hours, but it is unevenly distributed, often fragmented into short blocks, and lower for parents of young children and people working long or irregular hours.',
      },
      {
        question: 'Is high screen time abnormal?',
        answer:
          'No. Several hours of leisure screen time per day is now typical for adults. Whether it is a problem depends less on the raw number than on whether it is displacing things you would, on reflection, rather be doing.',
      },
    ],
    related: [
      'work-and-career',
      'health-and-energy',
      'purpose-and-direction',
    ],
  },
  {
    slug: 'work-and-career',
    title: 'Work & Career',
    shortLabel: 'Work',
    lifeArea: 'Work & Career',
    description:
      'This area covers job satisfaction, meaning at work, income stability, and the distance between the work you expected to be doing and the work you are doing. It treats work as one large input into a life rather than as the whole scoreboard, and looks at what the evidence says about engagement, change, and the limits of work as a source of meaning.',
    keyFinding:
      'Most people are not actively engaged by their work, career paths are far less linear than résumés make them look, and the people who report the most meaning at work tend to have it through autonomy, relationships, and a sense of contribution rather than through prestige or pay.',
    coreArea: true,
    targetPages: 105,
    accent: 'teal',
    faqs: [
      {
        question: 'Is it normal to dislike my job?',
        answer:
          'It is common. Global engagement surveys consistently find that only a minority of workers describe themselves as engaged, with the majority "not engaged." Disliking aspects of your job places you with most people, not outside them.',
      },
      {
        question: 'Is it too late to change careers?',
        answer:
          'The data does not support a hard cutoff. Career changes in your 40s and 50s are common and frequently successful by people’s own accounts, though they carry real short-term costs. "Too late" is usually a story about risk tolerance, not about the actual odds.',
      },
    ],
    related: [
      'purpose-and-direction',
      'money-and-financial-reality',
      'regret-and-life-decisions',
    ],
  },
  {
    slug: 'relationships-and-connection',
    title: 'Relationships & Connection',
    shortLabel: 'Relationships',
    lifeArea: 'Relationships & Connection',
    description:
      'This area covers close friendships, loneliness, the strength of your support network, and how connected you feel now compared with the past. Decades of research converge on relationships as one of the strongest predictors of long-term wellbeing, which makes the honest data about how thin most people’s networks actually are especially worth seeing.',
    keyFinding:
      'The quality of close relationships is one of the most robust predictors of long-term health and life satisfaction in the research, yet the typical adult has only a small number of genuinely close friends, and that number has been falling — meaning a thin social circle is common, not a personal failing.',
    coreArea: true,
    targetPages: 100,
    accent: 'green',
    faqs: [
      {
        question: 'How many close friends do most adults have?',
        answer:
          'Surveys typically find a median of around three to four close friends, with a meaningful and growing share of adults reporting one or none. The number most people imagine is "normal" is higher than what the data shows.',
      },
      {
        question: 'Is feeling lonely a sign something is wrong with me?',
        answer:
          'No. Loneliness is widespread — large surveys regularly find a third to half of adults reporting meaningful loneliness. It is better understood as a common signal, like hunger, than as evidence of a personal defect.',
      },
    ],
    related: [
      'health-and-energy',
      'comparison-and-self-perception',
      'happiness-research',
    ],
  },
  {
    slug: 'health-and-energy',
    title: 'Health & Energy',
    shortLabel: 'Health',
    lifeArea: 'Health & Energy',
    description:
      'This area covers physical health, energy, and how much your body limits what you want to do. It is not a diagnostic tool and never will be; it places your self-rated health and energy alongside population data so you can see how common your experience is — including the ordinary, non-alarming decline in energy that most people notice over time.',
    keyFinding:
      'Self-rated health is a surprisingly strong predictor of real health outcomes, most adults report energy and health well below an imagined ideal, and the everyday fluctuations in energy people worry about are, in the aggregate, extremely normal.',
    coreArea: true,
    targetPages: 65,
    accent: 'teal',
    faqs: [
      {
        question: 'Is low energy most days normal?',
        answer:
          'Periods of low energy are very common and have many ordinary causes — sleep, stress, activity levels, age. Common does not mean it should be ignored: persistent fatigue is worth discussing with a clinician. This site provides context, not diagnosis.',
      },
      {
        question: 'How healthy do most people rate themselves?',
        answer:
          'In national surveys most adults rate their health as "good" or "very good" rather than "excellent" or "poor." Rating yourself somewhere in the middle is the statistical norm, not a warning sign.',
      },
    ],
    related: [
      'time-and-how-you-use-it',
      'relationships-and-connection',
      'happiness-research',
    ],
  },
  {
    slug: 'purpose-and-direction',
    title: 'Purpose & Direction',
    shortLabel: 'Purpose',
    lifeArea: 'Purpose & Direction',
    description:
      'This area covers clarity about the future, whether your days reflect what matters to you, and the sense of moving toward something versus standing still or drifting. It treats uncertainty about direction as information rather than as failure, and looks at what the research actually associates with a durable sense of meaning.',
    keyFinding:
      'A sense of meaning correlates more strongly with everyday wellbeing than the absence of a grand life plan, uncertainty about direction is normal at every age rather than a sign of being lost, and meaning tends to be built through engagement and contribution more than discovered through introspection.',
    coreArea: true,
    targetPages: 75,
    accent: 'amber',
    faqs: [
      {
        question: 'Is it normal not to know what I want from life?',
        answer:
          'Yes, at every age. Large shares of people in their 30s, 40s, and 50s report uncertainty about direction. The expectation that adults have it figured out is a cultural story, not a description of how people actually report feeling.',
      },
      {
        question: 'Do I need a single life purpose?',
        answer:
          'The research on meaning does not require one. People report meaning through relationships, work, care, craft, and contribution — usually several sources at once, changing over time — rather than through a single defining mission.',
      },
    ],
    related: [
      'work-and-career',
      'regret-and-life-decisions',
      'age-and-life-stages',
    ],
  },
  {
    slug: 'comparison-and-self-perception',
    title: 'Comparison, Perception & Self-Image',
    shortLabel: 'Comparison',
    lifeArea: 'Comparison & Self-Perception',
    description:
      'This area covers the gap between where you are and where you think you are — the distortions created by social comparison, curated media, and an unrepresentative reference group. It is where the central problem this site exists to address lives: the feeling of falling short of a standard that, on inspection, does not describe most people’s actual lives.',
    keyFinding:
      'People systematically compare themselves to unrepresentative, upward, and curated samples, which manufactures a near-universal feeling of being behind a pace that does not actually exist in the population data.',
    coreArea: false,
    targetPages: 70,
    accent: 'slate',
    faqs: [
      {
        question: 'Why does everyone else seem to be doing better than me?',
        answer:
          'Because you see other people’s outsides and your own insides, and because both your social circle and your feeds over-represent good outcomes. The "everyone" you are comparing against is a filtered sample, not the full distribution.',
      },
      {
        question: 'Is comparing myself to others always harmful?',
        answer:
          'Comparison itself is normal and sometimes useful. The harm comes from an unrepresentative comparison set — chronic upward comparison against curated highlights — rather than from comparison as such.',
      },
    ],
    related: [
      'happiness-research',
      'money-and-financial-reality',
      'relationships-and-connection',
    ],
  },
  {
    slug: 'regret-and-life-decisions',
    title: 'Regret, Decisions & Life Paths',
    shortLabel: 'Regret',
    lifeArea: 'Regret & Life Decisions',
    description:
      'This area covers the major studies on what people actually regret, how regret changes over a life, and the difference between the safe road and the bold road in hindsight. It treats regret not as something to fear but as one of the better-studied windows into what tends to matter most to people once the noise falls away.',
    keyFinding:
      'Across studies, people’s deepest long-term regrets cluster around connection, authenticity, and inaction — not around the risks they took or the conventional milestones they missed — and regrets of inaction tend to outlast regrets of action.',
    coreArea: false,
    targetPages: 60,
    accent: 'amber',
    faqs: [
      {
        question: 'What do people regret most at the end of life?',
        answer:
          'Recurring themes across qualitative work and surveys include wishing they had lived more authentically, stayed closer to friends, expressed feelings, and not overworked — relational and self-honesty regrets far more than material ones.',
      },
      {
        question: 'Do people regret action or inaction more?',
        answer:
          'In the long run, research on regret generally finds that inactions — the chances not taken — produce more enduring regret than actions, even actions that went badly.',
      },
    ],
    related: [
      'purpose-and-direction',
      'age-and-life-stages',
      'work-and-career',
    ],
  },
  {
    slug: 'age-and-life-stages',
    title: 'Age & Life Stages',
    shortLabel: 'Age',
    lifeArea: 'Age & Life Stages',
    description:
      'This area covers how the typical shape of a life unfolds — what is statistically normal to have, feel, and be uncertain about at 25, 35, 45, 55, and beyond. It exists to replace the imagined timeline most people carry with the messier, wider, and more forgiving one the data actually shows.',
    keyFinding:
      'Life outcomes at any given age vary enormously and rarely follow the tidy timeline people imagine, and average life satisfaction famously dips in midlife before rising again — meaning the "behind schedule" feeling is often a predictable life-stage pattern, not a personal verdict.',
    coreArea: false,
    targetPages: 60,
    accent: 'green',
    faqs: [
      {
        question: 'Is there a normal timeline for life milestones?',
        answer:
          'There is an imagined one and an actual one, and they are very different. The actual timing of education, career, partnership, children, and financial milestones is spread across a wide range and has been shifting later for decades.',
      },
      {
        question: 'Does life satisfaction really dip in midlife?',
        answer:
          'Many large studies find a gentle U-shape, with average life satisfaction lowest somewhere in midlife and rising afterward — though the pattern is debated and far from universal at the individual level.',
      },
    ],
    related: [
      'purpose-and-direction',
      'regret-and-life-decisions',
      'comparison-and-self-perception',
    ],
  },
  {
    slug: 'happiness-research',
    title: 'Happiness Research & What Actually Works',
    shortLabel: 'Happiness',
    lifeArea: 'Happiness Research',
    description:
      'This area covers what decades of wellbeing research actually find about what raises life satisfaction and what does not — separating the findings that replicate from the ones that sell. It is the evidence base the rest of the site leans on whenever the question becomes not "where do I stand" but "what, if anything, reliably helps."',
    keyFinding:
      'The wellbeing research points consistently to relationships, health, sense of meaning, and relief from financial hardship as what matters most, while much of what is marketed as the path to happiness — including raw achievement and consumption — shows weak and short-lived effects.',
    coreArea: false,
    targetPages: 70,
    accent: 'teal',
    faqs: [
      {
        question: 'What does happiness research say matters most?',
        answer:
          'The most consistent findings point to the quality of close relationships, physical and mental health, a sense of meaning or purpose, and escaping financial hardship — with adaptation steadily eroding the effect of one-off gains.',
      },
      {
        question: 'Why do so many happiness tips not work?',
        answer:
          'Because many are based on weak or non-replicating studies, ignore hedonic adaptation, or describe correlations as if they were reliable levers. The findings that survive scrutiny are fewer and less exciting than the marketplace suggests.',
      },
    ],
    related: [
      'relationships-and-connection',
      'comparison-and-self-perception',
      'money-and-financial-reality',
    ],
  },
  {
    slug: 'parenting-and-family',
    title: 'Parenting & Family',
    shortLabel: 'Parenting',
    lifeArea: 'Parenting & Family',
    description:
      'This area covers raising children, family relationships, caregiving, and the patterns that pass between generations. It treats parenting as one of the most anxiously over-advised parts of life and tries to do the opposite — placing the ordinary worries (screen time, milestones, whether you are doing it "right") inside what the developmental research actually shows, which is usually more reassuring and less prescriptive than the surrounding noise.',
    keyFinding:
      'Parents today spend more hands-on time with their children than in the 1960s yet report more guilt and time pressure, and the research consistently finds that warmth and stability matter far more for how children turn out than most of the specific parenting choices people agonise over.',
    coreArea: false,
    targetPages: 45,
    accent: 'green',
    faqs: [
      {
        question: 'Am I spending enough time with my kids?',
        answer:
          'Probably more than you think. Time-use data shows parents today spend more hands-on time with children than parents did in the 1960s, despite more parents working. Research also finds the sheer quantity of parental time matters less for outcomes than warmth and engagement during the time you do have.',
      },
      {
        question: 'How much do my parenting choices determine how my child turns out?',
        answer:
          'Less than the surrounding advice implies. Within a normal, supportive range, developmental and behavioural-genetics research finds that broad warmth and stability matter far more than the specific choices parents agonise over, and that genes, peers, and environment shape outcomes alongside parenting.',
      },
    ],
    related: [
      'relationships-and-connection',
      'time-and-how-you-use-it',
      'purpose-and-direction',
    ],
  },
  {
    slug: 'learning-and-growth',
    title: 'Learning & Growth',
    shortLabel: 'Learning',
    lifeArea: 'Learning & Growth',
    description:
      'This area covers how people actually learn skills, build and break habits, and keep growing across a lifetime. It separates the science of practice, memory, and behaviour change from the motivational folklore around it, and treats the capacity to change as real but slower, more uneven, and less dependent on raw willpower than self-improvement culture implies.',
    keyFinding:
      'Skill and habit research finds that consistent, spaced, effortful practice beats talent and intensity over time, that habits form on a wide and individually variable timeline rather than a fixed number of days, and that most people underestimate how much they can still learn at any age.',
    coreArea: false,
    targetPages: 45,
    accent: 'teal',
    faqs: [
      {
        question: 'How long does it really take to build a habit?',
        answer:
          'There is no fixed number. The popular "21 days" has no good evidence behind it; one well-known study found habits took anywhere from about 18 to over 250 days to become automatic, varying widely by person and behaviour. The honest answer is "longer and more variable than you have been told."',
      },
      {
        question: 'Am I too old to learn something new?',
        answer:
          'Almost certainly not. While some kinds of mental processing slow with age, adults retain a strong capacity to learn skills and knowledge throughout life, and much of the "I cannot learn this" feeling reflects rusty practice and self-doubt rather than a hard biological ceiling.',
      },
    ],
    related: [
      'work-and-career',
      'purpose-and-direction',
      'age-and-life-stages',
    ],
  },
  {
    slug: 'technology-and-attention',
    title: 'Technology & Attention',
    shortLabel: 'Technology',
    lifeArea: 'Technology & Attention',
    description:
      'This area covers screens, social media, notifications, and the competition for your attention — how much of it is normal, what it costs, and what the evidence does and does not support. It avoids both the panic and the dismissal, placing your own digital habits inside population data and asking the more useful question: not how much, but what it displaces and how it leaves you feeling.',
    keyFinding:
      'Heavy screen and social-media use is now typical rather than deviant, the average person underestimates their own, and the research links harm less to total time than to what the use displaces and how it makes people feel.',
    coreArea: false,
    targetPages: 40,
    accent: 'slate',
    faqs: [
      {
        question: 'Is my screen time abnormal?',
        answer:
          'No. Several hours of daily leisure screen time is now typical for adults, and most people underestimate their own use. Whether it is a problem depends less on the raw number than on what it displaces and how it makes you feel afterward.',
      },
      {
        question: 'Is social media bad for you?',
        answer:
          'The research is more mixed than headlines suggest. Effects vary by person, platform, and use — passive scrolling and comparison tend to track worse mood than active connection. It is better understood as a tool with real risks than as uniformly harmful.',
      },
    ],
    related: [
      'time-and-how-you-use-it',
      'comparison-and-self-perception',
      'health-and-energy',
    ],
  },
  {
    slug: 'society-and-belonging',
    title: 'Society & Belonging',
    shortLabel: 'Society',
    lifeArea: 'Society & Belonging',
    description:
      'This area covers community, trust, civic life, and the sense of belonging to something larger than your immediate circle. It looks at the measurable decline in social trust and participation across many countries, what that does to individuals and communities, and why belonging turns out to be one of the more underrated ingredients of a good life in the research.',
    keyFinding:
      'Measures of social trust, community participation, and close ties have declined across many countries over recent decades, and the research treats belonging and social capital as strong, often underrated predictors of both individual wellbeing and how well communities function.',
    coreArea: false,
    targetPages: 40,
    accent: 'amber',
    faqs: [
      {
        question: 'Is community really declining?',
        answer:
          'By several measures, yes. Research tracking social trust, group membership, and close community ties finds meaningful declines across recent decades in many countries, though the picture varies by place and the causes are debated.',
      },
      {
        question: 'Why does belonging matter so much?',
        answer:
          'Because humans are a deeply social species. A sense of belonging is consistently linked to better health and wellbeing, and its absence — chronic loneliness or disconnection — carries health risks comparable to well-known physical risk factors in some studies.',
      },
    ],
    related: [
      'relationships-and-connection',
      'comparison-and-self-perception',
      'happiness-research',
    ],
  },
  {
    slug: 'emotions-and-inner-life',
    title: 'Emotions & Inner Life',
    shortLabel: 'Emotions',
    lifeArea: 'Emotions & Inner Life',
    description:
      'This area covers the everyday emotional weather — fear, anger, sadness, joy, stress, and the running commentary of self-talk. Drawing on affective science, it treats emotions as informative signals rather than malfunctions, and places the feelings people quietly worry are abnormal inside how variable, common, and manageable they actually are. It offers context, not therapy, and points toward a clinician for anything persistent or distressing.',
    keyFinding:
      'Emotions are better understood as useful signals than as problems to eliminate, most people’s feelings are more variable and less visible to others than they assume, and naming and accepting emotions tends to regulate them more effectively than suppressing or fighting them.',
    coreArea: false,
    targetPages: 40,
    accent: 'green',
    faqs: [
      {
        question: 'Is it normal for my emotions to swing day to day?',
        answer:
          'Yes. Mood naturally varies with sleep, stress, hormones, and events, and most people’s emotional lives are more variable than the composed surfaces others present. Wide everyday swings are common; it is persistent, impairing distress that is worth taking to a clinician.',
      },
      {
        question: 'Should I try to control or suppress negative emotions?',
        answer:
          'The research suggests suppression tends to backfire, leaving the emotion intact while adding strain. Naming emotions and accepting them generally regulates them more effectively than fighting them — feelings treated as signals to read rather than enemies to defeat.',
      },
    ],
    related: [
      'health-and-energy',
      'happiness-research',
      'comparison-and-self-perception',
    ],
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
);

export function getCategory(slug: string): Category | undefined {
  return CATEGORY_MAP[slug];
}

/** Total of the long-term page plan — should be 1,000. */
export const TARGET_TOTAL = CATEGORIES.reduce((n, c) => n + c.targetPages, 0);
