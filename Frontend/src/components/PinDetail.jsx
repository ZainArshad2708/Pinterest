import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Smile,
  Image as ImageIcon,
  Check,
  Trash2,
} from "lucide-react";

export default function PinDetail({ pins, onDelete, onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const pin = pins.find((p) => p.id === parseInt(id));

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!pin) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-[#767676]">
        Pin not found
      </div>
    );
  }

  const relatedPins = pins.filter((p) => p.id !== pin.id).slice(0, 8);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this pin?")) {
      onDelete(pin.id);
      navigate("/");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-[2px]">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:h-[90vh] md:flex-row max-h-[98vh]">
        {/* ✅ LEFT PANEL: Takes full height on mobile, half on desktop */}
        <div className="relative flex flex-1 flex-col bg-[#f8f8f8] p-3 md:p-5 max-h-[98vh] md:max-h-full overflow-y-auto">
          {/* Top Row */}
          <div className="mb-2 flex items-center justify-between md:mb-3">
            <div className="flex items-center gap-1 text-[#111111]">
              <button
                onClick={() => navigate("/")}
                className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-[#e9e9e9] md:h-9 md:w-9"
              >
                <ArrowLeft
                  size={18}
                  strokeWidth={2.5}
                  className="md:size-[20px]"
                />
              </button>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-[#e9e9e9] md:h-9 md:w-9"
              >
                <Heart
                  size={18}
                  strokeWidth={2.5}
                  fill={isLiked ? "currentColor" : "none"}
                  className={isLiked ? "text-[#E60023]" : "text-[#111111]"}
                />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-[#e9e9e9] md:h-9 md:w-9">
                <MessageCircle
                  size={18}
                  strokeWidth={2.5}
                  className="md:size-[20px]"
                />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-[#e9e9e9] md:h-9 md:w-9">
                <Share2
                  size={18}
                  strokeWidth={2.5}
                  className="md:size-[20px]"
                />
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-[#e9e9e9] md:h-9 md:w-9"
                >
                  <MoreHorizontal
                    size={18}
                    strokeWidth={2.5}
                    className="md:size-[20px]"
                  />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 top-9 z-50 w-36 rounded-xl bg-white p-1 shadow-xl ring-1 ring-black/5 md:top-10 md:w-40">
                    <button
                      onClick={() => {
                        onEdit(pin);
                        setIsMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-[#111111] transition hover:bg-[#f0f0f0] md:px-3 md:py-2 md:text-sm"
                    >
                      <span className="text-base">✏️</span> Edit pin
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-red-600 transition hover:bg-[#f0f0f0] md:px-3 md:py-2 md:text-sm"
                    >
                      <Trash2 size={14} className="md:size-[16px]" /> Delete pin
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsSaved(!isSaved)}
              style={{ backgroundColor: isSaved ? "#111111" : "#E60023" }}
              className="flex h-8 items-center justify-center gap-1 whitespace-nowrap rounded-full px-3.5 text-xs font-bold text-white shadow-sm transition-colors border-0 outline-none md:h-9 md:gap-1.5 md:px-4 md:text-sm"
              onMouseEnter={(e) => {
                if (isSaved) e.currentTarget.style.backgroundColor = "#000000";
                else e.currentTarget.style.backgroundColor = "#ad001b";
              }}
              onMouseLeave={(e) => {
                if (isSaved) e.currentTarget.style.backgroundColor = "#111111";
                else e.currentTarget.style.backgroundColor = "#E60023";
              }}
            >
              {isSaved ? (
                <>
                  <Check size={14} strokeWidth={3} className="md:size-[18px]" />
                  Saved
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>

          {/* Main Image */}
          <div className="overflow-hidden rounded-xl bg-white shadow-sm w-full aspect-[4/5] md:aspect-auto md:flex-1">
            <img
              src={pin.imageUrl}
              alt={pin.title}
              className="h-full w-full object-cover md:object-contain"
            />
          </div>

          {/* Title and Description */}
          <div className="mt-3 space-y-1 md:mt-4 md:space-y-2">
            <h2 className="text-lg font-bold text-[#111111] md:text-2xl">
              {pin.title}
            </h2>
            {pin.description && (
              <p className="text-xs text-[#767676] md:text-sm">
                {pin.description}
              </p>
            )}
          </div>

          {/* Author Details */}
          <div className="mt-3 flex items-center gap-2 md:mt-4 md:gap-3">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f6c94c] text-[10px] font-bold text-[#5a4600] md:h-8 md:w-8 md:text-xs">
              Z
            </span>
            <span className="text-xs font-semibold md:text-sm">
              Zain Arshad
            </span>
          </div>

          {/* Comment Input */}
          <div className="mt-2 flex items-center gap-2 rounded-full border border-[#e9e9e9] bg-white px-3 py-1.5 shadow-sm focus-within:border-[#111111] focus-within:ring-1 focus-within:ring-[#111111] md:mt-3 md:px-4 md:py-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 bg-transparent text-xs outline-none placeholder:text-[#767676] md:text-sm"
            />
            <button className="text-[#767676] hover:text-[#111111]">
              <Smile size={14} className="md:size-[18px]" />
            </button>
            <button className="text-[#767676] hover:text-[#111111]">
              <ImageIcon size={14} className="md:size-[18px]" />
            </button>
          </div>
        </div>

        {/* ✅ RIGHT PANEL: Completely HIDDEN on mobile (hidden), shows on sm and up (sm:block) */}
        <div className="hidden sm:block flex-1 bg-white p-3 md:max-w-[50%] overflow-y-auto max-h-[50vh] md:max-h-full">
          <div className="columns-2 gap-2 sm:columns-3">
            {relatedPins.map((relatedPin) => (
              <div
                key={relatedPin.id}
                className="mb-2 break-inside-avoid overflow-hidden rounded-xl bg-[#f0f0f0] cursor-pointer transition hover:shadow-md"
                onClick={() => navigate(`/pin/${relatedPin.id}`)}
              >
                <img
                  src={relatedPin.imageUrl}
                  alt={relatedPin.title}
                  className="w-full object-cover"
                  style={{ aspectRatio: relatedPin.ratio }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-xs font-semibold text-[#767676] md:mt-6 md:text-sm">
            Ideas you might like
          </div>
        </div>
      </div>
    </div>
  );
}
