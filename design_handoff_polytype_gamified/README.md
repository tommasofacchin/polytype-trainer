# Handoff: Polytype Trainer — Gamified Redesign

## Overview
A dark-mode, playful redesign of **Polytype Trainer**, a multi-language vocabulary
learning app. The goal of the redesign is retention through rewards (Duolingo/Drops
energy, without copying either): daily streak, XP & levels, coins, surprise reward
chests, daily missions, badges, and a friends leaderboard.

The bundle contains the design as a single interactive mobile prototype (390×800
phone frame) covering: **Login / Register → Home → Games (Trainer, Memory, Dictate,
Categories) → Friends/Leaderboard → Profile → Settings**, plus an animated
daily-chest opening.

## About the Design Files
The files in this bundle are **design references created in HTML** — an interactive
prototype showing the intended look, layout, copy, and behavior. **They are not
production code to copy directly.** `*.dc.html` is a proprietary "Design Component"
format and `support.js` is its runtime — do **not** ship either.

The task is to **recreate these designs in the target codebase's existing
environment** (React Native, Flutter, SwiftUI, React web, etc.) using its established
patterns, component library, navigation, and state management. If no app environment
exists yet, pick the most appropriate framework (the design is mobile-first, so React
Native / Expo or Flutter are natural choices) and implement there.

To view the prototype: open `Polytype Redesign.dc.html` in a browser. Only the
**turn "3a" (Working app)** frame is the functional target — the "1a/1b/1c" frames
above it are earlier explorations kept for reference; the chosen direction is 3a.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, iconography, and interactions.
Recreate pixel-closely using the codebase's own primitives. Exact hex values, font
sizes, and radii are listed under Design Tokens.

## Global Layout & Chrome
- **Device frame:** 390×800 logical px, mobile-first. Corner radius 38px is just the
  prototype bezel — ignore in the real app.
- **App background:** `#14121c`. Cards/surfaces `#201d30`; disabled/empty surfaces
  `#1a1826`.
- **Status bar:** custom (9:41 + battery) — replace with the OS status bar.
- **Reward header (pinned, top):** left group = streak · coins · rupies (gems); right
  group = language flag (correct aspect ratio, ~30×20, radius 5) then circular profile
  avatar (34px). This header is persistent across Home/Games/Friends/Profile.
- **Bottom nav (pinned, 4 tabs):** Home · Games · Friends · Profile. Active tab uses
  mint text `#2fe6a4` with a `rgba(47,230,164,.14)` rounded pill behind the 46×30 icon
  slot; inactive `#726c8c`. Bar background `#17141f`.
- Content between header and nav scrolls.

## Screens / Views

### 1. Login
- **Purpose:** authenticate to enter the app.
- **Layout:** full-bleed `#14121c`, vertically centered column, 26px side padding.
- **Components (top→bottom):** brand tile 66×66, radius 20, gradient
  `linear-gradient(160deg,#2fe6a4,#17b784)`, letter "P" in Fredoka 38px `#0d2b22`;
  title "Welcome to Polytype" (Fredoka 600, 26px, `#fff`); subtitle "Sign in to keep
  your streak alive" (Nunito 700, 13px, `#a9a3c4`); Email input; Password input;
  primary "Log in" button (full width, `#2fe6a4` bg, `#0d2b22` text, radius 14, 15px
  pad, Fredoka 16); "OR" divider; "Continue with Google" button (white bg `#fff`,
  `#1f1f1f` text, multicolor Google G icon); footer "New here? Create an account"
  (link `#2fe6a4`).
- **Inputs:** bg `#201d30`, 1px border `rgba(255,255,255,.1)`, radius 14, 14×16 pad,
  text `#f5f2ff`, placeholder styling default.

### 2. Register
- Same shell as Login. Title "Create your account", subtitle "Start your streak
  today". Adds a **Username** input above Email. Primary button reads "Create
  account". Footer "Already have an account? Log in".
- Only two auth methods required: **email/password** and **Google**.

