import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import BoardsPage from "./pages/BoardsPage";

// Components
import HomeFeed from "./components/HomeFeed";
import ProfilePage from "./components/ProfilePage";
import CreatePinModal from "./components/CreatePinModal";
import PinDetail from "./components/PinDetail";

export const defaultPins = [
  {
    id: 1,
    title: "A soft corner to unwind",
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 5",
  },
  {
    id: 2,
    title: "Beautiful little things",
    imageUrl:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 3",
  },
  {
    id: 3,
    title: "The perfect pasta night",
    imageUrl:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 5",
  },
  {
    id: 4,
    title: "Fresh summer look",
    imageUrl:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 6",
  },
  {
    id: 5,
    title: "Seaside state of mind",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 3",
  },
  {
    id: 6,
    title: "Simple flower arrangement",
    imageUrl:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 5",
  },
  {
    id: 7,
    title: "Morning light",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 6",
  },
  {
    id: 8,
    title: "A little sweet treat",
    imageUrl:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 4",
  },
  {
    id: 9,
    title: "Wander farther",
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 5",
  },
  {
    id: 10,
    title: "Notes from the garden",
    imageUrl:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 3",
  },
  {
    id: 11,
    title: "Everyday makeup",
    imageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 5",
  },
  {
    id: 12,
    title: "Layers for fall",
    imageUrl:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 6",
  },
  {
    id: 13,
    title: "A well made table",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 4",
  },
  {
    id: 14,
    title: "Citrus on the counter",
    imageUrl:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 5",
  },
  {
    id: 15,
    title: "A place to read",
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 3",
  },
  {
    id: 16,
    title: "Easy neutral manicure",
    imageUrl:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 5",
  },
  {
    id: 17,
    title: "Sunday brunch",
    imageUrl:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 4",
  },
  {
    id: 18,
    title: "Clay and texture",
    imageUrl:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=85",
    ratio: "4 / 5",
  },
];

export default function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pinToEdit, setPinToEdit] = useState(null);

  const [pins, setPins] = useState(() => {
    const savedPins = localStorage.getItem("pinterest_clone_pins");
    return savedPins ? JSON.parse(savedPins) : defaultPins;
  });

  useEffect(() => {
    localStorage.setItem("pinterest_clone_pins", JSON.stringify(pins));
  }, [pins]);

  const filteredPins = pins.filter((pin) =>
    pin.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const addPin = (newPinData) => {
    const newPin = { id: Date.now(), ...newPinData, ratio: "4 / 5" };
    setPins([newPin, ...pins]);
    setIsCreateModalOpen(false);
  };

  const editPin = (updatedPin) => {
    setPins((prevPins) =>
      prevPins.map((pin) => (pin.id === updatedPin.id ? updatedPin : pin)),
    );
    setIsCreateModalOpen(false);
    setPinToEdit(null);
  };

  const deletePin = (pinId) => {
    const updatedPins = pins.filter((pin) => pin.id !== pinId);
    setPins(updatedPins);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <MainLayout
              pins={pins}
              onCreate={() => setIsCreateModalOpen(true)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          }
        >
          <Route index element={<HomeFeed pins={filteredPins} />} />
          <Route path="profile" element={<ProfilePage pins={pins} />} />
          <Route path="boards" element={<BoardsPage />} />
          <Route
            path="pin/:id"
            element={
              <PinDetail
                pins={pins}
                onDelete={deletePin}
                onEdit={(pinToEdit) => {
                  setPinToEdit(pinToEdit);
                  setIsCreateModalOpen(true);
                }}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {isCreateModalOpen && (
        <CreatePinModal
          onClose={() => {
            setIsCreateModalOpen(false);
            setPinToEdit(null);
          }}
          onSave={addPin}
          onUpdate={editPin}
          editingPin={pinToEdit}
        />
      )}
    </BrowserRouter>
  );
}
