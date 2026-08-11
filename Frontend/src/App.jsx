import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { authApi, clearSession, getToken, pinsApi } from "./lib/api";

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

function readStoredUser() {
  try {
    const storedUser = localStorage.getItem("pinterest_user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem("pinterest_user");
    return null;
  }
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pinToEdit, setPinToEdit] = useState(null);
  const [pins, setPins] = useState([]);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [user, setUser] = useState(readStoredUser);

  const updateUser = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem("pinterest_user", JSON.stringify(nextUser));
  };

  useEffect(() => {
    if (!getToken()) {
      setIsAuthLoading(false);
      if (!["/login", "/register"].includes(location.pathname)) navigate("/login", { replace: true });
      return;
    }
    Promise.all([authApi.me(), pinsApi.list()])
      .then(([{ user }, { pins: loadedPins }]) => {
        updateUser(user);
        setPins(loadedPins);
      })
      .catch((error) => {
        clearSession();
        setAuthError(error.message);
        navigate("/login", { replace: true });
      })
      .finally(() => setIsAuthLoading(false));
  }, [location.pathname, navigate]);

  const filteredPins = pins.filter((pin) =>
    pin.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const addPin = async (newPinData) => {
    const { pin } = await pinsApi.create(newPinData);
    setPins((currentPins) => [pin, ...currentPins]);
    setIsCreateModalOpen(false);
  };

  const editPin = async (updatedPin) => {
    const { pin } = await pinsApi.update(updatedPin.id, updatedPin.data);
    setPins((currentPins) => currentPins.map((item) => (item.id === pin.id ? pin : item)));
    setIsCreateModalOpen(false);
    setPinToEdit(null);
  };

  const deletePin = async (pinId) => {
    await pinsApi.remove(pinId);
    setPins((currentPins) => currentPins.filter((pin) => pin.id !== pinId));
  };

  if (isAuthLoading) return <div className="grid min-h-screen place-items-center text-sm text-[#767676]">Loading Pinterest...</div>;

  return (
    <>
      {authError && <div className="fixed left-1/2 top-3 z-[70] -translate-x-1/2 rounded-full bg-red-100 px-4 py-2 text-xs text-red-700">{authError}</div>}
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
              user={user}
              onUserUpdated={updateUser}
            />
          }
        >
          <Route index element={<HomeFeed pins={filteredPins} />} />
          <Route path="explore" element={<HomeFeed pins={pins} />} />
           <Route path="profile" element={<ProfilePage pins={pins} user={user} />} />
          <Route path="boards" element={<BoardsPage />} />
          <Route
            path="pin/:id"
            element={
              <PinDetail
                pins={pins}
                user={user}
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
    </>
  );
}
