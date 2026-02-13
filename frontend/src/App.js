import axios from "axios";
import { useState } from "react";
import Editor from "./components/Editor";
import "./App.css";

function App() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState("");
    const [ratio, setRatio] = useState("square");
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        if (!prompt.trim()) {
            alert("Please enter a prompt");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:5000/api/image/generate",
                { prompt, ratio }
            );
            setImage(`data:image/png;base64,${res.data.image}`);
        } catch (error) {
            console.error("Error generating image:", error);
            alert("Failed to generate image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            generateImage();
        }
    };

    return (
        <div className="app-container">
            <div className="main-content">
                <header className="app-header">
                    <h1 className="app-title">
                        <span className="title-icon">🎨</span>
                        AI Creative Studio
                    </h1>
                    <p className="app-subtitle">Create stunning images with AI</p>
                </header>

                <div className="input-section">
                    <div className="input-group">
                        <label className="input-label">Describe your image</label>
                        <div className="input-wrapper">
                            <span className="input-icon">✨</span>
                            <input
                                type="text"
                                className="prompt-input"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="A beautiful sunset over mountains..."
                            />
                        </div>
                    </div>

                    <div className="controls-row">
                        <div className="select-group">
                            <label className="input-label">Aspect Ratio</label>
                            <div className="select-wrapper">
                                <select
                                    className="ratio-select"
                                    value={ratio}
                                    onChange={(e) => setRatio(e.target.value)}
                                >
                                    <option value="square">Square (1:1)</option>
                                    <option value="portrait">Portrait (3:4)</option>
                                    <option value="landscape">Landscape (16:9)</option>
                                </select>
                            </div>
                        </div>

                        <button 
                            className="generate-btn" 
                            onClick={generateImage}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <span className="btn-icon">🚀</span>
                                    Generate Image
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {image && (
                    <div className="editor-section">
                        <Editor image={image} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
