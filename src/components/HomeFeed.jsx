import { useNavigate } from 'react-router-dom'
import { MoreHorizontal, Upload } from 'lucide-react'

export default function HomeFeed({ pins }) {
  const navigate = useNavigate()

  return (
    <main className="px-4 pb-8 pt-2 sm:px-6">
      <section className="columns-2 gap-3 sm:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6">
        {pins.map((pin) => (
          <div 
            key={pin.id} 
            onClick={() => navigate(`/pin/${pin.id}`)} // Clicking navigates here
            className="group relative mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-[#f0f0f0] cursor-pointer"
          >
            <img src={pin.imageUrl} alt={pin.title} className="block w-full object-cover" style={{ aspectRatio: pin.ratio }} loading="lazy" />
            
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/50 opacity-0 transition duration-200 group-hover:opacity-100" />
            
            <button className="absolute right-3 top-3 rounded-full bg-[#E60023] px-4 py-1.5 text-sm font-bold text-white opacity-0 shadow-sm transition hover:bg-[#ad001b] group-hover:opacity-100">
              Save
            </button>

            <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
              <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm">
                <Upload size={16} />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}