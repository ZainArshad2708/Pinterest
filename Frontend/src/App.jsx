//it means hum bakend ko yaha sy call kreingy
const API_URL = "http://localhost:5000/api";
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



export default function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pinToEdit, setPinToEdit] = useState(null);

  const [pins, setPins] = useState([]);
  useEffect(() => {
    //backend sy data fetch krna
    fetch(`${API_URL}/pins`)
      .then((res) => res.json())
      .then((data) => setPins(data))
      .catch((err) => console.error("Error Fetching pins:", err));
  }, []);
  // ✅ ADD THIS BLOCK TO PROTECT THE APP
  useEffect(() => {
    const user = localStorage.getItem("pinterest_user");
    // If no user is found, send them to login (unless they are already there)
    if (
      !user &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      window.location.href = "/login"; // Force redirect
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pinterest_clone_pins", JSON.stringify(pins));
  }, [pins]);

  const filteredPins = pins.filter((pin) =>
    pin.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const addPin = async (newPinData) => {
    try {
      const response = await fetch(`${API_URL}/pins`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(newPinData),
      });
      const savedPin = await response.json();
      setPins([savedPin, ...pins]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error saving pin:", error);
    }
  };

  const editPin = (updatedPin) => {
    setPins((prevPins) =>
      prevPins.map((pin) => (pin.id === updatedPin.id ? updatedPin : pin)),
    );
    setIsCreateModalOpen(false);
    setPinToEdit(null);
  };

  const deletePin = async (pinId) => {
    try {
      await fetch(`${API_URL}/pins/${pinId}`, {
        method: "DELETE",
      });
      setPins(pins.filter((pin) => pin.id !== pinId)); //pin feed sy delete kro
    } catch (error) {
      console.error("Error deleting pin", error);
    }
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
