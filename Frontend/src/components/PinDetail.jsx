import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Heart,
  Image as ImageIcon,
  MessageCircle,
  MoreHorizontal,
  Share2,
  Smile,
  Trash2,
} from "lucide-react";
import { pinsApi } from "../lib/api";

export default function PinDetail({ pins, user, onDelete, onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const pin = pins.find((item) => item.id === Number(id));
  const [loadedPin, setLoadedPin] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [newComments, setNewComments] = useState([]);
  const [shareStatus, setShareStatus] = useState("");

  useEffect(() => {
    pinsApi.detail(id).then(({ pin: detailedPin }) => setLoadedPin(detailedPin)).catch(() => setLoadedPin(null));
  }, [id]);

  if (!pin) return <div className="grid min-h-full place-items-center text-sm text-[#767676]">Pin not found</div>;

  const activePin = loadedPin || pin;
  const relatedPins = pins.filter((item) => item.id !== activePin.id).slice(0, 12);
  const currentUserAvatar = `https://i.pravatar.cc/100?u=${user?.id || user?.email || "current-user"}`;
  const comments = [...(activePin.comments || []), ...newComments.map((body, index) => ({ id: `new-${index}`, body, authorName: user?.name || "You", authorAvatar: currentUserAvatar }))];

  const submitComment = () => {
    if (!comment.trim()) return;
    setNewComments((current) => [...current, comment.trim()]);
    setComment("");
  };
  const sharePin = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("Link copied");
    } catch {
      setShareStatus(window.location.href);
    }
  };
  const deletePin = () => {
    if (window.confirm("Are you sure you want to delete this pin?")) {
      onDelete(activePin.id);
      navigate("/");
    }
  };

  return (
    <main className="min-h-full bg-white px-2 py-3 sm:px-4 md:px-5 md:py-4">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 lg:grid-cols-[minmax(420px,1.2fr)_minmax(360px,.95fr)_minmax(250px,.65fr)]">
        <section className="relative min-h-[520px] overflow-hidden rounded-2xl border border-[#e4e4e4] bg-[#f4f4f2] lg:min-h-[calc(100vh-145px)]">
          <button onClick={() => navigate("/")} aria-label="Back to home" className="absolute left-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-sm hover:bg-white"><ArrowLeft size={22} /></button>
          <img src={activePin.imageUrl} alt={activePin.title} className="h-full min-h-[520px] w-full object-contain lg:min-h-[calc(100vh-145px)]" />
        </section>

        <section className="flex min-h-[520px] flex-col rounded-2xl border border-[#e4e4e4] bg-white p-5 md:p-7 lg:min-h-[calc(100vh-145px)]">
          <div className="flex items-center justify-between border-b border-[#e9e9e9] pb-5">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsLiked((liked) => !liked)} aria-label="Like pin" className="flex items-center gap-2 text-lg font-semibold hover:text-[#E60023]"><Heart size={27} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "text-[#E60023]" : ""} /><span className="text-sm">{isLiked ? "Liked" : "Like"}</span></button>
              <button onClick={() => document.getElementById("comment-input")?.focus()} aria-label="Open comments" className="hover:text-[#E60023]"><MessageCircle size={27} /></button>
              <button onClick={sharePin} aria-label="Share pin" className="hover:text-[#E60023]"><Share2 size={27} /></button>
              <div className="relative">
                <button onClick={() => setIsMenuOpen((open) => !open)} aria-label="More pin actions" className="hover:text-[#E60023]"><MoreHorizontal size={27} /></button>
                {isMenuOpen && <div className="absolute left-0 top-9 z-20 w-40 rounded-xl bg-white p-1 shadow-xl ring-1 ring-black/5"><button onClick={() => { onEdit(activePin); setIsMenuOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-[#f0f0f0]">Edit pin</button><button onClick={deletePin} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-[#f0f0f0]"><Trash2 size={15} />Delete pin</button></div>}
              </div>
            </div>
            <button onClick={() => setIsSaved((saved) => !saved)} className={`rounded-full px-5 py-3 text-sm font-bold text-white ${isSaved ? "bg-[#111111]" : "bg-[#E60023] hover:bg-[#ad001b]"}`}>{isSaved ? <span className="flex items-center gap-1"><Check size={17} />Saved</span> : "Save"}</button>
          </div>

          <div className="mt-3 rounded-xl bg-[#e7e7e4] px-4 py-3 text-center text-sm font-semibold">Remix this idea</div>

          <div className="mt-7 flex items-center justify-between border-b border-[#e9e9e9] pb-4">
            <h1 className="text-xl font-bold">{comments.length} comments</h1>
            <button aria-label="Toggle comments" className="text-xl">⌄</button>
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto py-4">
            {comments.map((item) => <article key={item.id} className="flex items-start gap-3"><img src={item.authorAvatar} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" /><p className="pt-1 text-sm leading-5"><strong className="mr-1">{item.authorName}</strong>{item.body}</p></article>)}
          </div>

          <div className="mt-3 border-t border-[#e9e9e9] pt-4">
            <div className="mb-3 flex items-center gap-3"><img src={activePin.authorAvatar} alt="" className="h-9 w-9 rounded-full object-cover" /><div><p className="text-sm font-bold">{activePin.authorName || "Pinterest creator"}</p><p className="text-xs text-[#767676]">{activePin.title}</p></div></div>
            <div className="flex items-center gap-2 rounded-full border border-[#dedede] px-4 py-2.5 focus-within:border-[#111111]">
              <input id="comment-input" value={comment} onChange={(event) => setComment(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") submitComment(); }} placeholder="Add a comment" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8a8a8a]" />
              <button onClick={() => setComment((value) => `${value} :)`)} aria-label="Add emoji"><Smile size={21} /></button>
              <button onClick={submitComment} aria-label="Post comment"><ImageIcon size={21} /></button>
            </div>
            {shareStatus && <p className="mt-2 text-xs text-[#767676]">{shareStatus}</p>}
          </div>
        </section>

        <aside className="columns-2 gap-3 lg:max-h-[calc(100vh-145px)] lg:overflow-y-auto">
          {relatedPins.map((relatedPin) => <button key={relatedPin.id} onClick={() => navigate(`/pin/${relatedPin.id}`)} className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-[#f0f0f0] text-left transition hover:opacity-90"><img src={relatedPin.imageUrl} alt={relatedPin.title} className="w-full object-cover" style={{ aspectRatio: relatedPin.ratio }} loading="lazy" /></button>)}
        </aside>
      </div>
    </main>
  );
}
