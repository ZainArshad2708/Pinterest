import { LayoutGrid, Paperclip, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Corkboard() {
  return (
    <div
      className="relative mx-auto h-36 w-44 rounded-[22px] bg-[#dfb278] p-3 shadow-[inset_0_0_0_5px_#b97747,0_9px_18px_rgba(17,17,17,.12)]"
      aria-hidden="true"
    >
      <span className="absolute left-5 top-4 h-3 w-3 rounded-full bg-[#e60023] shadow" />
      <span className="absolute right-5 top-4 h-3 w-3 rounded-full bg-[#4a91d6] shadow" />
      <div className="absolute left-7 top-8 h-16 w-14 -rotate-6 rounded-sm bg-[#fffcf1] p-2 shadow">
        <div className="h-1.5 w-8 rounded bg-[#ffbd4a]" />
        <div className="mt-2 h-1.5 w-10 rounded bg-[#e9e9e9]" />
        <div className="mt-1.5 h-1.5 w-7 rounded bg-[#e9e9e9]" />
      </div>
      <div className="absolute bottom-5 right-7 grid h-16 w-16 rotate-6 place-items-center rounded-sm bg-[#c7e6d0] shadow">
        <Paperclip size={27} className="rotate-[-18deg] text-[#27875b]" />
      </div>
    </div>
  );
}

export default function ProfilePage({ pins }) {
  const navigate = useNavigate();
  // Just use the pins passed down directly
  const unorganisedPins = pins.slice(0, 4);

  return (
    <main className="mx-auto min-h-[calc(100vh-80px)] max-w-[1400px] px-6 pb-10 pt-8 lg:px-10">
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your saved ideas
          </h1>
          <div className="mt-6 flex gap-6 text-sm font-semibold">
            <button className="border-b-[3px] border-[#111111] pb-2">
              Pins
            </button>
            <button
              onClick={() => navigate("/boards")}
              className="pb-2 text-[#767676] transition hover:text-[#111111]"
            >
              Boards
            </button>
            <button className="pb-2 text-[#767676] hover:text-[#111111]">
              Collages
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f6c94c] font-bold text-[#5a4600]">
            Z
          </span>
          <span className="mr-2 leading-tight">
            <strong className="block">zain arshad</strong>
            <small className="text-[#767676]">0 following</small>
          </span>
          <button className="flex items-center gap-2 rounded-full bg-[#e9e9e9] px-4 py-3 text-sm font-bold transition hover:bg-[#dcdcdc]">
            <Share2 size={17} /> Share profile
          </button>
        </div>
      </div>

      <section className="flex min-h-[350px] flex-col items-center justify-center py-10 text-center">
        <Corkboard />
        <h2 className="mt-5 text-2xl font-bold">Organise your ideas</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[#767676]">
          Pins are sparks for your next idea. Create boards to collect and
          organise the things you love.
        </p>
        <button className="mt-5 rounded-full bg-[#E60023] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#ad001b]">
          Create a board
        </button>
      </section>

      <section className="mt-4 border-t border-[#e9e9e9] pt-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Unorganised ideas</h2>
            <p className="mt-1 text-sm text-[#767676]">
              Ideas you haven’t added to a board yet
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-full bg-[#e9e9e9] px-4 py-3 text-sm font-bold transition hover:bg-[#dcdcdc]">
            <LayoutGrid size={17} /> Organise
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {unorganisedPins.map((pin) => (
            <article
              key={pin.id}
              className="overflow-hidden rounded-2xl bg-[#f0f0f0]"
            >
              <img
                src={pin.imageUrl}
                alt={pin.title}
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
