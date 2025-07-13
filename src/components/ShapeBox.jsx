import { Rnd } from "react-rnd";
import { useState } from "react";
import { RotateCw, X } from "lucide-react";

export default function ShapeBox({ shape, onDelete, onUpdate }) {
  const [rotation, setRotation] = useState(shape.rotate);

  const rotate = () => {
    const newRotate = (rotation + 15) % 360;
    setRotation(newRotate);
    onUpdate({ ...shape, rotate: newRotate });
  };

  return (
    <Rnd
      default={{
        x: shape.x,
        y: shape.y,
        width: shape.width,
        height: shape.height,
      }}
      onDragStop={(e, d) => onUpdate({ ...shape, x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) =>
        onUpdate({
          ...shape,
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          x: position.x,
          y: position.y,
        })
      }
      bounds="parent"
      style={{ zIndex: 10 }}
    >
      <div
        className="relative w-full h-full border-2 border-dotted border-red-600"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Delete Button */}
        <button
          onClick={() => onDelete(shape.id)}
          className="absolute -top-2 -right-2
    w-8 h-8 
    flex items-center justify-center
    border border-gray-400 rounded-full 
    z-10
    pointer-events-auto
    opacity-0 hover:opacity-100
    transition-opacity duration-200
    cursor-pointer"
          style={{ width: "20px", height: "20px" }}
        >
          <X size={12} />
        </button>

        {/* Rotate Button */}
        <button
          onClick={rotate}
          className="absolute -top-2 -left-2
    w-8 h-8 
    flex items-center justify-center
    border border-gray-400 rounded-full 
    z-10
    pointer-events-auto
    opacity-0 hover:opacity-100
    transition-opacity duration-200
    cursor-pointer"
          style={{ width: "20px", height: "20px" }}
        >
          <RotateCw size={12} />
        </button>

        {/* Shape rendering */}
        {shape.type === "circle" && (
          <div className="w-full h-full rounded-full border-4 border-red-600 bg-transparent"></div>
        )}

        {shape.type === "rectangle" && (
          <div className="w-full h-full border-4 border-red-600 bg-transparent"></div>
        )}

        {shape.type === "arrow" && (
          <div className="w-full h-full flex justify-center items-center">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="red" />
                </marker>
              </defs>
              <line
                x1="10"
                y1="50"
                x2="90"
                y2="50"
                stroke="red"
                strokeWidth="4"
                strokeDasharray="6,3"
                markerEnd="url(#arrowhead)"
              />
            </svg>
          </div>
        )}
      </div>
    </Rnd>
  );
}
