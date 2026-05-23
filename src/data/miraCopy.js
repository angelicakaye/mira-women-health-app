// ── Daily affirmations (rotate through, days 1–6 and beyond) ──
export const MIRA_DAILY_AFFIRMATIONS = [
  'Your body is doing its best. So are you.',
  'Small steps. Every single one matters.',
  "You don't have to have it all figured out.",
  'Being gentle with yourself is not weakness.',
  'Today counts.',
  'You are worth looking after.',
  'Rest is care too.',
  'Showing up is enough.',
  'Curiosity about your body is a kind of care.',
  'You are allowed to take up space.',
  "You don't have to earn rest.",
  'One small thing. That is all it takes.',
]

// ── Check-in prompts by phase ──
// chips: { value, label }
export const MIRA_CHECKINS = {
  early: [
    { prompt: 'How are you feeling today?',        chips: [{ value: 'tired', label: 'Tired' }, { value: 'okay', label: 'Okay' }, { value: 'good', label: 'Good' }] },
    { prompt: 'How are you today?',                chips: [{ value: 'tired', label: 'Tired' }, { value: 'okay', label: 'Okay' }, { value: 'good', label: 'Good' }] },
    { prompt: "How's your morning going?",         chips: [{ value: 'tired', label: 'Slow' },  { value: 'okay', label: 'Okay' }, { value: 'good', label: 'Good' }] },
    { prompt: 'Checking in — how do you feel?',   chips: [{ value: 'tired', label: 'Tired' }, { value: 'okay', label: 'Alright' }, { value: 'good', label: 'Good' }] },
    { prompt: 'How is your body today?',           chips: [{ value: 'tired', label: 'Heavy' }, { value: 'okay', label: 'Okay' }, { value: 'good', label: 'Light' }] },
    { prompt: 'What are you carrying today?',      chips: [{ value: 'tired', label: 'A lot' }, { value: 'okay', label: 'Some' },  { value: 'good', label: 'Not much' }] },
  ],
  deeper: [
    { prompt: "How's your body feeling this week?",        chips: [{ value: 'heavy', label: 'Heavy' },  { value: 'okay', label: 'Okay' },    { value: 'light', label: 'Light' }] },
    { prompt: 'Are you sleeping okay?',                    chips: [{ value: 'not-really', label: 'Not really' }, { value: 'sort-of', label: 'Sort of' }, { value: 'yes', label: 'Yes' }] },
    { prompt: "What's one thing you've noticed about yourself this week?", chips: [{ value: 'tired', label: 'Tired patterns' }, { value: 'okay', label: "I'm adjusting" }, { value: 'good', label: 'Growing' }] },
    { prompt: 'How is your energy today?',                 chips: [{ value: 'tired', label: 'Low' },   { value: 'okay', label: 'Medium' },  { value: 'good', label: 'High' }] },
    { prompt: 'Did you get any time for yourself yesterday?', chips: [{ value: 'tired', label: 'Not really' }, { value: 'okay', label: 'A little' }, { value: 'good', label: 'Yes' }] },
  ],
  community: [
    { prompt: 'What does winding down look like for you today?', chips: [{ value: 'need-ideas', label: 'Need ideas' }, { value: 'have-a-plan', label: 'Have a plan' }, { value: 'skipping-today', label: 'Skipping today' }] },
    { prompt: 'How did you take care of yourself today?',        chips: [{ value: 'small-thing', label: 'Small thing' }, { value: 'full-routine', label: 'Full routine' }, { value: 'tomorrow', label: 'Tomorrow' }] },
    { prompt: "What's one thing your body needed today?",        chips: [{ value: 'rest', label: 'Rest' }, { value: 'movement', label: 'Movement' }, { value: 'quiet', label: 'Quiet' }] },
    { prompt: 'How are you protecting your time this week?',     chips: [{ value: 'still-figuring-out', label: 'Still figuring it out' }, { value: 'getting-there', label: 'Getting there' }, { value: 'yes', label: "I've got it" }] },
  ],
}

