import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Drawer from "../components/Drawer"; // ✅ Import your existing Drawer

export default function MainLayout({ pins, onCreate }) {
  const location = useLocation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // ✅ State for Drawers
  const [drawerType, setDrawerType] = useState(null); // Stores 'Notifications' or 'Messages'

  // Determine active tab based on URL path
  let activeTab = "Home";
  if (location.pathname === "/profile") activeTab = "Profile";

  // ✅ Close drawer function
  const closeDrawer = () => setDrawerType(null);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* ✅ Pass the drawer open functions to Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onCreate={onCreate}
        onOpenNotifications={() => setDrawerType("Notifications")}
        onOpenMessages={() => setDrawerType("Messages")}
      />

      <div className="relative min-w-0 flex-1 overflow-y-auto">
        {/* Header is now clean - no drawer props passed here */}
        <Header
          isSearchFocused={isSearchFocused}
          setIsSearchFocused={setIsSearchFocused}
          isUserMenuOpen={isUserMenuOpen}
          setIsUserMenuOpen={setIsUserMenuOpen}
        />
        <Outlet context={{ pins }} />
      </div>

      {/* ✅ Render the Drawer if a type is selected */}
      {drawerType && <Drawer type={drawerType} onClose={closeDrawer} />}
    </div>
  );
}
