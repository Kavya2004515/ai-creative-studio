const sharp = require("sharp");
const path = require("path");

const addLogo = async (imageBuffer) => {

    const logoPath = path.join(__dirname, "../logo.png");

    // Get image size
    const metadata = await sharp(imageBuffer).metadata();

    // Resize logo (example: 20% of image width)
    const logoWidth = Math.floor(metadata.width * 0.2);

    const logo = await sharp(logoPath)
        .resize({ width: logoWidth })
        .png()
        .toBuffer();

    // Overlay logo bottom-right
    const output = await sharp(imageBuffer)
        .composite([
            {
                input: logo,
                gravity: "southeast"
            }
        ])
        .png()
        .toBuffer();

    return output;
};

module.exports = addLogo;