// ── Mira's responses after mood is selected ──
export const MIRA_MOOD_RESPONSES = {
  tired:              'Rest is care too. Even showing up here counts.',
  okay:               "Okay is enough. You're here.",
  good:               "Lovely. Let's keep that going.",
  heavy:              "That heaviness is real. You're still here, and that matters.",
  light:              'Something lightened today. Hold onto it.',
  'not-really':       "Sleep is so hard sometimes. Your body is still trying.",
  'sort-of':          "Sort of is honest. That's enough for today.",
  yes:                "Good sleep is such a gift. You gave yourself that.",
  'need-ideas':       'The women here have shared some beautiful ideas. Scroll down.',
  'have-a-plan':      "That matters so much. Protecting your time is brave.",
  'skipping-today':   "That's honest. Tomorrow is another chance.",
  'small-thing':      "Small things add up. This one counts.",
  'full-routine':     "You showed up for yourself fully today. That's everything.",
  tomorrow:           "Tomorrow is a fresh start. I'll be here.",
  rest:               "Rest is never wasted. Your body is grateful.",
  movement:           "Moving your body is a gift you give yourself.",
  quiet:              "Quiet is its own kind of care. You chose it.",
  'still-figuring-out': "Figuring it out is the work. You're doing it.",
  'getting-there':    "You're closer than you think.",
  'slow':             "Slow is okay. You're still moving forward.",
  'a-lot':            "Carrying a lot is heavy. I see that. You're still here.",
  'some':             "Some is real. You don't have to carry it all alone.",
  'not-much':         "That lightness is a gift. Carry it with you.",
  'tired-patterns':   "Noticing patterns is the first step to changing them.",
  "i'm-adjusting":    "Adjusting takes courage. You're doing it.",
  growing:            "Growth is quiet and real. You're in it.",
  low:                "Low energy is your body asking for something. Listen to it.",
  medium:             "Steady is good. Steady is enough.",
  high:               "That energy is yours. Use it well.",
  'not really':       "Rest doesn't need to be earned. It's yours.",
  'a little':         "A little is enough. Really.",
}

// ── Day 7 letter ──
export const MIRA_LETTER = {
  title: 'A week with Mira.',
  paragraphs: [
    "You came back. Every day, or most days, or some days — you came back. That's not nothing. That's actually everything.",
    "I've been watching you build something small and real. Your flower grew because you showed up for yourself, quietly, without anyone watching.",
    "You are stronger than you know. And I'm glad you're here.",
  ],
  sign: '— Mira',
}

// ── Day 14 letter ──
export const MIRA_LETTER_14 = {
  title: 'Two weeks with Mira.',
  paragraphs: [
    "Look at what you have grown. Two weeks of small choices, quiet moments — showing up for yourself when no one was watching.",
    "You are becoming someone who takes care of herself. That is not a small thing.",
    "There is a community of women here who have been walking this path too. Today, I want to introduce you to them.",
  ],
  sign: '— Mira',
}

// ── Day 21 letter ──
export const MIRA_LETTER_21 = {
  title: 'Three weeks with Mira.',
  paragraphs: [
    "Three weeks. You showed up, quietly, again and again. That deserves to be named.",
    "You have been learning your body. Taking small moments. Passing something forward to other women.",
    "There is one more thing I want to gently bring up — when you are ready.",
  ],
  sign: '— Mira',
}

// ── Day 14 intro from Mira ──
export const MIRA_COMMUNITY_INTRO = "You're not alone in this. Other women using Mira have been sharing quietly. I think you're ready to hear them."

// ── Day 21 screening nudge ──
export const MIRA_SCREENING_NUDGE = {
  prompt: "Three weeks. You've taken such good care of yourself. There's one more thing I want to talk to you about — when you're ready.",
  readyText: "Breast screening. I know it can feel scary or far away. But it's one of the most powerful things you can do for yourself. Women who've done it say the fear was worse than the thing itself.",
}

