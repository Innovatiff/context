/**
 * The Context Assessment.
 *
 * Six life-area sections plus a short context-basics step. Pure data: questions,
 * input types, and the static, honestly-worded notes shown alongside each area's
 * result. The contextualisation against population data lives in
 * `populationData.ts`; the interactive flow that consumes both lives in the
 * assessment page's client script.
 *
 * Design rules baked in here:
 *  - No question produces a score or grade.
 *  - Wording is plain and non-therapeutic.
 *  - Nothing is required; people can skip anything.
 *  - Answers never leave the browser.
 */

export type QuestionType = 'number' | 'scale10' | 'choice';

export interface ChoiceOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  /** Small helper text under the question. */
  help?: string;
  type: QuestionType;
  /** number inputs */
  unit?: string;
  prefix?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  /** scale10 inputs */
  lowLabel?: string;
  highLabel?: string;
  /** choice inputs */
  options?: ChoiceOption[];
}

export interface Section {
  id: string;
  title: string;
  /** One honest line describing what the section is for. */
  intro: string;
  /** Category slug this area maps to (for result links). */
  categorySlug?: string;
  questions: Question[];
  /**
   * What the research broadly says about people in this area — shown on the
   * result, stated plainly. Not advice.
   */
  researchNote?: string;
  /** Something genuinely more common than people realise, for this area. */
  moreCommon?: string;
  /** Insight slugs to recommend from this area's result. */
  insights?: string[];
}

