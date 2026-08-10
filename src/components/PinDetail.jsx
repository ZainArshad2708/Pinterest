import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal, Smile, Image as ImageIcon, Check, Trash2 } from 'lucide-react'

export default function PinDetail({ pins, onDelete }) {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const pin = pins.find(p => p.id === parseInt(id))
  
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!pin) {
    return <div className="flex h-screen items-center justify-center">Pin not found</div>
  }

  const relatedPins = pins.filter((p) => p.id !== pin.id).slice(0, 8)

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this pin?")) {
      onDelete(pin.id)
      navigate('/') // Navigate back home after deleting
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:h-[90vh] md:flex-row">
        
        {/* Left Panel */}
        <div className="relative flex flex-1 flex-col bg-[#f8f8f8] p-3 md:p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1 text-[#111111]">
              <button onClick={() => navigate('/')} className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#e9e9e9]">
                <ArrowLeft size={20} strokeWidth={2.5} />
              </button>
              
              <button onClick={() => setIsLiked(!isLiked)} className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#e9e9e9]">
                <Heart size={20} strokeWidth={2.5} fill={isLiked ? 'currentColor' : 'none'} className={isLiked ? 'text-[#E60023]' : 'text-[#111111]'} />
              </button>
              <button className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#e9e9e9]">
                <MessageCircle size={20} strokeWidth={2.5} />
              </button>
              <button className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#e9e9e9]">
                <Share2 size={20} strokeWidth={2.5} />
              </button>
              
              <div className="relative">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#e9e9e9]">
                  <MoreHorizontal size={20} strokeWidth={2.5} />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 top-10 z-50 w-40 rounded-xl bg-white p-1 shadow-xl ring-1 ring-black/5">
                    <button onClick={handleDelete} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-[#f0f0f0]">
                      <Trash2 size={16} />Delete pin
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button onClick={() => setIsSaved(!isSaved)} style={{ backgroundColor: isSaved ? '#111111' : '#E60023' }} className="flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-bold text-white shadow-sm transition-colors border-0 outline-none"
              onMouseEnter={(e) => { if (isSaved) e.currentTarget.style.backgroundColor = '#000000'; else e.currentTarget.style.backgroundColor = '#ad001b'; }}
              onMouseLeave={(e) => { if (isSaved) e.currentTarget.style.backgroundColor = '#111111'; else e.currentTarget.style.backgroundColor = '#E60023'; }}
            >
              {isSaved ? (<><Check size={18} strokeWidth={3} />Saved</>) : ('Save')}
            </button>
          </div>

          <div className="flex-1 overflow-hidden rounded-xl bg-white shadow-sm">
            <img src={pin.imageUrl} alt={pin.title} className="h-full w-full object-contain" />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f6c94c] text-xs font-bold text-[#5a4600]">J</span>
            <span className="text-sm font-semibold">Julie Harris</span>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white p-4 md:max-w-[50%] overflow-y-auto">
          <div className="columns-2 gap-2 sm:columns-3">
            {relatedPins.map((relatedPin) => (
              <div key={relatedPin.id} className="mb-2 break-inside-avoid overflow-hidden rounded-xl bg-[#f0f0f0] cursor-pointer transition hover:shadow-md"
                onClick={() => navigate(`/pin/${relatedPin.id}`)}
              >
                <img src={relatedPin.imageUrl} alt={relatedPin.title} className="w-full object-cover" style={{ aspectRatio: relatedPin.ratio }} loading="lazy" />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-sm font-semibold text-[#767676]">Ideas you might like</div>
        </div>
      </div>
    </div>
  )
}