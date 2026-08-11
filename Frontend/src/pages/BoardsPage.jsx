import { useState } from "react";
import { Plus } from "lucide-react";

export default function BoardsPage() {
  const [boardName, setBoardName] = useState("");
  const [boards, setBoards] = useState([
    { id: 1, name: "Summer Vibes", pinCount: 3 },
    { id: 2, name: "Dream Interiors", pinCount: 5 },
  ]);

  const handleCreateBoard = () => {
    if (!boardName.trim()) return;
    const newBoard = {
      id: Date.now(),
      name: boardName,
      pinCount: 0,
    };
    setBoards([newBoard, ...boards]);
    setBoardName("");
  };

  return (
    <main className="mx-auto max-w-[1400px] px-6 pb-10 pt-8 lg:px-10">
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your boards
          </h1>
          <p className="mt-2 text-sm text-[#767676]">
            Organise your ideas into collections.
          </p>
        </div>

        {/* Create Board Button + Input */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="New board name..."
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="rounded-full border border-[#e9e9e9] px-4 py-2.5 text-sm outline-none focus:border-[#111111]"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateBoard();
            }}
          />
          <button
            onClick={handleCreateBoard}
            className="flex items-center gap-2 rounded-full bg-[#E60023] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#ad001b]"
          >
            <Plus size={18} /> Create board
          </button>
        </div>
      </div>

      {/* Boards Grid */}
      <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {boards.map((board) => (
          <div
            key={board.id}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#f0f0f0] aspect-[4/3] transition hover:shadow-md"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/20 to-transparent">
              <h3 className="text-xl font-bold text-white drop-shadow-md">
                {board.name}
              </h3>
              <p className="text-sm text-white/80">{board.pinCount} pins</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