export const ASSESSMENT: Section[] = [
  {
    id: 'basics',
    title: 'A little context',
    intro:
      'Two quick questions so your numbers can be compared to the right group. Both are optional, both stay in your browser, and neither is stored.',
    questions: [
      {
        id: 'age',
        text: 'Which age range are you in?',
        help: 'Used only to compare savings and milestones to people near your age.',
        type: 'choice',
        options: [
          { value: '18-24', label: '18–24' },
          { value: '25-34', label: '25–34' },
          { value: '35-44', label: '35–44' },
          { value: '45-54', label: '45–54' },
          { value: '55-64', label: '55–64' },
          { value: '65+', label: '65 or older' },
        ],
      },
      {
        id: 'region',
        text: 'Where do you mostly live?',
        help: 'Population figures here are strongest for the U.S. and similar economies; this just sets the caveat.',
        type: 'choice',
        options: [
          { value: 'us', label: 'United States' },
          { value: 'uk-irl', label: 'UK or Ireland' },
          { value: 'can-aus-nz', label: 'Canada, Australia, or NZ' },
          { value: 'w-europe', label: 'Western Europe' },
          { value: 'other', label: 'Somewhere else / prefer not to say' },
        ],
      },
    ],
  },
  {
    id: 'money',
    title: 'Money & Financial Reality',
    intro: 'Honest figures here matter more than round ones. Estimate if you need to.',
    categorySlug: 'money-and-financial-reality',
    questions: [
      {
        id: 'income',
        text: 'What is your approximate annual income, before tax?',
        help: 'Your whole household’s income, if you share finances. A rough figure is fine.',
        type: 'number',
        prefix: '$',
        unit: '/ year',
        placeholder: 'e.g. 65000',
        min: 0,
        step: 1000,
      },
      {
        id: 'networth',
        text: 'What is your approximate total savings or net worth right now?',
        help: 'Everything you own minus everything you owe. It is fine if this is near zero or negative.',
        type: 'number',
        prefix: '$',
        placeholder: 'e.g. 20000',
        step: 1000,
      },
      {
        id: 'leftover',
        text: 'After paying essential expenses, how much is left in a typical month?',
        help: 'A rough average across recent months.',
        type: 'number',
        prefix: '$',
        unit: '/ month',
        placeholder: 'e.g. 300',
        step: 50,
      },
      {
        id: 'moneyStress',
        text: 'How financially stressed do you feel?',
        type: 'scale10',
        lowLabel: 'Not at all',
        highLabel: 'Extremely',
      },
      {
        id: 'moneyFeeling',
        text: 'For your age, do you feel ahead, on track, or behind financially?',
        type: 'choice',
        options: [
          { value: 'ahead', label: 'Ahead' },
          { value: 'ontrack', label: 'On track' },
          { value: 'behind', label: 'Behind' },
        ],
      },
    ],
    researchNote:
      'Above a moderate income, financial stress tracks the stability and predictability of money more closely than the size of it. Within every income band, people report the full range of stress — which is why two people earning the same amount can feel completely differently about it.',
    moreCommon:
      'Holding little or no net worth is far more common than public conversation implies. Median net worth for U.S. households under 35 is roughly $39,000, and a large minority of adults could not cover a $400 emergency without borrowing.',
    insights: [
      'what-most-people-your-age-actually-have-saved',
      'is-your-salary-low-or-does-it-just-feel-that-way',
      'what-does-financial-security-actually-look-like',
    ],
  },
  {
    id: 'time',
    title: 'Time & How You Use It',
    intro: 'Estimate a typical week. Most people are surprised by their own numbers.',
    categorySlug: 'time-and-how-you-use-it',
    questions: [
      {
        id: 'workHours',
        text: 'How many hours per week do you work, including commuting?',
        type: 'number',
        unit: 'hrs / week',
        placeholder: 'e.g. 45',
        min: 0,
        max: 168,
        step: 1,
      },
      {
        id: 'meaningfulHours',
        text: 'How many hours per week go to things that feel genuinely meaningful?',
        help: 'Whatever that means for you — people, craft, care, learning, contribution.',
        type: 'number',
        unit: 'hrs / week',
        placeholder: 'e.g. 8',
        min: 0,
        max: 168,
        step: 1,
      },
      {
        id: 'screenHours',
        text: 'How many hours per week do you spend on screens for leisure?',
        help: 'Phone, TV, streaming, games, scrolling — not work screens.',
        type: 'number',
        unit: 'hrs / week',
        placeholder: 'e.g. 25',
        min: 0,
        max: 168,
        step: 1,
      },
      {
        id: 'freeTime',
        text: 'How much free time do you feel you have?',
        type: 'choice',
        options: [
          { value: 'toomuch', label: 'Too much' },
          { value: 'enough', label: 'About enough' },
          { value: 'notenough', label: 'Not enough' },
        ],
      },
    ],
    researchNote:
      'Time-use surveys find that people routinely overestimate their productive hours and underestimate both leisure and screen time. The amount of genuinely discretionary time most adults hold is real but smaller and more fragmented than the "just make time" story assumes.',
    moreCommon:
      'Feeling short on time while also spending several hours a day on leisure screens is one of the most common patterns in the data — the two coexist for most people, and it does not mean you are uniquely undisciplined.',
    insights: [
      'how-does-your-screen-time-compare',
      'what-your-lifetime-work-hours-actually-add-up-to',
      'how-much-of-your-life-do-you-have-left-in-waking-hours',
    ],
  },
  {
    id: 'work',
    title: 'Work & Career',
    intro: 'About the work itself, not your worth.',
    categorySlug: 'work-and-career',
    questions: [
      {
        id: 'workSatisfaction',
        text: 'How satisfied are you with your work?',
        type: 'scale10',
        lowLabel: 'Not at all',
        highLabel: 'Completely',
      },
      {
        id: 'workMeaning',
        text: 'Does your work feel meaningful, neutral, or like a waste of your time?',
        type: 'choice',
        options: [
          { value: 'meaningful', label: 'Meaningful' },
          { value: 'neutral', label: 'Neutral' },
          { value: 'waste', label: 'A waste of time' },
        ],
      },
      {
        id: 'incomeStability',
        text: 'How stable does your income feel right now?',
        type: 'choice',
        options: [
          { value: 'stable', label: 'Very stable' },
          { value: 'fairly', label: 'Fairly stable' },
          { value: 'unstable', label: 'Unstable' },
        ],
      },
      {
        id: 'workExpected',
        text: 'Are you doing the kind of work you expected to be doing at this age?',
        type: 'choice',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'partly', label: 'Partly' },
          { value: 'no', label: 'No' },
        ],
      },
    ],
    researchNote:
      'Global engagement surveys consistently find that only a minority of workers feel actively engaged by their jobs, with most "not engaged." The strongest reported sources of meaning at work are autonomy, good relationships, and a sense of contribution — not pay or prestige.',
    moreCommon:
      'Doing work you did not expect or plan for is the norm, not the exception. Most careers are far less linear than finished résumés make them look, and changing direction well into midlife is common and often successful by people’s own accounts.',
    insights: [
      'what-research-shows-about-changing-careers-after-40',
      'how-common-is-it-to-feel-like-you-are-wasting-your-potential',
      'how-many-people-actually-achieve-the-life-they-planned-at-22',
    ],
  },
  {
    id: 'relationships',
    title: 'Relationships & Connection',
    intro: 'The honest size and strength of your circle, not the flattering one.',
    categorySlug: 'relationships-and-connection',
    questions: [
      {
        id: 'crisisContacts',
        text: 'How many people could you genuinely call in a real crisis right now?',
        type: 'number',
        unit: 'people',
        placeholder: 'e.g. 3',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        id: 'loneliness',
        text: 'How often do you feel genuinely lonely?',
        type: 'choice',
        options: [
          { value: 'rarely', label: 'Rarely or never' },
          { value: 'sometimes', label: 'Sometimes' },
          { value: 'often', label: 'Often' },
          { value: 'most', label: 'Most of the time' },
        ],
      },
      {
        id: 'relationshipSatisfaction',
        text: 'How satisfied are you with your closest relationships?',
        type: 'scale10',
        lowLabel: 'Not at all',
        highLabel: 'Completely',
      },
      {
        id: 'connectionTrend',
        text: 'Do you feel more or less connected than you did five years ago?',
        type: 'choice',
        options: [
          { value: 'more', label: 'More connected' },
          { value: 'same', label: 'About the same' },
          { value: 'less', label: 'Less connected' },
        ],
      },
    ],
    researchNote:
      'The quality of close relationships is one of the most robust predictors of long-term health and life satisfaction in the research — stronger than income or status. The finding is about a small number of dependable bonds, not a large social circle.',
    moreCommon:
      'A small circle is the statistical norm. The median adult reports only a few close friends, a meaningful share report one or none, and roughly a third to a half of adults report meaningful loneliness depending on the survey.',
    insights: [
      'how-many-close-friends-do-adults-actually-have',
      'what-the-data-shows-about-loneliness-in-adults-worldwide',
      'why-everyone-else-seems-more-put-together-than-you',
    ],
  },
  {
    id: 'health',
    title: 'Health & Energy',
    intro:
      'This is context, not a check-up. Anything persistent is worth raising with a clinician.',
    categorySlug: 'health-and-energy',
    questions: [
      {
        id: 'physicalHealth',
        text: 'How would you rate your physical health right now?',
        type: 'scale10',
        lowLabel: 'Very poor',
        highLabel: 'Excellent',
      },
      {
        id: 'energy',
        text: 'How often do you feel genuinely energized?',
        type: 'choice',
        options: [
          { value: 'rarely', label: 'Rarely' },
          { value: 'sometimes', label: 'Sometimes' },
          { value: 'often', label: 'Often' },
          { value: 'most', label: 'Most days' },
        ],
      },
      {
        id: 'healthLimits',
        text: 'How much does your physical health limit what you want to do?',
        type: 'choice',
        options: [
          { value: 'none', label: 'Not at all' },
          { value: 'some', label: 'A little' },
          { value: 'alot', label: 'A lot' },
        ],
      },
    ],
    researchNote:
      'Self-rated health is a surprisingly strong predictor of real health outcomes — how people rate their own health forecasts mortality even after accounting for measured conditions. Most adults rate themselves in the middle, not at the extremes.',
    moreCommon:
      'Rating your health as "good" rather than "excellent," and feeling energized only sometimes, is where most people land. The gradual, ordinary decline in baseline energy with age is nearly universal and rarely a sign that something is wrong.',
    insights: [
      'what-is-a-normal-amount-of-anxiety-to-live-with',
      'where-do-you-actually-stand-understanding-your-life-in-global-context',
      'what-people-who-feel-fulfilled-actually-have-in-common',
    ],
  },
  {
    id: 'purpose',
    title: 'Purpose & Direction',
    intro: 'Where you feel you are heading — or not.',
    categorySlug: 'purpose-and-direction',
    questions: [
      {
        id: 'futureClarity',
        text: 'How clear are you about what you want your life to look like in five years?',
        type: 'scale10',
        lowLabel: 'No idea',
        highLabel: 'Very clear',
      },
      {
        id: 'dailyAlignment',
        text: 'How often does your daily life reflect what actually matters to you?',
        type: 'choice',
        options: [
          { value: 'rarely', label: 'Rarely' },
          { value: 'sometimes', label: 'Sometimes' },
          { value: 'often', label: 'Often' },
        ],
      },
      {
        id: 'momentum',
        text: 'Right now, do you feel like you are…',
        type: 'choice',
        options: [
          { value: 'toward', label: 'Moving toward something' },
          { value: 'still', label: 'Standing still' },
          { value: 'drifting', label: 'Drifting' },
        ],
      },
    ],
    researchNote:
      'A sense of meaning correlates more strongly with day-to-day wellbeing than having a fixed master plan. Research also suggests meaning is more often built through engagement and contribution than discovered through introspection — which is why clarity tends to follow action rather than precede it.',
    moreCommon:
      'Not knowing what you want is normal at every age. Large shares of people in their 30s, 40s, and 50s report uncertainty about direction. "Standing still" and "drifting" are among the most common ways adults describe a perfectly ordinary chapter.',
    insights: [
      'is-it-normal-to-not-know-what-you-want-at-30-40-50',
      'how-common-is-it-to-feel-stuck',
      'why-you-feel-behind-even-when-youre-not',
    ],
  },
];

/** Sections that map to a life area (everything except the basics step). */
export const AREA_SECTIONS = ASSESSMENT.filter((s) => s.categorySlug);
