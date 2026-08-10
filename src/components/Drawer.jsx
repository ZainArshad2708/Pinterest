import { BellRing, MessageCircleMore, Plus, Send, X } from 'lucide-react'

function GlassesIllustration() {
  return (
    <div className="relative mx-auto h-36 w-52" aria-hidden="true">
      <span className="absolute left-5 top-7 h-20 w-20 rounded-[42%] border-[10px] border-[#f5bb3c] bg-[#fbdc80]" />
      <span className="absolute right-5 top-7 h-20 w-20 rounded-[42%] border-[10px] border-[#e86f72] bg-[#f7b1ad]" />
      <span className="absolute left-[91px] top-[62px] h-2 w-8 rounded bg-[#755e43]" />
      <span className="absolute left-0 top-2 rotate-[-25deg] text-3xl">✨</span>
      <span className="absolute right-1 bottom-1 rotate-[18deg] text-2xl">✦</span>
      <span className="absolute left-12 top-16 h-3 w-5 -rotate-12 rounded-full bg-[#4a91d6]" />
      <span className="absolute right-12 top-16 h-3 w-5 rotate-12 rounded-full bg-[#4a91d6]" />
    </div>
  )
}

function MessageIllustration() {
  return (
    <div className="relative mx-auto h-40 w-52" aria-hidden="true">
      <div className="absolute left-12 top-4 h-16 w-28 rotate-[-10deg] rounded-[50%] bg-[#d9edff] shadow-sm" />
      <div className="absolute left-[88px] top-11 h-12 w-12 rotate-12 rounded-full bg-[#f6c94c]" />
      <div className="absolute left-[62px] top-19 h-12 w-12 -rotate-6 rounded-full bg-[#e98777]" />
      <div className="absolute bottom-3 left-3 h-10 w-16 rounded-[50%] bg-[#75b5e9]" />
      <div className="absolute bottom-4 right-3 h-12 w-20 rounded-[50%] bg-[#a2d9a8]" />
      <span className="absolute right-8 top-0 text-2xl">✈</span>
    </div>
  )
}

export default function Drawer({ type, onClose }) {
  const isNotifications = type === 'Notifications'
  return (
    <aside className="fixed left-20 top-0 z-30 flex h-screen w-[360px] max-w-[calc(100vw-5rem)] flex-col bg-white px-6 py-6 shadow-drawer transition-transform duration-300 ease-out">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{type}</h2>
        <button aria-label={`Close ${type}`} onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#e9e9e9]"><X size={22} /></button>
      </div>
      {isNotifications ? (
        <div className="flex flex-1 flex-col items-center justify-center pb-20 text-center">
          <GlassesIllustration />
          <BellRing className="mt-2 text-[#E60023]" size={25} />
          <h3 className="mt-4 text-xl font-bold">Updates are on the way</h3>
          <p className="mt-2 max-w-[260px] text-sm leading-6 text-[#767676]">Use updates to see activity from people and boards you follow.</p>
        </div>
      ) : (
        <>
          <div className="mt-7 space-y-2">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left font-semibold transition hover:bg-[#f0f0f0]"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#E60023] text-white"><Plus size={20} /></span>New message</button>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left font-semibold transition hover:bg-[#f0f0f0]"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#e9e9e9]"><Send size={18} /></span>Invite your friends</button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center pb-20 text-center">
            <MessageIllustration />
            <MessageCircleMore className="mt-2 text-[#E60023]" size={25} />
            <h3 className="mt-4 text-xl font-bold">Start a conversation</h3>
            <p className="mt-2 max-w-[260px] text-sm leading-6 text-[#767676]">Send Pins, ideas, and inspiration to the people you know.</p>
          </div>
        </>
      )}
    </aside>
  )
}
