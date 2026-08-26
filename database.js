const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const dataMap = path.join(__dirname, "data");

fs.mkdirSync(dataMap, {
    recursive: true
});

const databasePad = path.join(dataMap, "voorraad.db");
const database = new DatabaseSync(databasePad);

database.exec(`
    CREATE TABLE IF NOT EXISTS producten (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        naam TEXT NOT NULL UNIQUE,
        voorraad INTEGER NOT NULL DEFAULT 0
            CHECK (voorraad >= 0),
        beschikbaar INTEGER NOT NULL DEFAULT 1
            CHECK (beschikbaar IN (0, 1))
    ) STRICT
`);

const resultaat = database
    .prepare("SELECT COUNT(*) AS aantal FROM producten")
    .get();

if (resultaat.aantal === 0) {
    const voegProductToe = database.prepare(`
        INSERT INTO producten (naam, voorraad, beschikbaar)
        VALUES (?, ?, ?)
    `);

    voegProductToe.run("Verse melk", 6, 1);
    voegProductToe.run("Verse yoghurt", 3, 1);
    voegProductToe.run("IJsjes", 0, 1);
}

module.exports = database;