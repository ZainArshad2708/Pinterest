import { useState } from "react";
import { Upload, X } from "lucide-react";

export default function CreatePinModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = () => {
    if (!previewUrl) return alert("Please upload an image first!");

    onSave({
      title: title || "Untitled pin",
      imageUrl: previewUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]">
      {/* Modal Container */}
      <div className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:h-[90vh] md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/80 hover:bg-white md:bg-transparent md:hover:bg-[#f0f0f0]"
        >
          <X size={22} />
        </button>

        {/* Left Side: Image Upload */}
        <div className="flex flex-1 flex-col items-center justify-center bg-[#f0f0f0] p-8 md:min-h-full md:p-12">
          {!previewUrl ? (
            <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#b5b5b5] bg-white p-6 text-center transition hover:bg-[#fafafa]">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#e9e9e9]">
                <Upload size={28} className="text-[#767676]" />
              </div>
              <p className="mt-4 text-lg font-bold">Choose a file</p>
              <p className="mt-1 text-sm text-[#767676]">
                or drag and drop it here
              </p>
              <p className="mt-4 text-xs text-[#767676]">
                Recommended: Square 1:1, up to 20MB
              </p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-sm">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-full object-contain"
              />
              <button
                onClick={() => {
                  setFile(null);
                  setPreviewUrl(null);
                }}
                className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Form Details */}
        <div className="flex flex-1 flex-col p-6 md:p-10">
          <div className="flex-1 space-y-6">
            <div className="space-y-1">
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Add your title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-b-2 border-transparent bg-transparent text-3xl font-bold outline-none placeholder:text-[#b5b5b5] focus:border-b-[#767676]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="description" className="sr-only">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Tell everyone what this Pin is about"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none bg-transparent text-base outline-none placeholder:text-[#b5b5b5]"
                rows={4}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#e9e9e9] pt-6">
            <button
              onClick={onClose}
              className="rounded-full bg-[#f0f0f0] px-4 py-2.5 text-sm font-bold transition hover:bg-[#e4e4e4]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-full bg-[#E60023] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#ad001b]"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
