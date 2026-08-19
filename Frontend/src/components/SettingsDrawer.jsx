import { useState } from "react";
import { X, ExternalLink, MoreHorizontal, ArrowLeft } from "lucide-react";

export default function SettingsDrawer({ onClose }) {
  const [activeSetting, setActiveSetting] = useState("Edit profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For the slide-out menu on mobile
  const [name, setName] = useState("zain arshad");
  const [about, setAbout] = useState("");
  const [pronouns, setPronouns] = useState("");

  const menuItems = [
    { label: "Edit profile", id: "edit-profile" },
    { label: "Account management", id: "account-management" },
    { label: "Profile visibility", id: "profile-visibility" },
    { label: "Refine your recommendations", id: "refine-recommendations" },
    { label: "Link to Pinterest", id: "link-to-pinterest" },
    { label: "Social permissions", id: "social-permissions" },
    { label: "Notifications", id: "notifications" },
    { label: "Privacy and data", id: "privacy-data" },
    { label: "Security", id: "security" },
    { label: "Branded Content", id: "branded-content" },
    { label: "Labs", id: "labs" },
  ];

  const handleSave = () => {
    localStorage.setItem("pinterest_user_name", name);
    alert("Profile settings saved locally!");
  };

  const handleReset = () => {
    setName("zain arshad");
    setAbout("");
    setPronouns("");
  };

  // Helper to switch categories and close the mobile menu
  const handleMenuSelect = (label) => {
    setActiveSetting(label);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-2 sm:p-4">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl h-[90vh] sm:h-[85vh] relative">
        {/* ============================================ */}
        {/* MOBILE OVERLAY HEADER (3 Dots + Close) */}
        {/* ============================================ */}
        <div className="flex items-center justify-between border-b border-[#efefef] p-4 sm:hidden">
          <h2 className="text-lg font-bold">Settings</h2>
          <div className="flex items-center gap-2">
            {/* ✅ 3-DOTS BUTTON TO OPEN THE SIDE MENU */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full p-2 text-[#767676] transition hover:bg-[#e9e9e9]"
            >
              <MoreHorizontal size={22} />
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-[#767676] transition hover:bg-[#e9e9e9]"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden flex-col sm:flex-row">
          {/* ============================================ */}
          {/* MOBILE SIDE MENU (Slide-out overlay) */}
          {/* ============================================ */}
          <div
            className={`absolute inset-y-0 left-0 z-20 w-64 transform bg-[#fafafa] p-4 transition-transform duration-300 ease-in-out sm:hidden ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Settings</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#767676]"
              >
                <X size={24} />
              </button>
            </div>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuSelect(item.label)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                      activeSetting === item.label
                        ? "bg-[#e9e9e9] text-[#111111]"
                        : "text-[#767676] hover:bg-[#f0f0f0] hover:text-[#111111]"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Dark overlay behind mobile menu */}
          {isMobileMenuOpen && (
            <div
              className="absolute inset-0 z-10 bg-black/20 sm:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* ============================================ */}
          {/* DESKTOP SIDEBAR (Visible on sm and up) */}
          {/* ============================================ */}
          <div className="hidden w-64 flex-shrink-0 border-r border-[#efefef] bg-[#fafafa] p-6 overflow-y-auto sm:block">
            <div className="mb-6 flex items-center justify-between pr-2">
              <h2 className="text-xl font-bold">Settings</h2>
              <button
                onClick={onClose}
                className="text-[#767676] transition hover:text-[#111111]"
              >
                <X size={24} />
              </button>
            </div>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSetting(item.label)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                      activeSetting === item.label
                        ? "bg-[#e9e9e9] text-[#111111]"
                        : "text-[#767676] hover:bg-[#f0f0f0] hover:text-[#111111]"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ============================================ */}
          {/* RIGHT CONTENT: Full width on mobile */}
          {/* ============================================ */}
          <div className="flex-1 overflow-y-auto bg-white p-5 sm:p-10 relative">
            <h1 className="hidden text-3xl font-bold sm:block">
              {activeSetting}
            </h1>

            {activeSetting === "Edit profile" && (
              <>
                <p className="mt-2 text-sm text-[#767676]">
                  Keep your personal details private. Information you add here
                  is visible to anyone who can view your profile.
                </p>

                <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 max-w-xl">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Photo
                    </label>
                    <div className="flex items-center gap-4">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f6c94c] text-xl font-bold text-[#5a4600] sm:h-16 sm:w-16 sm:text-2xl">
                        Z
                      </span>
                      <button className="rounded-full bg-[#e9e9e9] px-4 py-2 text-xs font-semibold transition hover:bg-[#dcdcdc] sm:px-4 sm:py-2 sm:text-sm">
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-[#e9e9e9] p-3 text-sm outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">About</label>
                    <textarea
                      rows={3}
                      placeholder="Tell your story"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="w-full rounded-xl border border-[#e9e9e9] p-3 text-sm outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Pronouns</label>
                    <select
                      value={pronouns}
                      onChange={(e) => setPronouns(e.target.value)}
                      className="w-full rounded-xl border border-[#e9e9e9] p-3 text-sm outline-none focus:border-[#111111] text-[#767676]"
                    >
                      <option value="">Add your pronouns</option>
                      <option value="she/her">She/Her</option>
                      <option value="he/him">He/Him</option>
                      <option value="they/them">They/Them</option>
                    </select>
                    <p className="mt-1 text-xs text-[#767676]">
                      Choose up to 2 sets of pronouns to appear on your profile.
                    </p>
                  </div>

                  <div className="flex justify-end gap-3 border-t border-[#e9e9e9] pt-6">
                    <button
                      onClick={handleReset}
                      className="rounded-full bg-[#e9e9e9] px-6 py-2 text-xs font-bold transition hover:bg-[#dcdcdc] sm:px-6 sm:py-2.5 sm:text-sm"
                    >
                      Reset
                    </button>
                    <button
                      onClick={handleSave}
                      className="rounded-full bg-[#E60023] px-6 py-2 text-xs font-bold text-white transition hover:bg-[#ad001b] sm:px-6 sm:py-2.5 sm:text-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeSetting !== "Edit profile" && (
              <div className="mt-8 flex items-center justify-center rounded-xl bg-[#f9f9f9] p-8 text-center">
                <p className="text-xs text-[#767676] sm:text-sm">
                  This settings section is coming soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
