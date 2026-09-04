const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const {
    maakZout,
    maakWachtwoordHash
} = require("./wachtwoorden");

const dataMap = path.join(__dirname, "data");

fs.mkdirSync(dataMap, {
    recursive: true
});

const databasePad = path.join(dataMap, "voorraad.db");
const database = new DatabaseSync(databasePad);
database.exec("PRAGMA foreign_keys = ON;");

database.exec(`
    CREATE TABLE IF NOT EXISTS producten (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        naam TEXT NOT NULL UNIQUE,
        prijs_cent INTEGER NOT NULL DEFAULT 0
            CHECK (prijs_cent BETWEEN 0 AND 1000000),
        eenheid TEXT NOT NULL DEFAULT 'stuk'
            CHECK (length(trim(eenheid)) BETWEEN 1 AND 30),
        voorraad INTEGER NOT NULL DEFAULT 0
            CHECK (voorraad >= 0),
        beschikbaar INTEGER NOT NULL DEFAULT 1
            CHECK (beschikbaar IN (0, 1))
    ) STRICT;

    CREATE TABLE IF NOT EXISTS medewerkers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        gebruikersnaam TEXT NOT NULL
            COLLATE NOCASE UNIQUE,
        wachtwoord_hash TEXT NOT NULL,
        zout TEXT NOT NULL,
        aangemaakt_op TEXT NOT NULL
            DEFAULT CURRENT_TIMESTAMP
    ) STRICT;

    CREATE TABLE IF NOT EXISTS wijzigingen (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        medewerker_id INTEGER NOT NULL,

        soort TEXT NOT NULL
            CHECK (
                soort IN (
                    'product_toegevoegd',
                    'voorraad',
                    'prijs',
                    'beschikbaarheid'
                )
            ),

            oude_waarde TEXT,
            nieuwe_waarde TEXT NOT NULL,

            gewijzigd_op TEXT NOT NULL
                DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (product_id)
                REFERENCES producten(id),

            FOREIGN KEY (medewerker_id)
                REFERENCES medewerkers(id)
        ) STRICT;
`);

const productKolommen = database
    .prepare("PRAGMA table_info(producten)")
    .all();

function heeftProductKolom(naam) {
    return productKolommen.some(
        (kolom) => kolom.name === naam
    );
}

if (!heeftProductKolom("prijs_cent")) {
    database.exec(`
        ALTER TABLE producten
        ADD COLUMN prijs_cent INTEGER NOT NULL DEFAULT 0
            CHECK (prijs_cent BETWEEN 0 AND 1000000);
    `);
}

if (!heeftProductKolom("eenheid")) {
    database.exec(`
        ALTER TABLE producten
        ADD COLUMN eenheid TEXT NOT NULL DEFAULT 'stuk'
            CHECK (length(trim(eenheid)) BETWEEN 1 AND 30);
    `);
}

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

const aantalMedewerkers = database.prepare(`
    SELECT COUNT(*) AS aantal
    FROM medewerkers
`).get().aantal;

if (aantalMedewerkers === 0) {
    const wachtwoord1 =
        process.env.MEDEWERKER_1_WACHTWOORD;
    const wachtwoord2 =
        process.env.MEDEWERKER_2_WACHTWOORD;

    if (
        !wachtwoord1 ||
        !wachtwoord2 ||
        wachtwoord1.length < 12 ||
        wachtwoord2.length < 12
    ) {
        console.warn(
            "Medewerkers niet aangemaakt: gebruik twee wachtwoorden van minimaal 12 tekens via de omgevingsvariabelen MEDEWERKER_1_WACHTWOORD en MEDEWERKER_2_WACHTWOORD."
        );
    } else if (wachtwoord1 === wachtwoord2) {
        console.warn(
            "Medewerkers niet aangemaakt: gebruik twee verschillende wachtwoorden."
        );
    } else {
        const voegMedewerkerToe = database.prepare(`
            INSERT INTO medewerkers (gebruikersnaam, wachtwoord_hash, zout)
            VALUES (?, ?, ?)
        `);

        const accounts = [
            {
                gebruikersnaam: "medewerker1",
                wachtwoord: wachtwoord1
            },
            {
                gebruikersnaam: "medewerker2",
                wachtwoord: wachtwoord2
            }
        ];

        for (const account of accounts) {
            const zout = maakZout();

            const wachtwoordHash =
                maakWachtwoordHash(
                    account.wachtwoord,
                    zout
                );

            voegMedewerkerToe.run(
                account.gebruikersnaam,
                wachtwoordHash,
                zout
            );
        }

        console.log("Twee medewerkersaccounts zijn aangemaakt.");
    }
}

module.exports = database;