### 3. Home
- **Purpose:** daily hub — resume, claim rewards, see missions & friends.
- **Components:**
  - Greeting: "Welcome back," (13px `#a9a3c4`) + "Tommaso" (Fredoka 600, 24px, `#fff`).
    *(No mascot — earlier mascot removed by request.)*
  - **Daily chest card** (when unclaimed): gradient `linear-gradient(135deg,#2a2350,#201d30)`,
    1px `rgba(139,108,255,.28)` border, radius 20, soft static shadow
    `0 6px 20px -12px rgba(139,108,255,.55)` (no pulsing glow — kept subtle on
    purpose). Chest icon 46px, "Daily chest ready!" + "Tap to reveal your reward"
    (`#b7a3ff`), violet "Open" button `#8b6cff`. When claimed → muted card
    `#1a1826` "Chest opened / Come back tomorrow" with a mint check.
  - **Daily missions:** header + "1 / 3"; rows (card `#201d30`, radius 16) each with a
    32px tinted icon tile, title, thin progress bar, and a coin reward chip
    (`#ffd268`). Mission 1 "Earn 50 XP" (60%, mint bar), Mission 2 "Win 1 Memory
    round" (15%, violet bar).
  - **Friends preview:** header "This week ›"; top-3 mini leaderboard, the "You" row
    highlighted with `rgba(47,230,164,.1)` fill + inset mint border.

### 4. Games
- **Purpose:** pick a game. Trainer/Memory/Dictate are examples of several games — they
  live **inside Games**, not the bottom bar.
- 2-col grid of game cards (`#201d30`, radius 18, 40px tinted icon tile): **Trainer**
  (mint, "Type the meaning"), **Memory** (violet, "Match the pairs"), **Dictate** (gold,
  "Listen & type"), **Categories** (orange, "Study by topic"), plus two disabled
  "Coming soon" slots (Spelling, Sprint) at 0.65 opacity with a lock icon.
- Selecting a game opens that game's screen with a "‹ Games" back button.

#### 4a. Trainer (game screen)
- Header row: "Trainer" + "Chinese A1 · Lv6" pill. Three stat tiles (TIME/SCORE/COMBO,
  combo in `#ff9a5c`). Prompt card (gradient `160deg,#231f36,#1b1828`) with hanzi
  "你好" (Fredoka 500, 56px), pinyin "nǐ hǎo" (Space Mono, `#6fe0a0`), a round audio
  button. Answer input + mint "Check" button. Progress dots (mint = done).

#### 4b. Memory
- Header "Memory" + "Combo x2" orange pill. 3-col grid, aspect 3/4 cards: face-down
  cards `#201d30` with faint "P", revealed term cards `#2a2640`, matched card mint
  gradient.

#### 4c. Dictate
- Title + "Listen and type what you hear". Big 120px round play button (mint gradient,
  soft shadow + `0 0 0 10px rgba(47,230,164,.1)` ring). Static waveform bars. Input +
  "Check".

