# Mira — Plan 2: Narrative Trust Arc

## Vision
- **Flower / garden** = habit system (already built)
- **Mira** = trust-building companion. She evolves alongside the user, learns to read her, and gently walks her toward screening over 21 days.
- **Whispers** = the shared space between Mira and the community. Starts as Mira's voice, opens into other women's voices.

---

## Narrative Arc

| Days    | What the user receives                                           |
|---------|------------------------------------------------------------------|
| 1–6     | Mira daily check-ins: gentle "how are you today" + mood response |
| 7       | **Milestone moment**: 1st flower blooms → full-screen letter from Mira |
| 8–13    | Mira continues: deeper check-ins, affirmations                   |
| 14      | **2nd bloom**: women's voices enter for the first time           |
| 14–20   | Daily mix: women's stories (self-care, winding down) + Mira      |
| 21      | **3rd bloom**: Mira's first screening encouragement + women who found courage |
| 21+     | Continued screening stories; Mira prompts booking               |

---

## Tab Responsibilities

### Home tab
- **Mira card** replaces the static Lumi affirmation
- Shows TODAY's check-in or message (interactive)
- Evolves week by week (see Mira copy phases below)
- Mood/response stays minimal — 2–3 tap options, not a form

### Whispers tab
- Is the **cumulative feed** of everything Mira has sent + all women's stories
- Day 7 letter is accessible here after the full-screen moment
- Women's whispers appear from Day 14 onward
- User-contributed whispers still supported (Day 7+ gating stays)
- Mira's check-ins from past days live here as a log

---

## Mira Copy Phases

### Phase 1 — Days 1–6 (Check-in)
Home card: Mira asks "How are you feeling today?" 
Response chips: Tired · Okay · Good
After response: short affirming reply from Mira (varies by answer)
Examples:
- Tired → "Rest is care too. Even showing up here counts."
- Okay → "Okay is enough. You're here."
- Good → "Lovely. Let's keep that going."

Daily affirmations in Whispers feed (seeded, rotates):
- "Your body is doing its best. So are you."
- "Small steps. Every single one matters."
- "You don't have to have it all figured out."
- "Being gentle with yourself is not weakness."
- "Today counts."
- "You are worth looking after."

