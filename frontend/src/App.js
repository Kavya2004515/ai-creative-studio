import axios from "axios";
import { useState } from "react";
import Editor from "./components/Editor";

function App() {

    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState("");
    const [ratio, setRatio] = useState("square");   // ✅ NEW

    const generateImage = async () => {

        const res = await axios.post(
            "http://localhost:5000/api/image/generate",
            { prompt, ratio }   // ✅ Send ratio
        );

        setImage(`data:image/png;base64,${res.data.image}`);
    };

    return (
        <div>

            {/* Prompt Input */}
            <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter prompt"
            />

            {/* ⭐ Ratio Dropdown */}
            <select
                value={ratio}
                onChange={(e) => setRatio(e.target.value)}
            >
                <option value="square">Square</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
            </select>

            <button onClick={generateImage}>
                Generate
            </button>

            {image && <Editor image={image} />}

        </div>
    );
}

export default App;
