import { useState } from 'react';

// components/ImageUpload.jsx
export default function ImageUpload({ setImageSrc }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Upload Image</h2>
      <LocalUpload setImageSrc={setImageSrc} />
      <UrlUpload setImageSrc={setImageSrc} />
    </div>
  );
}

// components/LocalUpload.jsx
function LocalUpload({ setImageSrc }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm text-gray-600">Upload from Device</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded cursor-pointer"
      />
    </div>
  );
}

// components/UrlUpload.jsx
function UrlUpload({ setImageSrc }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setImageSrc(url);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <label className="text-sm text-gray-600">Upload via URL</label>
      <input
        type="text"
        placeholder="Enter image URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="p-2 border border-gray-300 rounded text-sm"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </form>
  );
}
