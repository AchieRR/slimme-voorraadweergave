const {
    randomBytes,
    scryptSync
} = require("node:crypto");

const scryptOpties = {
    N: 131072,
    r: 8,
    p: 1,
    maxmem: 256 * 1024 * 1024
};

function maakZout() {
    return randomBytes(16).toString("hex");
}

function maakWachtwoordHash(wachtwoord, zout) {
    return scryptSync(
        wachtwoord,
        zout,
        64,
        scryptOpties
    ).toString("hex");
}

module.exports = {
    maakZout,
    maakWachtwoordHash
};