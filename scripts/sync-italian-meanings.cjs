const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const italianDeckPath = path.join(rootDir, "decks", "italian_a1.csv");
const targetDecks = [
  "chinese_a1.csv",
  "german_a1.csv",
  "japanese_a1.csv",
  "norwegian_a1.csv",
  "spanish_a1.csv",
  "swedish_a1.csv"
];

const italianRows = parseCsv(fs.readFileSync(italianDeckPath, "utf8").trim());
const italianHeader = italianRows.shift() || [];
const englishIndex = italianHeader.indexOf("english");
const italianIndex = italianHeader.indexOf("italian");

if (englishIndex === -1 || italianIndex === -1) {
  throw new Error("Italian source deck must contain english and italian columns.");
}

const translations = new Map(
  italianRows.map(row => [row[englishIndex], row[italianIndex]])
);

for (const filename of targetDecks) {
  const deckPath = path.join(rootDir, "decks", filename);
  const rows = parseCsv(fs.readFileSync(deckPath, "utf8").trim());
  const header = rows.shift() || [];

  const englishColumn = header.indexOf("english");
  if (englishColumn === -1) throw new Error(`${filename} must contain an english column.`);

  let italianColumn = header.indexOf("italian");
  if (italianColumn === -1) {
    header.splice(header.length - 1, 0, "italian");
    italianColumn = header.indexOf("italian");
    for (const row of rows) row.splice(italianColumn, 0, "");
  }

  for (const row of rows) {
    const english = row[englishColumn];
    row[italianColumn] = translations.get(english) || english;
  }

  fs.writeFileSync(
    deckPath,
    [header, ...rows].map(row => row.map(escapeCsv).join(",")).join("\n") + "\n"
  );

  console.log(`${filename}: ${rows.length} rows`);
}

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i += 1) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === "\"" && inQuotes && nextChar === "\"") {
      field += "\"";
      i += 1;
    } else if (char === "\"") {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  row.push(field);
  rows.push(row);
  return rows.filter(values => values.some(value => String(value).trim() !== ""));
}

function escapeCsv(value) {
  value = String(value ?? "");
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, "\"\"")}"` : value;
}
