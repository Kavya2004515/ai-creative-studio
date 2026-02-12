const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    prompt: String,
    imageUrl: String,
    caption: String
});

module.exports = mongoose.model("Image", ImageSchema);


await Image.create({
    prompt,
    imageUrl,
    caption
});


const remixPrompt =
    prompt + " different lighting, cinematic angle";
