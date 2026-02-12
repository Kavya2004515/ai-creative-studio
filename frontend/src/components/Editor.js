import { useEffect, useRef } from "react";
import { Canvas, Image as FabricImage, Textbox } from "fabric";

function Editor({ image }) {

    const canvasRef = useRef(null);
    const fabricCanvas = useRef(null);

    // ✅ Create canvas once
    useEffect(() => {

        fabricCanvas.current = new Canvas(canvasRef.current);

        return () => {
            fabricCanvas.current.dispose();
        };

    }, []);

    // ✅ Load generated image
    useEffect(() => {

        if (!image || !fabricCanvas.current) return;

        const canvas = fabricCanvas.current;
        canvas.clear();

        FabricImage.fromURL(image).then((img) => {

            img.scaleToWidth(500);
            canvas.add(img);
            canvas.centerObject(img);
            canvas.renderAll();

        });

    }, [image]);

    // ⭐ Add Text
    const addText = () => {

        const canvas = fabricCanvas.current;

        const text = new Textbox("Your Text Here", {
            left: 100,
            top: 100,
            fontSize: 30,
            fill: "white"
        });

        canvas.add(text);
    };

    // ⭐ Download Image
    const downloadImage = () => {

        const canvas = fabricCanvas.current;

        const dataURL = canvas.toDataURL({
            format: "png",
            quality: 1
        });

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "ai-image.png";
        link.click();
    };

    return (
        <div>

            <button onClick={addText}>
                Add Text
            </button>

            <button onClick={downloadImage}>
                Download Image
            </button>

            <br /><br />

            <canvas ref={canvasRef} width="600" height="400"></canvas>

        </div>
    );
}

export default Editor;
