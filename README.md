BatteryBuddy™ — A Battery Indicator Designed to Ruin Your Day (On Purpose)

Component chosen
**Battery indicator.** Normally: glance at a corner of the screen, see a percentage, move on with your life. Total time required: under one second.

The bit
What if checking your battery felt like requesting classified information from a 1987 mainframe? BatteryBuddy makes you pass a security clearance process — including a reaction-time mini-game — before it will even consider showing you a number. And once you're "cleared," the number isn't live: you have to manually request a reading and sit through a fake scanning delay. The reading might also just be wrong, because trust is for suckers.

Anti-patterns implemented (and where to find them)

1. **3-phase clearance wizard** just to view a percentage — `index.html` steps 1–3, driven by `nextStep()` in `script.js`.
2. **Reaction-time mini-game gatekeeping basic info** — `registerClick()` requires 5 clicks within 3 seconds or the whole thing resets.
3. **Retro "hacking the Pentagon" terminal chrome** for something that should be glanceable — `.terminal-chrome`, `.terminal-screen` in `style.css`.
4. **Non-live reading** — the real charge updates instantly in a hidden debug field, but the big display only changes when you click "Refresh," complete with a fake 1.8s "scanning" delay (`refreshReading()`).
5. **Backwards color logic** — full charge renders red, empty charge renders a calm green (`renderBattery()`).
6. **Tone whiplash** — a stern terminal aesthetic suddenly interrupted by a Comic Sans commentary box (`.commentary` in `style.css`).
7. **Inconsistent thresholds** — the color bands (60/30) and the commentary bands (80/50/20) don't line up with each other on purpose.
8. **"Optimize Battery Health" button** that fakes a 4-second process and changes nothing (`optimizeBattery()`).
9. **Self-contradicting cancel confirmation** — `cancelFlow()`.
10. **10–20% chance the "scan" returns a nonsense reading** (negative percent, 999%) just to undermine trust in the number entirely.

Real UX principles this deliberately breaks
- **Glanceability** — status indicators should be visible instantly, not gated behind a multi-step flow.
- **Live feedback** — a status reading shouldn't require a manual "request" plus an artificial delay.
- **Consistent visual language** — color coding should map predictably to meaning, not be inverted.
- **Minimal friction** — basic system info shouldn't require passing a mini-game.
- **Trustworthiness** — an indicator that sometimes lies has failed at its one job.

Disclaimer
None of this should be anywhere near a real product. Anxiety not included... or is it (Vsauce, for those who live under a rock).