### Phase 2 — Day 7 (Milestone letter)
**Trigger**: dayCount >= 7 AND `letterSeenDay7 === false`
**Full-screen overlay** (MiraLetter component):
- Bloomed flower (user's chosen type) at top
- Letter from Mira (see content below)
- "Keep it" button → saves to Whispers feed, dismisses overlay
- Sets `letterSeenDay7 = true` in state

**Letter content:**
> A week with Mira.
>
> You came back. Every day, or most days, or some days — you came back. That's not nothing. That's actually everything.
>
> I've been watching you build something small and real. Your flower grew because you showed up for yourself, quietly, without anyone watching.
>
> You are stronger than you know. And I'm glad you're here.
>
> — Mira

Home check-in from Day 7 onward deepens:
- "How's your body feeling this week?"
- "What's one thing you did for yourself today?"
- "Are you sleeping okay?"
Response chips adapt to question (Yes/Sort of/Not really, etc.)

### Phase 3 — Days 8–13 (Mira deepens)
Home card: Mira's check-in rotates through deeper prompts
Whispers: Mira affirmations continue + letter is pinned at top

### Phase 4 — Day 14 (Women's voices enter)
**Trigger**: dayCount >= 14
Home card on Day 14: Mira introduces the community
> "You're not alone in this. Other women using Mira have been sharing quietly. I think you're ready to hear them."

Whispers tab unlocks women's stories (seeded + user contributed).
Category: **Finding time / winding down**
Seeded stories (6–8):
- "I light a candle before bed. That's my five minutes." — Rani, 38
- "I told my kids: this is Mum's quiet hour. They learned to respect it." — Fatimah, 44
- "I walk to the MRT one stop longer than I need to. That's my time." — Lin, 41
- "I started saying no to things that didn't fill me up. It took a year to get comfortable with that." — Sarah, 47
- "My self-care is boring — it's just sleep. But I protect it now." — Priya, 39
- "I keep a small notebook. Five words a day about how I feel. That's it." — Mei, 43

### Phase 5 — Day 21 (Screening courage)
**Trigger**: dayCount >= 21
Home card: Mira's gentle first mention of screening
> "Three weeks. You've taken such good care of yourself. There's one more thing I want to talk to you about — when you're ready."
> [I'm ready] [Not yet]

If "I'm ready": opens Screening nudge card from Mira
> "Breast screening. I know it can feel scary or far away. But it's one of the most powerful things you can do for yourself. Women who've done it say the fear was worse than the thing itself."
> [Tell me more →] — navigates to /screening

Whispers tab unlocks screening courage stories.
Category: **Finding courage**
Seeded stories (6–8):
- "I was terrified. I almost cancelled three times. But I went, and it was 15 minutes and then it was done." — Nurul, 52
- "My mum had breast cancer. I kept putting it off because I was scared. Going was the bravest thing I did that year." — Lin, 49
- "The nurse was so kind. I cried a little and she just waited." — Kavitha, 54
- "I went because my daughter asked me to. I'm glad she did." — Rohani, 58
- "Finding nothing was the best thing that ever happened to me." — Sarah, 46
- "I thought: if I find something early, I have more choices. That thought got me there." — Priya, 51
- "I booked it during my lunch break. It took two minutes. The waiting was the hardest part." — Mei, 47

---

## Files to Create / Modify

### New files
- `src/data/miraCopy.js` — all seeded Mira check-in prompts, affirmations, letter content, women's stories by phase/category
- `src/components/mira/MiraCard.jsx` — home check-in card (replaces static Lumi affirmation)
- `src/components/mira/MiraCard.module.css`
- `src/components/mira/MiraLetter.jsx` — Day 7 full-screen letter overlay
- `src/components/mira/MiraLetter.module.css`
- `src/components/mira/MiraAvatar.jsx` — the Mira avatar/icon (renamed from Lumi)

### Modify
- `src/context/AppContext.jsx`
  - Add to state: `moodLog: {}` (date → mood response), `letterSeenDay7: false`, `letterSeenDay14: false`, `screeningNudgeSeen: false`, `screeningNudgeResponse: null`
  - Add actions: `logMood(date, mood)`, `markLetterSeen(day)`, `respondToScreeningNudge(response)`

- `src/screens/home/Home.jsx`
  - Replace Lumi affirmation card with `<MiraCard />` (phase-aware)
  - Day 7 check: if `!letterSeenDay7 && dayCount >= 7` → show `<MiraLetter />` overlay
  - Remove all references to "Lumi"

- `src/screens/whispers/Whispers.jsx`
  - Phase-gate content by dayCount
  - Show Mira affirmations (days 1–6)
  - Show Day 7 letter card in feed (if letterSeen)
  - Show women's stories from Day 14
  - Show screening courage stories from Day 21
  - Mix seeded + user-contributed whispers

- `src/screens/whispers/Whispers.module.css` — add letter card, story card, phase label styles

- Any file referencing "Lumi" or "lumi" → rename to Mira/mira

### Rename search
- `src/components/shared/` — check for LumiBlob or similar
- `src/screens/home/Home.jsx` — lumiState, lumiConfig etc.
- All CSS classes with "lumi"

---

## Implementation Order

1. [ ] Rename Lumi → Mira across all files (find + replace)
2. [ ] Create `src/data/miraCopy.js` with all seeded content
3. [ ] Update AppContext (moodLog, letterSeen flags, actions)
4. [ ] Build `MiraCard.jsx` — phase-aware home check-in card
5. [ ] Build `MiraLetter.jsx` — Day 7 full-screen letter overlay
6. [ ] Update `Home.jsx` — swap Lumi for MiraCard + MiraLetter trigger
7. [ ] Redesign `Whispers.jsx` — phase-gated feed (Mira → community → courage)
8. [ ] Visual QA: Day 1, Day 7, Day 14, Day 21 states

---

## Status
- [ ] 1. Rename Lumi → Mira
- [ ] 2. miraCopy.js data file
- [ ] 3. AppContext additions
- [ ] 4. MiraCard component
- [ ] 5. MiraLetter overlay
- [ ] 6. Home.jsx update
- [ ] 7. Whispers.jsx redesign
- [ ] 8. Visual QA
