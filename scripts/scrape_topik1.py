import csv
import requests
from bs4 import BeautifulSoup
from korean_romanizer.romanizer import Romanizer  

url = "https://learning-korean.com/elementary/20210101-10466/"

html = requests.get(url).text
soup = BeautifulSoup(html, "html.parser")

table = soup.find("table")
rows = []

for tr in table.find_all("tr")[1:]:  
    tds = [td.get_text(strip=True) for td in tr.find_all(["td", "th"])]
    if len(tds) >= 3:
        hangul = tds[1]
        english = tds[2]

        r = Romanizer(hangul)
        romaji = r.romanize()

        rows.append({
            "korean": hangul,
            "romaji": romaji,
            "english": english
        })

with open("Topik1.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["korean", "romaji", "english"])
    writer.writeheader()
    writer.writerows(rows)

print("Rows:", len(rows))
