# Mira — Women's Health App

A mobile-first health companion designed to support women through breast health awareness, self-care habits, and emotional wellbeing. Built as a progressive, week-by-week experience that meets users where they are — gently, not clinically.

## What it is

Mira is a prototype health app for women in Singapore, focused on reducing barriers to breast screening through trust-building, habit formation, and community. The app grows with the user over 21 days:

- **Week 1** — Settle in. Daily check-ins, gentle habits, a pre-assigned rose to nurture.
- **Week 2** — Go deeper. Choose your own flower, explore your focus, connect with whispers from other women.
- **Week 3+** — Community and action. Screening nudges, booking support, and a letter from Mira.

---

## Screens

| Area | Screens |
|------|---------|
| Onboarding | Name entry |
| Today (Home) | Daily check-in, focus section, habit rings, cycle tracker |
| Whispers | Anonymous shared experiences from other women |
| Screening | BSE guide (5-step), mammogram booking (clinic + mobile bus) |
| You (Account) | Profile, screening history, data management |

---

## Key features

**Mira companion**
- Animated companion that glows, rests, and responds to the user's mood
- Weekly full-screen check-in overlay: mood → flower pick (week 2+) → focus
- Inline check-in banner when the overlay is dismissed — stays accessible on the Today page
- Day 7 personal letter that unlocks after the first week

**Weekly garden**
- Week 1: rose is pre-assigned; user waters it through habits
- Week 2+: user picks their own flower (rose, peony, pink lily) at the start of each week
- Flower grows visually as habits are completed

**Check-in flow**
- 5 mood options (Heavy / Tired / Okay / Good / Bright) with emoji, plus free-text input
- Focus choices gentle and non-prescriptive: "A little support", "Know my body", "Just breathe", "Not sure yet"
- Week 1 excludes screening focus; week 2+ adds it

**Mammogram booking**
- Clinic booking: choose clinic → pick slot → fill details → confirm
- Mobile screening bus: browse schedule → fill details → confirm (walk-in friendly)

**Dev day picker**
- Fixed D1 / D7 / D14 / D21 toggle for demo use — instantly simulates different app states

---

## Tech

- **React 18** + **Vite 5**
- **React Router v6** (client-side routing)
- **CSS Modules** (scoped styles, no external UI library)
- **localStorage** — all state is persisted locally via a single `mira_state` key (`AppContext`)
- No backend, no auth, no external APIs

---

## Getting started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`. Max width is 430px — designed for mobile.

---

## Project structure

```
src/
  components/
    mira/          # Mira companion, check-in overlay, inline card, letter
    flower/        # Flower SVG renderer, heart avatar
    habits/        # Habit rings, ring history, cycle tracker
    exercises/     # Exercise overlay (breathing, body scan, etc.)
    cards/         # Whisper card, nudge card
    shared/        # Layout, BottomNav, StatusBar, Button, PageHeader
    dev/           # DevDayPicker (demo only)
  screens/
    home/          # Today page
    whispers/      # Whisper wall
    screening/     # Screening chooser
    bse/           # Breast self-exam (5 steps)
    mammogram/     # Mammogram booking + mobile bus flow
    account/       # You / profile page
    onboarding/    # Name entry
    checkin/       # Check-in complete / celebrate
  context/
    AppContext.jsx  # Global state + all actions
  data/
    miraCopy.js    # All Mira dialogue, affirmations, check-in prompts
    clinics.json   # Clinic data
    busSchedule.json
    whispers.json  # Seed whispers
```

---

## Design notes

- Colour palette: warm pinks (`#FBEAF0` background, `#993556` primary, `#F4C0D1` accent)
- All overlays use `position: fixed` within a `max-width: 430px` container
- Bottom nav spacer uses an explicit child element (not `padding-bottom`) to reliably extend scroll height in flexbox overflow containers
- State is fully reset-able via the dev picker for demo purposes
