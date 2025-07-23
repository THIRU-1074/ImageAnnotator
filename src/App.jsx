import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import UploadImageDisplay from "./components/UploadImageDisplay";
import ShapeCollection from "./components/ShapeCollection";
import ShapeBox from "./components/ShapeBox";
import AnnotationList from "./components/AnnotationList";
import LibraryAnnotationPage from "./components/LibraryAnnotationPage";

export default function App() {
  const [imageSrc, setImageSrc] = useState("");
  const [shapes, setShapes] = useState([]);
  const [library, setLibrary] = useState([]);
  const [activeView, setActiveView] = useState("upload"); // 'upload' | 'library' | 'annotate' | 'multi-annotate'
  const [openTabs, setOpenTabs] = useState([]); // list of image URLs
  const [currentTab, setCurrentTab] = useState(null); // current active image URL
  const [tabShapes, setTabShapes] = useState({}); // { imgURL: shapes[] }

  const handleNewImage = (src) => {
    setImageSrc(src);
    setLibrary((prev) => [src, ...prev]);
    setShapes([]);
    setActiveView("annotate");
  };

const handleLibraryClick = (src) => {
  if (!openTabs.includes(src)) {
    setOpenTabs((prev) => [...prev, src]);
  }
  setCurrentTab(src);
  setActiveView("multi-annotate");
};


  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-semibold">🖼️ Annotator</h2>
        <nav className="flex flex-col space-y-2">
          <button
            onClick={() => setActiveView("upload")}
            className={`text-left px-4 py-2 rounded ${
              activeView === "upload" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            Upload
          </button>
          <button
            onClick={() => setActiveView("library")}
            className={`text-left px-4 py-2 rounded ${
              activeView === "library" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            Library
          </button>
          <button
            onClick={() => setActiveView("annotate")}
            className={`text-left px-4 py-2 rounded ${
              activeView === "annotate" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            Annotate
          </button>
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
        {activeView === "upload" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Upload Image</h1>
            <ImageUpload setImageSrc={handleNewImage} />
          </>
        )}

        {activeView === "library" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Image Library</h1>
            <ImageLibrary images={library} onSelect={handleLibraryClick} />
          </>
        )}

        {activeView === "annotate" && imageSrc && (
          <>
            <h1 className="text-2xl font-bold mb-6">Annotate</h1>
            <UploadImageDisplay imageSrc={imageSrc} />
            <ShapeCollection shapes={shapes} setShapes={setShapes} />
            <div className="relative w-full max-w-md border border-dashed border-gray-400 mx-auto">
              <img src={imageSrc} className="w-full" alt="Uploaded" />
              {shapes.map((shape) => (
                <ShapeBox
                  key={shape.id}
                  shape={shape}
                  onUpdate={(updated) =>
                    setShapes((prev) =>
                      prev.map((s) => (s.id === updated.id ? updated : s))
                    )
                  }
                  onDelete={(id) =>
                    setShapes((prev) => prev.filter((s) => s.id !== id))
                  }
                />
              ))}
            </div>
            <AnnotationList shapes={shapes} setShapes={setShapes} />
          </>
        )}

        {activeView === "multi-annotate" && currentTab && (
          <LibraryAnnotationPage
            openTabs={openTabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            setOpenTabs={setOpenTabs}
            tabShapes={tabShapes}
            setTabShapes={setTabShapes}
          />
        )}
      </main>
    </div>
  );
}

// 🔁 Horizontal library image picker
function ImageLibrary({ images, onSelect }) {
  return (
    <div className="overflow-x-auto whitespace-nowrap px-2 py-4 bg-white rounded shadow">
      {images.length === 0 ? (
        <p className="text-gray-500">No images in library yet.</p>
      ) : (
        images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`lib-${i}`}
            onClick={() => onSelect(src)}
            className="inline-block h-32 w-auto mx-2 rounded shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
          />
        ))
      )}
    </div>
  );
}
