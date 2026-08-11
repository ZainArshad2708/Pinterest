import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";

export default function CreatePinModal({
  onClose,
  onSave,
  editingPin,
  onUpdate,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (editingPin) {
      setTitle(editingPin.title || "");
      setDescription(editingPin.description || "");
      setPreviewUrl(editingPin.imageUrl);
    }
  }, [editingPin]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = () => {
    if (!previewUrl) return alert("Please upload an image first!");

    const data = new FormData();
    data.append("title", title || "Untitled pin");
    data.append("description", description);
    if (file) data.append("image", file);

    if (editingPin) {
      onUpdate({
        id: editingPin.id,
        data,
      });
    } else {
      onSave(data);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-[2px]">
      {/* ✅ Responsive Container: Full width on mobile, fixed width on desktop */}
      <div className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:h-[90vh] md:flex-row max-h-[98vh]">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/80 hover:bg-white md:bg-transparent md:hover:bg-[#f0f0f0]"
        >
          <X size={20} />
        </button>

        {/* ✅ Left Side: Full height on mobile, half on desktop */}
        <div className="flex flex-1 flex-col items-center justify-center bg-[#f0f0f0] p-4 md:min-h-full md:p-12">
          {!previewUrl ? (
            <label className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#b5b5b5] bg-white p-4 text-center transition hover:bg-[#fafafa] md:h-full md:p-6">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[#e9e9e9] md:h-16 md:w-16">
                <Upload size={24} className="text-[#767676] md:size-[28px]" />
              </div>
              <p className="mt-2 text-base font-bold md:mt-4 md:text-lg">
                Choose a file
              </p>
              <p className="mt-1 text-xs text-[#767676] md:text-sm">
                or drag and drop it here
              </p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="relative h-full w-full max-h-[300px] md:max-h-none overflow-hidden rounded-2xl bg-white shadow-sm">
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
                className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* ✅ Right Side: Stacks below on mobile */}
        <div className="flex flex-1 flex-col p-4 md:p-10">
          <div className="flex-1 space-y-4 md:space-y-6">
            <div className="space-y-1">
              <input
                type="text"
                placeholder="Add your title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-b-2 border-transparent bg-transparent text-xl font-bold outline-none placeholder:text-[#b5b5b5] focus:border-b-[#767676] md:text-3xl"
              />
            </div>
            <div className="space-y-1">
              <textarea
                placeholder="Tell everyone what this Pin is about"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-[#b5b5b5] md:text-base"
                rows={3}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#e9e9e9] pt-4 md:pt-6">
            <button
              onClick={onClose}
              className="rounded-full bg-[#f0f0f0] px-4 py-2 text-xs font-bold transition hover:bg-[#e4e4e4] md:px-4 md:py-2.5 md:text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-full bg-[#E60023] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#ad001b] md:px-4 md:py-2.5 md:text-sm"
            >
              {editingPin ? "Update" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
