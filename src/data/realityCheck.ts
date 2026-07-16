/**
 * The Daily Reality Check — curated question bank.
 *
 * RULES (same trust bar as the rest of the site):
 *  - Every `value` is a figure that ALREADY appears, with its source, on the
 *    linked insight page. Nothing here is invented or sharpened.
 *  - `answer` is the honest display form (hedged where the page hedges).
 *  - `note` is a one-sentence, non-judgmental context line.
 *
 * The game shows one question per day, picked deterministically from the
 * local date, so everyone gets the same question on the same day.
 */

export interface RealityQuestion {
  /** The question, phrased to have a single numeric answer. */
  q: string;
  /** The real value (numeric, used for scoring + marker placement). */
  value: number;
  /** Slider range + step. */
  min: number;
  max: number;
  step: number;
  /** Display formatting around the number, e.g. prefix "$", suffix "%". */
  prefix?: string;
  suffix?: string;
  /** Honest display form of the answer, e.g. "~37%", "≈ $39,000". */
  answer: string;
  /** Source attribution, as cited on the page. */
  source: string;
  /** Slug of the insight page this figure comes from. */
  slug: string;
  /** One-sentence context for the reveal. */
  note: string;
}

export const RC_QUESTIONS: RealityQuestion[] = [
  {
    q: 'What share of U.S. adults say they could not cover a $400 emergency expense entirely from cash or savings?',
    value: 37, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~37%', source: 'Federal Reserve SHED, 2023',
    slug: 'does-an-emergency-fund-actually-matter',
    note: 'Financial fragility is far closer to the norm than the curated finances around you suggest.',
  },
  {
    q: 'What share of workers worldwide report feeling actively engaged at work?',
    value: 21, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~21%', source: 'Gallup, State of the Global Workplace',
    slug: 'does-money-or-meaning-matter-more-at-work',
    note: 'Not being lit up by your job puts you with the global majority, not outside it.',
  },
  {
    q: 'In the best-known study, how many days did it take on average (median) for a new habit to become automatic?',
    value: 66, min: 0, max: 300, step: 1, suffix: ' days',
    answer: '~66 days', source: 'Lally et al., 2010',
    slug: 'how-long-does-it-really-take-to-build-a-habit',
    note: 'The popular "21 days" figure has no research behind it — real habits took 18 to 254 days.',
  },
  {
    q: 'In a large experience-sampling study, what share of waking moments were people’s minds wandering from what they were doing?',
    value: 47, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~47%', source: 'Killingsworth & Gilbert, Science 2010',
    slug: 'how-much-time-do-we-spend-not-in-the-present',
    note: 'Nearly half of experience happens somewhere other than the present moment — for almost everyone.',
  },
  {
    q: 'What share of U.S. households headed by someone under 35 own their home?',
    value: 38, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~38–39%', source: 'U.S. Census Bureau, Housing Vacancies and Homeownership',
    slug: 'does-everyone-own-a-home-by-your-age',
    note: 'Most people under 35 rent — the "everyone owns a home" feeling is a comparison illusion.',
  },
  {
    q: 'How many jobs did the average American hold between ages 18 and 56?',
    value: 12, min: 1, max: 30, step: 1, suffix: ' jobs',
    answer: '~12 jobs', source: 'U.S. Bureau of Labor Statistics, NLSY',
    slug: 'how-many-jobs-will-you-have-in-your-lifetime',
    note: 'Job changes are the normal shape of a career, not evidence of failing to settle.',
  },
  {
    q: 'What is the median number of years a U.S. employee has been with their current employer?',
    value: 4, min: 0, max: 20, step: 0.5, suffix: ' years',
    answer: '~4 years', source: 'U.S. Bureau of Labor Statistics',
    slug: 'does-job-security-even-exist-anymore',
    note: 'Median tenure has hovered around four years for decades — long careers at one firm were never the norm.',
  },
  {
    q: 'What share of U.S. adults reported having no close friends at all in 2021?',
    value: 12, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~12%', source: 'Survey Center on American Life, 2021',
    slug: 'how-many-close-friends-do-adults-actually-have',
    note: 'Up from about 3% in 1990 — thin social circles are common, not a personal failing.',
  },
  {
    q: 'According to Dunbar’s research, roughly how many stable relationships can one person maintain in total?',
    value: 150, min: 0, max: 500, step: 5, suffix: ' people',
    answer: '~150', source: 'Robin Dunbar, social brain hypothesis',
    slug: 'how-many-friends-can-you-actually-keep-up-with',
    note: 'The layers narrow fast: roughly 5 intimate ties, 15 close friends, 50 good friends, 150 meaningful contacts.',
  },
  {
    q: 'What is the average one-way commute time in the United States, in minutes?',
    value: 27, min: 0, max: 90, step: 1, suffix: ' min',
    answer: '~27 minutes', source: 'U.S. Census Bureau',
    slug: 'how-much-of-your-life-do-you-spend-commuting',
    note: 'Round trip, that adds up to roughly 200+ hours per year — about a working year over a career.',
  },
  {
    q: 'How many hours of leisure time does the average U.S. adult have per day, according to time-use surveys?',
    value: 5, min: 0, max: 12, step: 0.5, suffix: ' hrs',
    answer: '~5 hours', source: 'American Time Use Survey (BLS)',
    slug: 'how-the-average-person-actually-spends-their-day',
    note: 'It rarely feels like that much — leisure arrives fragmented into short, scattered blocks.',
  },
  {
    q: 'After an interruption, roughly how many minutes does it take on average to fully refocus on the original task?',
    value: 23, min: 0, max: 60, step: 1, suffix: ' min',
    answer: '~23 minutes', source: 'Gloria Mark, attention research',
    slug: 'how-much-time-do-distractions-actually-cost-us',
    note: 'A contested average, not a law — but the cost of a "quick check" is real and larger than it feels.',
  },
  {
    q: 'Roughly how many hours does a typical full-time career add up to over a working life?',
    value: 90000, min: 10000, max: 200000, step: 1000, suffix: ' hrs',
    answer: '~90,000 hours', source: 'Derived from ~1,800 hrs/yr over ~45–50 years',
    slug: 'what-your-lifetime-work-hours-actually-add-up-to',
    note: 'Work is one of the largest single blocks of a human life — which is why it shapes wellbeing so much.',
  },
  {
    q: 'What share of the average U.S. household budget goes to housing?',
    value: 33, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~1/3', source: 'BLS Consumer Expenditure Survey',
    slug: 'where-does-the-average-paycheck-actually-go',
    note: 'Housing dwarfs the small purchases people usually blame for feeling broke.',
  },
  {
    q: 'What share of U.S. adults meet both the aerobic and strength exercise guidelines?',
    value: 24, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~24%', source: 'CDC',
    slug: 'how-much-do-people-actually-exercise',
    note: 'The fitness you see on social feeds is a curated top slice, not the population.',
  },
  {
    q: 'What share of U.S. adults regularly sleep less than 7 hours a night?',
    value: 33, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~1 in 3', source: 'CDC sleep surveys',
    slug: 'how-much-sleep-do-people-actually-get',
    note: 'Being chronically under-slept is common — common enough to feel normal, which is part of the problem.',
  },
  {
    q: 'In a large UK study, how many minutes per week in nature marked the threshold where people reported better health and wellbeing?',
    value: 120, min: 0, max: 600, step: 10, suffix: ' min',
    answer: '~120 minutes', source: 'White et al., Scientific Reports 2019',
    slug: 'does-spending-time-in-nature-actually-help',
    note: 'About two hours a week, in any pattern — benefits plateaued after roughly 200–300 minutes.',
  },
  {
    q: 'When companies moved to open-plan offices in a well-known study, face-to-face interaction dropped by what percent?',
    value: 70, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~70%', source: 'Bernstein & Turban, 2018',
    slug: 'do-open-offices-actually-work',
    note: 'Instead of talking more, people put on headphones and switched to email and chat.',
  },
  {
    q: 'Students wearing an embarrassing T-shirt predicted ~50% of observers would notice. What share actually did?',
    value: 25, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~25% or less', source: 'Gilovich, Medvec & Savitsky, 2000',
    slug: 'do-people-notice-your-flaws-as-much-as-you-think',
    note: 'The spotlight effect: we roughly double how much others notice and remember about us.',
  },
  {
    q: 'What share of U.S. adults had a major depressive episode in the past year?',
    value: 8, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~8%', source: 'NIMH / NSDUH',
    slug: 'how-common-is-depression-really',
    note: 'Roughly 1 in 12 adults in a single year — far more common than open conversation suggests.',
  },
  {
    q: 'What share of U.S. adults experienced an anxiety disorder in the past year?',
    value: 19, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~19%', source: 'NIMH',
    slug: 'what-is-a-normal-amount-of-anxiety-to-live-with',
    note: 'Nearly one in five in a single year — and everyday, non-clinical anxiety is near-universal.',
  },
  {
    q: 'In a global survey, what share of adults worldwide said they felt fairly or very lonely?',
    value: 24, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~24%', source: 'Meta-Gallup, 2023',
    slug: 'what-the-data-shows-about-loneliness-in-adults-worldwide',
    note: 'Loneliness reads as a personal defect from the inside; the data shows it is a population-scale condition.',
  },
  {
    q: 'In network studies, what share of friendships people name turn out to be reciprocated by the other person?',
    value: 50, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~50%', source: 'Almaatouq et al., 2016',
    slug: 'is-it-normal-for-friendships-to-feel-one-sided',
    note: 'Half of "my friend" nominations aren’t returned — lopsided friendships are structurally normal.',
  },
  {
    q: 'What share of adults report having been estranged from a family member at some point?',
    value: 25, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~1 in 4', source: 'Pillemer, family estrangement research',
    slug: 'is-it-normal-for-family-to-be-complicated',
    note: 'Complicated families are the statistical norm, not the exception hidden behind holiday photos.',
  },
  {
    q: 'What is the median U.S. household income?',
    value: 80610, min: 0, max: 250000, step: 1000, prefix: '$',
    answer: '~$80,610', source: 'U.S. Census Bureau, 2023',
    slug: 'is-your-salary-low-or-does-it-just-feel-that-way',
    note: 'Half of all households earn less than this — the "everyone makes six figures" feeling is a filtered sample.',
  },
  {
    q: 'What is the median net worth of U.S. households headed by someone under 35?',
    value: 39000, min: 0, max: 200000, step: 1000, prefix: '$',
    answer: '~$39,000', source: 'Federal Reserve SCF, 2022',
    slug: 'what-most-people-your-age-actually-have-saved',
    note: 'Net worth, not cash — accessible savings are usually far smaller. Half of young households are below this.',
  },
  {
    q: 'In a randomized trial at a large company, remote workers were how many percent more productive than office peers?',
    value: 13, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~13%', source: 'Bloom et al., WFH randomized experiment',
    slug: 'does-working-from-home-actually-work',
    note: 'One setting, one company — but the direction surprised almost everyone at the time.',
  },
  {
    q: 'In the famous jam study, what share of shoppers who stopped at the 24-flavour display actually bought a jar?',
    value: 3, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~3%', source: 'Iyengar & Lepper, 2000',
    slug: 'can-you-have-too-many-choices-in-life',
    note: 'The small 6-jam display converted ~30% — though later replications of choice overload have been mixed.',
  },
  {
    q: 'What share of American children born in 1980 grew up to out-earn their parents?',
    value: 50, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~50%', source: 'Chetty et al., 2017',
    slug: 'are-we-actually-worse-off-than-our-parents',
    note: 'For children born in 1940 it was roughly 90% — the "American Dream coin flip" is a real generational shift.',
  },
  {
    q: 'How many milliseconds of seeing a face does it take people to form trait judgments like trustworthiness?',
    value: 100, min: 0, max: 1000, step: 10, suffix: ' ms',
    answer: '~100 ms', source: 'Willis & Todorov, Psychological Science',
    slug: 'do-first-impressions-actually-matter',
    note: 'A tenth of a second — first impressions form before any words are exchanged, then resist updating.',
  },
  {
    q: 'For U.S. marriages that end in divorce, what is the median length of the marriage, in years?',
    value: 7.5, min: 0, max: 30, step: 0.5, suffix: ' years',
    answer: '~7–8 years', source: 'U.S. Census Bureau / CDC-NCHS',
    slug: 'how-long-do-marriages-actually-last',
    note: 'Divorce rates peaked around 1980 and have generally declined since.',
  },
  {
    q: 'What is the median age at first marriage in the U.S. today (both sexes, roughly)?',
    value: 29, min: 18, max: 45, step: 1, suffix: ' yrs old',
    answer: '~28–30', source: 'U.S. Census Bureau',
    slug: 'what-age-do-people-actually-hit-major-life-milestones',
    note: 'Decades later than the timeline most people carry in their heads — milestones keep shifting later.',
  },
  {
    q: 'In one experiment, limiting social media to how many minutes per day measurably reduced loneliness and depressive symptoms?',
    value: 30, min: 0, max: 180, step: 5, suffix: ' min/day',
    answer: '~30 minutes', source: 'Hunt et al., 2018',
    slug: 'does-social-media-actually-make-you-unhappy',
    note: 'The effect came from limiting, not quitting — and was strongest for heavier users.',
  },
  {
    q: 'By one estimate, how many hours of shared time does it take for someone to become a close friend?',
    value: 200, min: 0, max: 500, step: 10, suffix: ' hrs',
    answer: '~200 hours', source: 'Hall, 2019',
    slug: 'why-is-it-so-hard-to-make-friends-as-an-adult',
    note: 'Adult life rarely supplies those hours by default — which is why friendship takes deliberate scaffolding.',
  },
  {
    q: 'In the classic meta-analysis, the average therapy client ended up better off than what share of untreated people?',
    value: 77, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~75–80%', source: 'Smith & Glass meta-analysis',
    slug: 'does-therapy-actually-work',
    note: 'Averages hide variation — fit with the therapist matters a lot — but the overall signal is robust.',
  },
  {
    q: 'How many hours per day does the typical adult spend on their phone or connected devices?',
    value: 4, min: 0, max: 10, step: 0.5, suffix: ' hrs',
    answer: '~3–4.5 hours', source: 'DataReportal / GWI',
    slug: 'how-does-your-screen-time-compare',
    note: 'And most people underestimate their own — heavy screen time is now typical, not deviant.',
  },
  {
    q: 'What share of educators and the public endorse the debunked "learning styles" idea in surveys?',
    value: 90, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~90%', source: 'Multiple neuromyth surveys',
    slug: 'are-learning-styles-actually-real',
    note: 'One of the most widely believed ideas in education has essentially no supporting evidence.',
  },
  {
    q: 'When ~800 fair-goers guessed an ox’s weight, how far off was the average of all their guesses, in percent?',
    value: 1, min: 0, max: 50, step: 1, suffix: '%',
    answer: '~1%', source: 'Galton, 1907 (Vox Populi)',
    slug: 'do-we-make-better-decisions-alone-or-in-groups',
    note: 'The original "wisdom of crowds" — independent guesses average out individual errors.',
  },
  {
    q: 'In Gottman’s research, what ratio of positive-to-negative interactions marked stable, happy couples (X : 1)?',
    value: 5, min: 1, max: 20, step: 1, suffix: ' : 1',
    answer: '~5 : 1', source: 'John Gottman (approximate)',
    slug: 'can-you-actually-repair-a-relationship-after-a-fight',
    note: 'Conflict itself wasn’t the differentiator — the surrounding ratio of repair and warmth was.',
  },
  {
    q: 'What share of U.S. adults are religiously unaffiliated ("nones") in recent surveys?',
    value: 28, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~25–33%', source: 'Pew Research Center',
    slug: 'has-religion-been-replaced-by-something-else',
    note: 'One of the fastest-moving social shifts on record — with community, not belief, the hardest thing to replace.',
  },
  {
    q: 'People over 40 typically report feeling what percent younger than their actual age?',
    value: 20, min: 0, max: 60, step: 1, suffix: '%',
    answer: '~20%', source: 'Subjective-age research',
    slug: 'is-it-normal-to-feel-younger-than-your-actual-age',
    note: 'Feeling younger than your birth certificate is the norm, not denial.',
  },
  {
    q: 'What share of Americans today say that, generally speaking, most people can be trusted?',
    value: 33, min: 0, max: 100, step: 1, suffix: '%',
    answer: '~1/3', source: 'General Social Survey',
    slug: 'is-social-trust-really-declining',
    note: 'Down from roughly half in the early survey decades — one of the clearest long-run social trends.',
  },
];

/** Day-numbering epoch (local dates are measured against Jan 1, 2026). */
export const RC_EPOCH = { year: 2026, month: 0, day: 1 };
