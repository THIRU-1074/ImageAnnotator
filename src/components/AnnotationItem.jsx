import { useState } from "react";

export default function AnnotationItem({ shape, onUpdate }) {
  const [localShape, setLocalShape] = useState(shape);

  const handleChange = (field, value) => {
    const updated = { ...localShape, [field]: value };
    setLocalShape(updated);
    onUpdate(updated);
  };

  return (
    <div className="border rounded p-3 space-y-2 bg-gray-50">
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm font-medium">
          Name
          <input
            type="text"
            className="w-full border px-2 py-1 rounded text-sm"
            value={localShape.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </label>
        <label className="text-sm font-medium">
          Color
          <input
            type="color"
            className="w-full border px-2 py-1 rounded"
            value={localShape.color || "#ff0000"}
            onChange={(e) => handleChange("color", e.target.value)}
          />
        </label>
        <label className="text-sm font-medium">
          X
          <input
            type="number"
            className="w-full border px-2 py-1 rounded text-sm"
            value={localShape.x}
            onChange={(e) => handleChange("x", parseInt(e.target.value))}
          />
        </label>
        <label className="text-sm font-medium">
          Y
          <input
            type="number"
            className="w-full border px-2 py-1 rounded text-sm"
            value={localShape.y}
            onChange={(e) => handleChange("y", parseInt(e.target.value))}
          />
        </label>
        <label className="text-sm font-medium">
          Width
          <input
            type="number"
            className="w-full border px-2 py-1 rounded text-sm"
            value={localShape.width}
            onChange={(e) => handleChange("width", parseInt(e.target.value))}
          />
        </label>
        <label className="text-sm font-medium">
          Height
          <input
            type="number"
            className="w-full border px-2 py-1 rounded text-sm"
            value={localShape.height}
            onChange={(e) => handleChange("height", parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label className="text-sm font-medium">
          Description
          <textarea
            className="w-full border px-2 py-1 rounded text-sm"
            value={localShape.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
