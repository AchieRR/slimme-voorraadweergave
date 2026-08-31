const {
    randomBytes,
    scryptSync,
    timingSafeEqual
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

function controleerWachtwoord(
    wachtwoord,
    zout,
    opgeslagenHash
) {
    const berekendeHash =
        maakWachtwoordHash(wachtwoord, zout);

    const berekendeBuffer =
        Buffer.from(berekendeHash, "hex");

    const opgeslagenBuffer =
        Buffer.from(opgeslagenHash, "hex");

    return (
        berekendeBuffer.length === opgeslagenBuffer.length &&
        timingSafeEqual(berekendeBuffer, opgeslagenBuffer)
    );
}


module.exports = {
    maakZout,
    maakWachtwoordHash,
    controleerWachtwoord
};