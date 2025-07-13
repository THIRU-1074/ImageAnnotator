// components/UploadImageDisplay.jsx
export default function UploadImageDisplay({ imageSrc }) {
  return (
    <div className="w-full max-w-md">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Uploaded preview"
          className="mt-4 rounded shadow-md w-full"
        />
      ) : (
        <p className="text-gray-500 text-center">No image uploaded yet</p>
      )}
    </div>
  );
}
