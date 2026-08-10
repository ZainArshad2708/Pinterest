import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import MainLayout from './layouts/MainLayout'

// Pages
import Login from './login'
import Register from './Register'
import Notifications from './pages/Notifications' // ✅ Added
import Messages from './pages/Messages'           // ✅ Added

// Components
import HomeFeed from './components/HomeFeed'
import ProfilePage from './components/ProfilePage'
import CreatePinModal from './components/CreatePinModal'
import PinDetail from './components/PinDetail'

// ... (Keep your defaultPins array here exactly as it is) ...

export default function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  
  const [pins, setPins] = useState(() => {
    const savedPins = localStorage.getItem('pinterest_clone_pins')
    return savedPins ? JSON.parse(savedPins) : defaultPins
  })

  useEffect(() => {
    localStorage.setItem('pinterest_clone_pins', JSON.stringify(pins))
  }, [pins])

  const addPin = (newPinData) => {
    const newPin = { id: Date.now(), ...newPinData, ratio: '4 / 5' }
    setPins([newPin, ...pins])
    setIsCreateModalOpen(false)
  }

  const deletePin = (pinId) => {
    const updatedPins = pins.filter((pin) => pin.id !== pinId)
    setPins(updatedPins)
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes (no sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App Routes (with sidebar) */}
        <Route path="/" element={<MainLayout pins={pins} onCreate={() => setIsCreateModalOpen(true)} />}>
          <Route index element={<HomeFeed pins={pins} />} />
          <Route path="profile" element={<ProfilePage pins={pins} />} />
          <Route path="notifications" element={<Notifications />} /> {/* ✅ Added */}
          <Route path="messages" element={<Messages />} />           {/* ✅ Added */}
          
          {/* Pin Detail Route */}
          <Route path="pin/:id" element={<PinDetail pins={pins} onDelete={deletePin} />} />
        </Route>
        
        {/* Catch-all: If someone goes to a bad URL, send them home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Create Modal - Global overlay */}
      {isCreateModalOpen && <CreatePinModal onClose={() => setIsCreateModalOpen(false)} onSave={addPin} />}
    </BrowserRouter>
  )
}