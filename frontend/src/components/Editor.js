import { useEffect, useRef } from "react";
import { Canvas, Image as FabricImage, Textbox } from "fabric";
import "../App.css";

function Editor({ image }) {
    const canvasRef = useRef(null);
    const fabricCanvas = useRef(null);

    // Create canvas once
    useEffect(() => {
        fabricCanvas.current = new Canvas(canvasRef.current, {
            backgroundColor: "#f5f5f5",
        });

        return () => {
            if (fabricCanvas.current) {
                fabricCanvas.current.dispose();
            }
        };
    }, []);

    // Load generated image
    useEffect(() => {
        if (!image || !fabricCanvas.current) return;

        const canvas = fabricCanvas.current;
        canvas.clear();
        canvas.backgroundColor = "#f5f5f5";

        FabricImage.fromURL(image).then((img) => {
            img.scaleToWidth(500);
            canvas.add(img);
            canvas.centerObject(img);
            canvas.renderAll();
        });
    }, [image]);

    // Add Text
    const addText = () => {
        const canvas = fabricCanvas.current;
        if (!canvas) return;

        const text = new Textbox("Your Text Here", {
            left: 100,
            top: 100,
            fontSize: 30,
            fill: "#333333",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            textAlign: "center",
            width: 300,
            splitByGrapheme: true,
        });

        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
    };

    // Download Image
    const downloadImage = () => {
        const canvas = fabricCanvas.current;
        if (!canvas) return;

        const dataURL = canvas.toDataURL({
            format: "png",
            quality: 1,
        });

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "ai-creative-image.png";
        link.click();
    };

    return (
        <div className="editor-container">
            <div className="editor-toolbar">
                <button className="toolbar-btn" onClick={addText}>
                    <span className="toolbar-icon">📝</span>
                    Add Text
                </button>
                <button className="toolbar-btn download-btn" onClick={downloadImage}>
                    <span className="toolbar-icon">💾</span>
                    Download Image
                </button>
            </div>
            <div className="canvas-container">
                <canvas ref={canvasRef} width="700" height="500"></canvas>
            </div>
        </div>
    );
}

export default Editor;