#### 4d. Categories
- Title + "Unlock topics as you earn XP". Vertical list: **Greetings** (completed, mint
  border + check), **Food & drink** (gold, 7/12 progress bar), **Travel**/**Numbers**
  (locked, 0.75 opacity, lock icon, "Reach Level N to unlock").

### 5. Friends / Leaderboard
- Title "Leaderboard" + "This week · resets in 3 days". Search input "Add a friend by
  @username". Ranked list rows: rank medallion (1 gold `#ffc73a`, 2 silver `#c9cdd6`,
  3 bronze `#c98a4b`, then plain), 36px avatar, name, XP with mint star. "You" row
  highlighted (mint fill + inset border). "Friend requests" section with accept
  (mint) / decline (neutral) buttons.

### 6. Profile
- Centered avatar 92px, `0 0 0 3px rgba(47,230,164,.4)` ring, 30px mint camera FAB.
  Name (Fredoka 24), "@tommaso", "Level 1 · Polytype Rookie" mint pill.
- Three stat tiles: day streak (flame `#ff7a2d`), total XP (star `#2fe6a4`), coins
  (gold coin). **XP progress** card: "40 / 200 XP", mint gradient bar (20%), "160 XP to
  Level 2". **Badges** grid (4 cols): earned "First steps" (gold star), "5-day streak"
  (flame) tinted; locked "Word master", "Chest hunter" (lock). **Learning tracks**:
  per-language rows with correctly-proportioned flag, level + progress bar (Chinese
  45% mint, German 15% violet). Bottom: **Settings** entry row (gear icon + chevron) →
  opens Settings.

### 7. Settings
- Reached only from Profile (not in bottom bar). "‹ Profile" back button + "Settings"
  title. Smaller avatar 76px with camera FAB + "Change photo" button. **Username**:
  input prefilled "@tommaso" + single mint **Edit** button. **Account**: read-only row
  with mail icon + "tommaso@gmail.com". **Log out** button (full width, red-tinted:
  bg `rgba(255,77,109,.12)`, text `#ff7a94`, 1px `rgba(255,77,109,.3)` border).
- No app-language control (English only).

## Interactions & Behavior
- **Bottom nav:** switches Home/Games/Friends/Profile; entering any of them clears the
  active game and the settings sub-view.
- **Games:** tapping a game card opens the game screen; "‹ Games" returns to the grid.
- **Chest:** "Open" → full-screen celebration overlay:
  - rotating conic ray backdrop (`rayspin` 16s linear infinite),
  - white radial flash (`flashburst` 1.4s ease-out),
  - chest icon `shakepop` 1.1s ease-out (scale-in + wobble),
  - "Daily chest!" + reward chips (+50 coins, +20 XP) + "Collect" button stagger in via
    `rewardpop` (1.3/1.5/1.7s).
  - "Collect" closes overlay, bumps coins 340→390, and swaps the Home chest card to the
    claimed state. In production, drive coin/XP deltas from the reward payload.
- **Auth:** Log in / Create account / Continue with Google all set authed=true and land
  on Home. Log out returns to Login. Login⇄Register toggle via footer links.
- **Float animation** (`floaty`) exists in CSS but the mascot that used it was removed;
  safe to drop.

## State Management
- `authed: boolean` — gates the whole app; false shows the auth overlay.
- `authView: "login" | "register"`.
- `tab: "home" | "games" | "friends" | "profile"`.
- `game: null | "trainer" | "memory" | "dictate" | "categories"` — active game within
  Games.
- `settings: boolean` — Settings sub-view of Profile.
- `chest: boolean` — chest overlay visible; `claimed: boolean` — chest consumed today.
- Real app also needs: user profile, coins/XP/streak/level counters, missions list &
  progress, badges, per-language tracks, friends list & requests, current word queue
  per game.

## Design Tokens
**Colors**
- App bg `#14121c`; nav bg `#17141f`; card `#201d30`; card alt `#2a2640` / `#2a2350`;
  empty/disabled `#1a1826`.
- Text: primary `#f5f2ff`/`#fff`; secondary `#a9a3c4`; muted `#726c8c`; faint `#524d6b`.
- **Primary (mint):** `#2fe6a4`, deep `#17b784`, on-mint text `#0d2b22`; tints
  `rgba(47,230,164,.14)`.
- **Streak (orange):** `#ff7a2d`, light `#ff9a5c`.
- **Coins (gold):** `#ffc73a`, text `#ffd268`, ring `#d99a1c`.
- **XP / chests (violet):** `#8b6cff`, light `#a084ff`/`#b7a3ff`, deep `#6b4dff`.
- **Rupies/gems (Zelda-style green):** fill `#3fd07a`, stroke `#1c9a52`, text `#6fe0a0`.
- **Danger:** `#ff7a94` on `rgba(255,77,109,.12)` / border `rgba(255,77,109,.3)`.
- Medallions: gold `#ffc73a`, silver `#c9cdd6`, bronze `#c98a4b`.

**Typography**
- Display/headings: **Fredoka**, weight 600 (400–700 loaded).
- Body/UI: **Nunito**, weights 600/700/800/900.
- Mono (pinyin/answers): **Space Mono**.
- Sizes seen: 24–26 (screen titles), 22 (game titles), 15 (card titles / nav-none),
  13–14 (body), 10–11 (labels/captions), 9 (badge labels). Bottom-nav labels 10px/800.

**Radius:** pill 999px; cards 16–24; brand tile 20; inputs 12–14; nav icon slot 11;
device bezel 38.

**Shadows:** chest card `0 6px 20px -12px rgba(139,108,255,.55)`; primary CTA / play
button `0 14px 34px -12px rgba(47,230,164,.7)`.

**Spacing:** 8px base rhythm (gaps 8/10/12/14; screen side padding 20–26).

## Assets
- **Flags** (`assets/flags/*.svg`): china, germany, spain, japan, norway, sweden, italy
  — copied from the original Polytype repo. Render at a real flag ratio (~3:2), not 1:1.
- **Icons:** all inline SVG (Feather-style strokes + custom flame/star/coin/rupee/chest
  glyphs). Replace with the codebase's icon set; the chest, rupee (5-point faceted gem),
  and flame glyphs are custom — reproduce or commission equivalents.
- **Avatar / profile photo:** user-uploaded; prototype shows a placeholder person glyph
  and a camera button. Wire real image upload.
- **No mascot asset** — removed.
- Fonts via Google Fonts (Fredoka, Nunito, Space Mono).

## Files
- `Polytype Redesign.dc.html` — the full interactive prototype (design reference only).
  Target = the "3a / Working app" frame.
- `support.js` — prototype runtime (do **not** ship).
- `assets/flags/*.svg` — flag assets, safe to reuse.
