import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import SettingsDrawer from "../components/SettingsDrawer";

export default function MainLayout({
  pins,
  onCreate,
  searchQuery,
  setSearchQuery,
}) {
  const location = useLocation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [drawerType, setDrawerType] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  let activeTab = "Home";
  if (location.pathname === "/profile") activeTab = "Profile";

  const closeDrawer = () => setDrawerType(null);
  const closeSettings = () => setIsSettingsOpen(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar
        activeTab={activeTab}
        onCreate={onCreate}
        onOpenNotifications={() => setDrawerType("Notifications")}
        onOpenMessages={() => setDrawerType("Messages")}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <div className="relative min-w-0 flex-1 overflow-y-auto">
        <Header
          isSearchFocused={isSearchFocused}
          setIsSearchFocused={setIsSearchFocused}
          isUserMenuOpen={isUserMenuOpen}
          setIsUserMenuOpen={setIsUserMenuOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Outlet context={{ pins }} />
      </div>

      {drawerType && <Drawer type={drawerType} onClose={closeDrawer} />}

      {isSettingsOpen && <SettingsDrawer onClose={closeSettings} />}
    </div>
  );
}