// ── Seeded women's stories: winding down (Day 14+) ──
export const SEEDED_WINDING_DOWN = [
  { id: 'wd-1', username: '@rani.sg',   age: 38, location: 'Singapore', text: "I light a candle before bed. That's my five minutes.",                                                                 reactions: { heart: 241, hug: 89,  spark: 67  }, daysAgo: 3,  replies: [] },
  { id: 'wd-2', username: '@fatimah',   age: 44, location: 'Singapore', text: "I told my kids: this is Mum's quiet hour. They learned to respect it.",                                                 reactions: { heart: 312, hug: 145, spark: 78  }, daysAgo: 5,  replies: [] },
  { id: 'wd-3', username: '@lin.cc',    age: 41, location: 'Singapore', text: "I walk to the MRT one stop longer than I need to. That's my time.",                                                     reactions: { heart: 198, hug: 67,  spark: 134 }, daysAgo: 2,  replies: [] },
  { id: 'wd-4', username: '@sarah_t',   age: 47, location: 'Singapore', text: "I started saying no to things that didn't fill me up. It took a year to get comfortable with that.",                   reactions: { heart: 456, hug: 234, spark: 189 }, daysAgo: 7,  replies: [] },
  { id: 'wd-5', username: '@priya.m',   age: 39, location: 'Singapore', text: "My self-care is boring — it's just sleep. But I protect it now.",                                                       reactions: { heart: 287, hug: 112, spark: 93  }, daysAgo: 4,  replies: [] },
  { id: 'wd-6', username: '@mei.lim',   age: 43, location: 'Singapore', text: "I keep a small notebook. Five words a day about how I feel. That's it.",                                                reactions: { heart: 334, hug: 156, spark: 211 }, daysAgo: 6,  replies: [] },
  { id: 'wd-7', username: '@nadia.k',   age: 36, location: 'Singapore', text: "I stopped watching TV right before bed. Just that one change helped so much.",                                          reactions: { heart: 178, hug: 94,  spark: 56  }, daysAgo: 9,  replies: [] },
  { id: 'wd-8', username: '@grace.t',   age: 50, location: 'Singapore', text: "A warm shower and no phone for 30 minutes. It sounds so small but it changed everything.",                              reactions: { heart: 423, hug: 187, spark: 145 }, daysAgo: 11, replies: [] },
]

// ── Seeded women's stories: finding courage (Day 21+) ──
export const SEEDED_COURAGE = [
  { id: 'c-1', username: '@nurul.sg',  age: 52, location: 'Singapore', text: "I was terrified. I almost cancelled three times. But I went, and it was 15 minutes and then it was done.",              reactions: { heart: 567, hug: 289, spark: 134 }, daysAgo: 4,  replies: [] },
  { id: 'c-2', username: '@lin.49',    age: 49, location: 'Singapore', text: "My mum had breast cancer. I kept putting it off because I was scared. Going was the bravest thing I did that year.",    reactions: { heart: 712, hug: 445, spark: 267 }, daysAgo: 8,  replies: [] },
  { id: 'c-3', username: '@kavitha',   age: 54, location: 'Singapore', text: "The nurse was so kind. I cried a little and she just waited.",                                                          reactions: { heart: 489, hug: 378, spark: 145 }, daysAgo: 6,  replies: [] },
  { id: 'c-4', username: '@rohani',    age: 58, location: 'Singapore', text: "I went because my daughter asked me to. I'm glad she did.",                                                             reactions: { heart: 623, hug: 312, spark: 189 }, daysAgo: 12, replies: [] },
  { id: 'c-5', username: '@sarah.46',  age: 46, location: 'Singapore', text: "Finding nothing was the best thing that ever happened to me.",                                                          reactions: { heart: 891, hug: 234, spark: 445 }, daysAgo: 3,  replies: [] },
  { id: 'c-6', username: '@priya.51',  age: 51, location: 'Singapore', text: "I thought: if I find something early, I have more choices. That thought got me there.",                                 reactions: { heart: 534, hug: 267, spark: 312 }, daysAgo: 9,  replies: [] },
  { id: 'c-7', username: '@mei.47',    age: 47, location: 'Singapore', text: "I booked it during my lunch break. It took two minutes. The waiting was the hardest part.",                             reactions: { heart: 445, hug: 189, spark: 234 }, daysAgo: 5,  replies: [] },
]
