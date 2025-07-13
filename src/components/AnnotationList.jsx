import AnnotationItem from "./AnnotationItem";

export default function AnnotationList({ shapes, setShapes }) {
  const updateShape = (updatedShape) => {
    setShapes((prev) =>
      prev.map((s) => (s.id === updatedShape.id ? updatedShape : s))
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-2">Annotations</h2>
      {shapes.length === 0 && (
        <p className="text-gray-500">No annotations yet.</p>
      )}
      {shapes.map((shape) => (
        <AnnotationItem key={shape.id} shape={shape} onUpdate={updateShape} />
      ))}
    </div>
  );
}
