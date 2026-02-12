const express = require("express");
const fetch = require("node-fetch");

const enhancePrompt = require("../services/promptEnhancer");
const captionGen = require("../services/captionGenerator");
const addLogo = require("../services/logoOverlay");
const addCTA = require("../services/ctaOverlay");   // ✅ NEW

const router = express.Router();

router.post("/generate", async (req, res) => {

    const { prompt, ratio } = req.body;   // ✅ NEW (ratio support)

    try {

        // ✅ Step 1: Enhance Prompt
        const enhancedPrompt = enhancePrompt(prompt);

        // ✅ Step 2: Aspect Ratio Handling
        let width = 512;
        let height = 512;

        if (ratio === "portrait") {
            width = 512;
            height = 768;
        }

        if (ratio === "landscape") {
            width = 768;
            height = 512;
        }

        // ✅ Step 3: Generate Image from HuggingFace (SDXL)
        const response = await fetch(
            "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: enhancedPrompt,
                    parameters: {
                        width,
                        height
                    }
                })
            }
        );

        // ✅ HF Response Check
        if (!response.ok) {
            const errText = await response.text();
            console.log("HF ERROR:", errText);
            throw new Error("HuggingFace API error");
        }

        // ✅ Ensure image returned
        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.includes("image")) {
            const msg = await response.text();
            console.log("HF returned non-image:", msg);
            throw new Error("HF model loading or error");
        }

        const imageBuffer = await response.arrayBuffer();

        // ✅ Step 4: Caption Generation
        const caption = captionGen(prompt);

        // ✅ Step 5: Logo Overlay
        const logoImage = await addLogo(
            Buffer.from(imageBuffer)
        );

        // ✅ Step 6: CTA Badge Overlay
        const brandedImage = await addCTA(
            logoImage
        );

        // ✅ Step 7: Send Response
        res.json({
            image: brandedImage.toString("base64"),
            caption
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Image generation failed"
        });

    }
});

module.exports = router;


