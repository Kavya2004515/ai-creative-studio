const sharp = require("sharp");

async function addCTA(imageBuffer, text = "Kavya AI Studio") {

    return await sharp(imageBuffer)
        .composite([
            {
                input: Buffer.from(`
                <svg width="400" height="80">
                    <rect x="0" y="0" width="400" height="80" fill="black" opacity="0.6"/>
                    <text x="50%" y="50%"
                        font-size="32"
                        fill="white"
                        text-anchor="middle"
                        alignment-baseline="middle"
                        font-family="Arial">
                        ${text}
                    </text>
                </svg>
                `),
                gravity: "south"
            }
        ])
        .toBuffer();
}

module.exports = addCTA;
