import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home, Compass, Bell, MessageCircle, CirclePlus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import SettingsDrawer from "../components/SettingsDrawer";

export default function MainLayout({
  pins,
  onCreate,
  searchQuery,
  setSearchQuery,
  user,
  onUserUpdated,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [drawerType, setDrawerType] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  let activeTab = "Home";
  if (location.pathname === "/profile") activeTab = "Profile";
  if (location.pathname === "/explore") activeTab = "Explore";

  const closeDrawer = () => setDrawerType(null);
  const closeSettings = () => setIsSettingsOpen(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* ✅ DESKTOP SIDEBAR: Hidden on mobile */}
      <div className="hidden md:flex md:flex-col md:h-full">
        <Sidebar
          activeTab={activeTab}
          onCreate={onCreate}
          onOpenNotifications={() => setDrawerType("Notifications")}
          onOpenMessages={() => setDrawerType("Messages")}
          onOpenSettings={() => setIsSettingsOpen(true)} // ✅ Desktop uses sidebar
        />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="relative min-w-0 flex-1 overflow-y-auto pb-16 md:pb-0">
        {/* ✅ Pass onOpenSettings to Header for mobile */}
        <Header
          isSearchFocused={isSearchFocused}
          setIsSearchFocused={setIsSearchFocused}
          isUserMenuOpen={isUserMenuOpen}
          setIsUserMenuOpen={setIsUserMenuOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
           onOpenSettings={() => setIsSettingsOpen(true)}
           user={user}
           onUserUpdated={onUserUpdated}
        />
        <Outlet context={{ pins }} />
      </div>

      {/* ✅ MOBILE BOTTOM NAVIGATION: CLEAN (No Settings Gear) */}
      <nav className="fixed bottom-0 left-0 z-30 flex w-full items-center justify-around border-t border-[#efefef] bg-white py-2 md:hidden">
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center gap-0.5 ${activeTab === "Home" ? "text-[#111111]" : "text-[#767676]"}`}
        >
          <Home
            size={20}
            fill={activeTab === "Home" ? "currentColor" : "none"}
          />
          <span className="text-[9px] font-medium">Home</span>
        </button>
        <button onClick={() => navigate("/explore")} className={`flex flex-col items-center gap-0.5 ${activeTab === "Explore" ? "text-[#111111]" : "text-[#767676]"}`}>
          <Compass size={20} />
          <span className="text-[9px] font-medium">Explore</span>
        </button>
        <button
          onClick={() => onCreate()}
          className="flex flex-col items-center gap-0.5 text-[#767676]"
        >
          <CirclePlus size={20} />
          <span className="text-[9px] font-medium">Create</span>
        </button>
        <button
          onClick={() => setDrawerType("Notifications")}
          className={`flex flex-col items-center gap-0.5 ${drawerType === "Notifications" ? "text-[#111111]" : "text-[#767676]"}`}
        >
          <Bell size={20} />
          <span className="text-[9px] font-medium">Notifs</span>
        </button>
        <button
          onClick={() => setDrawerType("Messages")}
          className={`flex flex-col items-center gap-0.5 ${drawerType === "Messages" ? "text-[#111111]" : "text-[#767676]"}`}
        >
          <MessageCircle size={20} />
          <span className="text-[9px] font-medium">Msgs</span>
        </button>
      </nav>

      {drawerType && <Drawer type={drawerType} onClose={closeDrawer} />}
       {isSettingsOpen && <SettingsDrawer onClose={closeSettings} user={user} onUserUpdated={onUserUpdated} />}
    </div>
  );
}
