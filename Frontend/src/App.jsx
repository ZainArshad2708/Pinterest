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
      .then((data) => {
        (console.log("backend pins is fetching"), setPins(data));
      })
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
      const formData = new FormData();
      formData.append("title", newPinData.title);
      formData.append("description", newPinData.description);
      formData.append("ratio", newPinData.ratio || "4 / 5");
      formData.append("image", newPinData.file);

      const response = await fetch(`${API_URL}/pins`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to save pin");
      }

      const savedPin = await response.json();
      setPins((currentPins) => [savedPin, ...currentPins]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error saving pin:", error);
      throw error;
    }
  };

  const editPin = async (updatedPin) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedPin.title);
      formData.append("description", updatedPin.description);
      formData.append("ratio", updatedPin.ratio || "4 / 5");
      if (updatedPin.file) formData.append("image", updatedPin.file);

      const response = await fetch(`${API_URL}/pins/${updatedPin._id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to update pin");
      }

      const savedPin = await response.json();
      setPins((prevPins) =>
        prevPins.map((pin) => (pin._id === savedPin._id ? savedPin : pin)),
      );
      setIsCreateModalOpen(false);
      setPinToEdit(null);
    } catch (error) {
      console.error("Error updating pin:", error);
      throw error;
    }
  };

  const deletePin = async (pinId) => {
    try {
      await fetch(`${API_URL}/pins/${pinId}`, {
        method: "DELETE",
      });
       setPins(pins.filter((pin) => pin._id !== pinId)); //pin feed sy delete kro
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
