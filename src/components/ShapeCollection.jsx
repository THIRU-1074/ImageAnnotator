import { useState } from "react";
import ShapeBox from "./ShapeBox";

const shapeTypes = ["rectangle", "circle", "arrow"];

export default function ShapeCollection({ shapes, setShapes }) {
  const handleAddShape = (type) => {
    const newShape = {
      id: Date.now(),
      type,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      rotate: 0,
    };
    setShapes((prev) => [...prev, newShape]);
  };

  return (
    <div className="flex space-x-4 p-4">
      {shapeTypes.map((type) => (
        <button
          key={type}
          onClick={() => handleAddShape(type)}
          className="bg-white text-black px-3 py-1 rounded hover:bg-gray-300"
        >
          {type}
        </button>
      ))}
    </div>
  );
}
