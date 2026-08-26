const database = require("./database");

const express = require("express");
const path = require("path");

const app = express();
const poort = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/producten", (request, response) => {
    try {
        const query = database.prepare(`
            SELECT id, naam, voorraad, beschikbaar
            FROM producten
            ORDER BY naam
        `);

        const producten = query.all();

        response.json(producten);
    } catch (error) {
        console.error("Databasefout:", error);

        response.status(500).json({
            fout: "De voorraad kon niet worden opgehaald."
        });
    }
});

app.listen(poort, () => {
    console.log(`Server gestart op http://localhost:${poort}`);
});