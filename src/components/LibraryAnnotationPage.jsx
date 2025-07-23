import ShapeBox from "./ShapeBox";
import ShapeCollection from "./ShapeCollection";
import AnnotationList from "./AnnotationList";

export default function LibraryAnnotationPage({
  openTabs,
  currentTab,
  setCurrentTab,
  setOpenTabs,
  tabShapes,
  setTabShapes,
}) {
  const shapes = tabShapes[currentTab] || [];

  const updateShape = (updated) => {
    setTabShapes((prev) => ({
      ...prev,
      [currentTab]: (prev[currentTab] || []).map((s) =>
        s.id === updated.id ? updated : s
      ),
    }));
  };

  const deleteShape = (id) => {
    setTabShapes((prev) => ({
      ...prev,
      [currentTab]: (prev[currentTab] || []).filter((s) => s.id !== id),
    }));
  };

  const handleNewShapes = (newShapes) => {
    setTabShapes((prev) => ({
      ...prev,
      [currentTab]: newShapes,
    }));
  };

  const handleCloseTab = (tabUrl) => {
    const filtered = openTabs.filter((t) => t !== tabUrl);
    setOpenTabs(filtered);

    if (tabUrl === currentTab) {
      setCurrentTab(filtered.length ? filtered[0] : null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex flex-wrap bg-white p-2 rounded shadow">
        {openTabs.map((url, i) => (
          <div
            key={i}
            className={`flex items-center space-x-2 px-4 py-1 rounded cursor-pointer mr-2 ${
              url === currentTab ? "bg-blue-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setCurrentTab(url)}
          >
            <img src={url} className="h-6 w-6 rounded" alt={`tab-${i}`} />
            <span className="text-sm text-gray-800 truncate max-w-[100px]">
              Image {i + 1}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseTab(url);
              }}
              className="text-gray-600 hover:text-red-500 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Image and annotation canvas */}
      {currentTab ? (
        <>
          <ShapeCollection
            shapes={shapes}
            setShapes={handleNewShapes}
          />
          <div className="relative w-full max-w-md border border-dashed border-gray-400 mx-auto">
            <img src={currentTab} className="w-full" alt="Selected" />
            {shapes.map((shape) => (
              <ShapeBox
                key={shape.id}
                shape={shape}
                onUpdate={updateShape}
                onDelete={deleteShape}
              />
            ))}
          </div>
          <AnnotationList
            shapes={shapes}
            setShapes={handleNewShapes}
          />
        </>
      ) : (
        <p className="text-gray-500 text-center">No image selected.</p>
      )}
    </div>
  );
}
