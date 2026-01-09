# Polytype Trainer 

Mini web app to drill vocabulary in list form: you pick a deck, type Romaji/Pinyin and meaning, and move through words with smooth row transitions and keyboard-only navigation.

***

## Features

- Practice decks (e.g. TOPIK 1, HSK 1) with a fixed list layout: script, Romaji/Pinyin, and meaning.  
- Toggle columns: show/hide Romaji/Pinyin and meaning with animated opacity, while keeping the grid layout stable.  
- Keyboard-only flow: move through inputs with Enter/Tab, automatic scroll to center the active row, and preview of the next word.  
- Immediate correction: if an answer is wrong, the input is replaced with the correct solution in red; correct answers keep the default color.  
- Infinite or bounded runs: loop through the deck indefinitely or limit to a maximum number of words per session.  
- Live stats: running count of checked fields and percentage score.

***

## Tech stack

- **Frontend**: Plain HTML + CSS (CSS Grid + Flexbox for layout).  
- **Logic**: Vanilla JavaScript (no frameworks).  
- **Data**: Deck definitions stored in a JS file (`window.DECK_INDEX`) and loaded by id.  
- **Runtime**: Any modern browser; no build step required.

***

## Requirements and configuration

- Modern browser with JavaScript enabled (Chrome, Firefox, Edge, Safari).  
- Static file server (recommended) so that deck scripts can be loaded correctly; opening the HTML directly from `file://` may break loading of external JS files.  
- Deck index file defining available decks, for example:

```js
window.DECK_INDEX = [
  {
    id: "topik1",
    label: "TOPIK 1",
    data: [
      { script: "가다", romanization: "gada", meaning: "to go" },
      // ...
    ]
  },
  {
    id: "hsk1",
    label: "HSK 1",
    data: [
      { script: "爱", romanization: "ài", meaning: "to love" },
      // ...
    ]
  }
];
```

You can extend `window.DECK_INDEX` with additional decks using the same schema.

***

## Project setup and run

Basic structure:

```txt
polytype-trainer-list/
├─ index.html        # Main page with layout and controls
├─ style.css         # Styling (layout, animations, responsive rules)
├─ js/
│  └─ main.js        # App logic (state, rows, keyboard, stats)
└─ decks/
   └─ index.js       # Deck metadata and vocab data
```

Suggested workflow:

```bash
# serve the folder with any static server, e.g. Python:
cd polytype-trainer-list
python -m http.server 8000
# then open http://localhost:8000 in the browser
```

No bundler or package manager is required: the app runs directly in the browser as long as the HTML can load `style.css`, `decks/index.js`, and `js/main.js`.

***

## How it works

- On load, the app:  
  - reads the selected deck id from the `<select>` control,  
  - loads the corresponding data from `window.DECK_INDEX`,  
  - shuffles the deck and spawns the first two rows (current + preview),  
  - initializes stats (0 correct / 0 fields, 0% score).  

- For each word:  
  - the script (Word column) is displayed read‑only.  
  - you type Romaji/Pinyin and meaning (if the corresponding column is enabled).  
  - on Enter/Tab:  
    - Romaji/Pinyin is checked first; on error, your input is replaced by the correct romanization in red.  
    - Meaning is then checked; on error, your input is replaced by the correct translation in red.  
    - the current row is faded as “past”, the next row becomes active, and the following one becomes a low‑opacity preview.  
    - the list scrolls smoothly so the active row stays in view.

- The Romaji and Meaning toggles control:  
  - whether the corresponding inputs are visible and focusable,  
  - the flow of the keyboard navigation (skip straight to the next row when a column is disabled),  
  - a guard that ensures at least one of the two columns stays active.

- Stats are updated after every field check, counting how many fields have been answered and how many are correct, then computing the percentage.

***

## Customization

You can tune the trainer to your preferences by editing:

- `settings` in `main.js`:
  - `deckName`: default deck id (`"topik1"`, `"hsk1"`, …).  
  - `useRomanization`: start with Romaji/Pinyin enabled or disabled.  
  - `useMeaning`: start with meaning enabled or disabled.  
  - `infiniteRun`: `true` to loop through shuffled vocab; `false` to stop after each item is used once.  
  - `maxWords`: upper bound for words per run when not in infinite mode.

- Layout and animation speed in `style.css`:
  - column widths via `grid-template-columns` on `.list-header, .row`.  
  - spacing via `gap` on the grid and `gap` in `.settings`.  
  - scroll animation duration in `smoothScrollTo` (e.g. `600` ms).  

These adjustments let you adapt Polytype Trainer to different screen sizes, languages, and difficulty levels while keeping the core list‑drill behavior intact.
