# Mira — Pending Changes Plan

## 1. Screening Page (`ScreeningChooser.jsx` + `.module.css`)
- **Header**: remove `text-align: center`, left-align title + subtitle
- **Card hierarchy** (each option card):
  - Title (large, first)
  - Where · Duration (meta, small)
  - Badge tag below meta — subtle pill ("Try this first" / "Recommended every 2 years 40+")
  - Benefit description — 1–2 lines explaining what it does for you
  - Whisper — de-emphasised, lighter weight, smaller font
- Remove heavy badge background; make it a light outline or muted colour pill

---

## 2. Home Page — Header + Focus UX (`Home.jsx` + `Home.module.css`)

### Header badge
- Replace `Day {dayCount}` with today's day + date: `"Sat, 23 May"`
- Helper: `new Date().toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' })`

### Today's habits section
- Remove the `sectionDate` line (date was shown twice — now only in the header badge)

### Your Focus — question-first redesign
**State A** (no goal set, or user clicked "Change"):
- Gentle heading: "What would you like to focus on?"
- 3 large option cards (support / screening / know my body), each with label + short desc
- Subtle "Not sure yet" text link below (sets goal to `notsure`)
- NO activity card shown yet

**State B** (goal chosen):
- Show current focus chip with "Change" link
- Show activity suggestion card beneath it
- Completing the activity also logs `selfCare` habit → waters the flower

---

## 3. Weekly Garden System

### Concept
- 1 flower per week. Flower grows from seed → sprout → bud → bloom across 7 days.
- Stage is based on how many days in that week the user logged ≥1 habit.
  - 0 days → stage 0 (seed)
  - 1–2 days → stage 1 (sprout)
  - 3 days → stage 2 (leaves)
  - 4–5 days → stage 3 (bud)
  - 6–7 days → stage 4 (bloom)
- Each past week's flower is shown fully bloomed in the garden.
- User picks their flower type at the start of each new week.

### AppContext (`AppContext.jsx`)
New state:
```js
flowerPicks: {}   // { [weekNum]: 'rose' | 'peony' | 'lily' }
```
New action:
```js
setWeekFlower(weekNum, type)  // saves flowerPicks[weekNum] = type, also updates flowerType
```
New derived values:
```js
const daysSinceInstall = installDate ? daysBetween(installDate, today) : 0
const currentWeekNum = Math.floor(daysSinceInstall / 7) + 1
const currentWeekFlower = state.flowerPicks[currentWeekNum] || state.flowerType || 'rose'
const showWeeklyPicker = !state.flowerPicks[currentWeekNum]
```

Helper (in component, not context):
```js
function weekStage(habitLogs, installDate, weekNum) {
  // get 7 ISO dates for that week
  // count days with ≥1 habit logged
  // map 0→0, 1-2→1, 3→2, 4-5→3, 6-7→4
}
```

### HabitRings (`HabitRings.jsx` + `.module.css`)
- If `showWeeklyPicker`: show inline picker card at top
  - "A new week — pick your flower to grow"
  - 3 compact flower buttons (rose / peony / pink lily shown at bloom)
- Garden row: past week flowers (40px each, fully bloomed) + current week flower (80px, at computed stage)
- Label: "X of 4 watered today · Week N"
- Habit cards below (unchanged)

---

## 4. You / Account Page (`Account.jsx` + `Account.module.css`)

### Stats row
- Remove **Days Active** stat entirely
- Replace with **Flowers grown** = number of past fully-bloomed weeks (stage 4 weeks)
  - Label: "Flowers" with a 🌸 or flower count
- Keep: Days | Flowers | Full days | Whispers

### Habit Activity section → Garden view (weekly)
- **Remove** the 28-day daily heatmap
- **Replace** with a garden grid of weekly flowers
  - Each week = 1 flower shown at its achieved bloom stage
  - Arrange in rows of 4 or 5
  - Label each with "Week N" below
  - Current week shows animated/pulsing border
  - Past weeks show at achieved stage (frozen)
- Remove the heatmap legend; instead show a small note "Each flower is one week"

### Hero
- Keep Flower (already done) — it shows at `flowerStageForDays(dayCount)` which grows with time
- This gives a sense of the overall journey even before gardens fill up

---

## 5. Files to Change (ordered by dependency)

1. `src/context/AppContext.jsx` — add `flowerPicks`, `setWeekFlower`, derived `currentWeekNum`, `currentWeekFlower`, `showWeeklyPicker`
2. `src/components/habits/HabitRings.jsx` — weekly garden + picker
3. `src/components/habits/HabitRings.module.css` — garden styles
4. `src/screens/home/Home.jsx` — badge, date removal, focus question-first
5. `src/screens/home/Home.module.css` — question-first focus styles
6. `src/screens/screening/ScreeningChooser.jsx` — left-align, card hierarchy fix
7. `src/screens/screening/ScreeningChooser.module.css` — style updates
8. `src/screens/account/Account.jsx` — replace Active stat + heatmap with garden
9. `src/screens/account/Account.module.css` — garden grid styles

---

## Status
- [ ] Screening page fixes
- [ ] Home: header badge + focus question UX
- [ ] AppContext: weekly garden data
- [ ] HabitRings: weekly garden + picker
- [ ] Account: stats + weekly garden
