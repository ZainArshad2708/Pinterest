import { useNavigate } from "react-router-dom";
import {
  Bell,
  CirclePlus,
  Compass,
  Grid2X2,
  Home,
  MessageCircle,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, page: "Home" },
  { label: "Explore", icon: Compass, page: "Explore" },
  { label: "Notifications", icon: Bell, page: "Notifications" },
  { label: "Messages", icon: MessageCircle, page: "Messages" },
  { label: "Create", icon: CirclePlus, page: "Create" },
];

export default function Sidebar({
  activeTab,
  onCreate,
  onOpenNotifications,
  onOpenMessages,
  onOpenSettings,
}) {
  const navigate = useNavigate();

  return (
    <aside className="z-40 flex h-screen w-20 shrink-0 flex-col items-center border-r border-[#efefef] bg-white py-5">
      <button
        aria-label="Pinterest home"
        onClick={() => navigate("/")}
        className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-[#f4f4f4]"
      >
        <img src="/Pinterest.svg.webp" alt="Pinterest" className="h-8 w-8" />
      </button>

      <nav
        className="mt-4 flex flex-col items-center gap-4"
        aria-label="Primary navigation"
      >
        {navItems.map(({ label, icon: Icon, page }) => {
          const isActive = activeTab === page;
          return (
            <button
              key={label}
              aria-label={label}
              title={label}
              onClick={() => {
                if (page === "Create") {
                  onCreate();
                } else if (page === "Home") {
                  navigate("/");
                } else if (page === "Profile") {
                  navigate("/profile");
                } else if (page === "Notifications") {
                  onOpenNotifications();
                } else if (page === "Messages") {
                  onOpenMessages();
                }
              }}
              className={`grid h-11 w-11 place-items-center rounded-full transition ${
                isActive
                  ? "bg-[#e9e9e9] text-[#111111]"
                  : "text-[#767676] hover:bg-[#e9e9e9] hover:text-[#111111]"
              }`}
            >
              {page === "Explore" ? (
                <Grid2X2 size={23} strokeWidth={2.25} />
              ) : (
                <Icon
                  size={23}
                  fill={page === "Home" && isActive ? "currentColor" : "none"}
                  strokeWidth={2.25}
                />
              )}
            </button>
          );
        })}
      </nav>

      <button
        aria-label="Settings"
        title="Settings"
        onClick={onOpenSettings}
        className="mt-auto grid h-11 w-11 place-items-center rounded-full text-[#767676] transition hover:bg-[#e9e9e9] hover:text-[#111111]"
      >
        <Settings size={22} strokeWidth={2.25} />
      </button>
    </aside>
  );
}
