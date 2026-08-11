import { BellRing, MessageCircleMore, Plus, Send, X } from "lucide-react";

function GlassesIllustration() {
  return (
    <div
      className="relative mx-auto h-28 w-40 md:h-36 md:w-52"
      aria-hidden="true"
    >
      <span className="absolute left-4 top-5 h-16 w-16 rounded-[42%] border-[8px] border-[#f5bb3c] bg-[#fbdc80] md:left-5 md:h-20 md:w-20 md:border-[10px]" />
      <span className="absolute right-4 top-5 h-16 w-16 rounded-[42%] border-[8px] border-[#e86f72] bg-[#f7b1ad] md:right-5 md:h-20 md:w-20 md:border-[10px]" />
      <span className="absolute left-[70px] top-[48px] h-2 w-6 rounded bg-[#755e43] md:left-[91px] md:top-[62px] md:h-2 md:w-8" />
    </div>
  );
}

function MessageIllustration() {
  return (
    <div
      className="relative mx-auto h-32 w-44 md:h-40 md:w-52"
      aria-hidden="true"
    >
      <div className="absolute left-10 top-3 h-14 w-24 rotate-[-10deg] rounded-[50%] bg-[#d9edff] shadow-sm md:left-12 md:top-4 md:h-16 md:w-28" />
      <div className="absolute left-[74px] top-9 h-10 w-10 rotate-12 rounded-full bg-[#f6c94c] md:left-[88px] md:top-11 md:h-12 md:w-12" />
      <div className="absolute left-[50px] top-15 h-10 w-10 -rotate-6 rounded-full bg-[#e98777] md:left-[62px] md:top-19 md:h-12 md:w-12" />
      <span className="absolute right-6 top-0 text-xl md:right-8 md:text-2xl">
        ✈
      </span>
    </div>
  );
}

export default function Drawer({ type, onClose }) {
  const isNotifications = type === "Notifications";

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-[300px] max-w-[85vw] flex-col bg-white px-4 py-4 shadow-2xl transition-transform duration-300 ease-out md:left-20 md:w-[360px] md:px-6 md:py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold md:text-2xl">{type}</h2>
        <button
          onClick={onClose}
          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-[#e9e9e9] md:h-10 md:w-10"
        >
          <X size={18} className="md:size-[22px]" />
        </button>
      </div>
      {isNotifications ? (
        <div className="flex flex-1 flex-col items-center justify-center pb-12 text-center md:pb-20">
          <GlassesIllustration />
          <BellRing className="mt-2 text-[#E60023]" size={22} />
          <h3 className="mt-3 text-lg font-bold md:mt-4 md:text-xl">
            Updates are on the way
          </h3>
          <p className="mt-2 max-w-[220px] text-xs leading-5 text-[#767676] md:max-w-[260px] md:text-sm md:leading-6">
            Use updates to see activity from people and boards you follow.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-5 space-y-2 md:mt-7">
            <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm font-semibold transition hover:bg-[#f0f0f0] md:px-3 md:py-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#E60023] text-white">
                <Plus size={18} />
              </span>
              New message
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm font-semibold transition hover:bg-[#f0f0f0] md:px-3 md:py-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e9e9e9]">
                <Send size={16} />
              </span>
              Invite your friends
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center pb-12 text-center md:pb-20">
            <MessageIllustration />
            <MessageCircleMore className="mt-2 text-[#E60023]" size={22} />
            <h3 className="mt-3 text-lg font-bold md:mt-4 md:text-xl">
              Start a conversation
            </h3>
            <p className="mt-2 max-w-[220px] text-xs leading-5 text-[#767676] md:max-w-[260px] md:text-sm md:leading-6">
              Send Pins, ideas, and inspiration to the people you know.
            </p>
          </div>
        </>
      )}
    </aside>
  );
}
