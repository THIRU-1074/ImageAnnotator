// App.jsx
import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import UploadImageDisplay from "./components/UploadImageDisplay";
import ShapeCollection from "./components/ShapeCollection";
import ShapeBox from "./components/ShapeBox";
import AnnotationList from "./components/AnnotationList";

export default function App() {
  const [imageSrc, setImageSrc] = useState("");
  const [shapes, setShapes] = useState([]);

  const updateShape = (updated) => {
    setShapes((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const deleteShape = (id) => {
    setShapes((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Image Annotator</h1>
      <div className="flex flex-col items-center space-y-6">
        <ImageUpload setImageSrc={setImageSrc} />
        <UploadImageDisplay imageSrc={imageSrc} />
        {imageSrc && (
          <>
            <ShapeCollection shapes={shapes} setShapes={setShapes} />
            <div className="relative w-full max-w-md border border-dashed border-gray-400">
              <img src={imageSrc} className="w-full" alt="Uploaded" />
              {shapes.map((shape) => (
                <ShapeBox
                  key={shape.id}
                  shape={shape}
                  onDelete={deleteShape}
                  onUpdate={updateShape}
                />
              ))}
            </div>
          </>
        )}
        <AnnotationList shapes={shapes} setShapes={setShapes} />
      </div>
    </div>
  );
}
