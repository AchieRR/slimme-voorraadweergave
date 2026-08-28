const database = require("./database");

const express = require("express");
const path = require("path");

const app = express();
const poort = 3000;
app.use(express.json());

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

app.patch("/api/producten/:id/voorraad", (request, response) => {
    try {
        const productId = Number(request.params.id);
        const verschil = request.body?.verschil;

        if (!Number.isInteger(productId) || productId < 1) {
            return response.status(400).json({
                fout: "Het productnummer is ongeldig."
            });
        }

        if (
            !Number.isInteger(verschil) ||
            verschil === 0 ||
            Math.abs(verschil) > 1000
        ) {
            return response.status(400).json({
                fout: "Verschil moet een geheel getal tussen -1000 en 1000 zijn en mag niet 0 zijn."
            });
        }

        const wijzigVoorraad = database.prepare(`
            UPDATE producten
            SET voorraad = voorraad + ?
            WHERE id = ?
              AND voorraad + ? >= 0
            RETURNING id, naam, voorraad, beschikbaar
        `);

        const product = wijzigVoorraad.get(
            verschil,
            productId,
            verschil
        );

        if (product) {
            return response.json(product);
        }

        const bestaandProduct = database
            .prepare("SELECT id FROM producten WHERE id = ?")
            .get(productId);

        if (!bestaandProduct) {
            return response.status(404).json({
                fout: "Product niet gevonden."
            });
        }

        return response.status(400).json({
            fout: "De voorraad mag niet lager dan 0 worden."
        });
    } catch (error) {
        console.error("Voorraad wijzigen mislukt:", error);

        return response.status(500).json({
            fout: "De voorraad kon niet worden gewijzigd."
        });
    }
});

app.put("/api/producten/:id/voorraad", (request, response) => {
    try {
        const productId = Number(request.params.id);
        const voorraad = request.body?.voorraad;

        if (!Number.isInteger(productId) || productId < 1) {
            return response.status(400).json({
                fout: "Het productnummer is ongeldig."
            });
        }

        if (
            !Number.isInteger(voorraad) ||
            voorraad < 0 ||
            voorraad > 10000
        ) {
            return response.status(400).json({
                fout: "Voorraad moet een geheel getal tussen 0 en 10000 zijn."
            });
        }

        const product = database.prepare(`
            UPDATE producten
            SET voorraad = ?
            WHERE id = ?
            RETURNING id, naam, voorraad, beschikbaar
        `).get(voorraad, productId);

        if (!product) {
            return response.status(404).json({
                fout: "Product niet gevonden."
            });
        }

        return response.json(product);
    } catch (error) {
        console.error("Voorraad wijzigen mislukt:", error);

        return response.status(500).json({
            fout: "De voorraad kon niet worden gewijzigd."
        });
    }
});

app.listen(poort, () => {
    console.log(`Server gestart op http://localhost:${poort}`);
});