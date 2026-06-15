# Polytype Trainer

Static vocabulary trainer for language drills. Pick a language, level, and deck, then type the romanization and/or meaning for each word.

## Current scope

- Static frontend: plain HTML, CSS, and JavaScript.
- No build step required.
- Designed to run locally during testing and later deploy cleanly on Vercel.
- Current languages:
  - Chinese
  - Korean

## Run locally

Serve the folder with any static server:

```bash
python -m http.server 8000
```

Then open:

```txt
http://localhost:8000
```

Opening `index.html` directly with `file://` is not recommended because browsers usually block CSV loading from local files.

## Project structure

```txt
polytype-trainer-main/
├── index.html
├── style.css
├── js/
│   └── main.js
├── decks/
│   ├── index.js
│   ├── hsk1.csv
│   ├── hsk_duolingo.csv
│   └── topik1.csv
└── scripts/
    └── scrape_topik1.py
```

## Deck format

Decks are CSV files. A deck can use any column names as long as `decks/index.js` maps them to the app fields:

- `script`: the word shown to the user
- `romanization`: pinyin, romaja, romaji, or another pronunciation field
- `meaning`: the answer translation

Example registry entry:

```js
{
  id: "topik1",
  language: "korean",
  languageLabel: "Korean",
  level: "TOPIK 1",
  label: "TOPIK 1",
  path: "decks/topik1.csv",
  columns: {
    script: "korean",
    romanization: "romaji",
    meaning: "english"
  }
}
```

To add a new deck:

1. Add a CSV file inside `decks/`.
2. Add one metadata object to `window.DECK_INDEX` in `decks/index.js`.
3. Reload the app.

## Deploy on Vercel

This repo can be deployed as a static site. Use the project root as the output directory and leave build settings empty unless a build tool is added later.
