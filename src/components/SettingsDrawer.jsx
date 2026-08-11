import { useState } from "react";
import { X, ExternalLink } from "lucide-react";

export default function SettingsDrawer({ onClose }) {
  const [activeSetting, setActiveSetting] = useState("Edit profile");
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
    // For now, just saves to local storage like our pins
    localStorage.setItem("pinterest_user_name", name);
    alert("Profile settings saved locally!");
  };

  const handleReset = () => {
    setName("zain arshad");
    setAbout("");
    setPronouns("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="flex h-[90vh] w-[95%] max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* === LEFT SIDEBAR: MENU === */}
        <div className="w-64 flex-shrink-0 border-r border-[#efefef] bg-[#fafafa] p-6 overflow-y-auto">
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

          {/* Support section */}
          <div className="mt-8 space-y-1 border-t border-[#e9e9e9] pt-6">
            <p className="px-3 pb-2 text-xs font-semibold text-[#767676]">
              Support
            </p>
            {[
              "Help Centre",
              "Create widget",
              "Removals",
              "Personalised ads",
              "Your privacy rights",
              "Privacy Policy",
              "Terms of Service",
            ].map((item) => (
              <button
                key={item}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-[#767676] transition hover:bg-[#f0f0f0] hover:text-[#111111]"
              >
                <span>{item}</span>
                <ExternalLink size={14} className="text-[#767676]" />
              </button>
            ))}
          </div>
        </div>

        {/* === RIGHT CONTENT: ACTIVE SETTING PANEL === */}
        <div className="flex-1 overflow-y-auto bg-white p-10">
          <h1 className="text-3xl font-bold">{activeSetting}</h1>

          {activeSetting === "Edit profile" && (
            <>
              <p className="mt-2 text-sm text-[#767676]">
                Keep your personal details private. Information you add here is
                visible to anyone who can view your profile.
              </p>

              <div className="mt-8 space-y-6 max-w-xl">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-[#f6c94c] text-2xl font-bold text-[#5a4600]">
                      Z
                    </span>
                    <button className="rounded-full bg-[#e9e9e9] px-4 py-2 text-sm font-semibold transition hover:bg-[#dcdcdc]">
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
                    className="rounded-full bg-[#e9e9e9] px-6 py-2.5 text-sm font-bold transition hover:bg-[#dcdcdc]"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleSave}
                    className="rounded-full bg-[#E60023] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#ad001b]"
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          )}

          {activeSetting !== "Edit profile" && (
            <div className="mt-8 flex items-center justify-center rounded-xl bg-[#f9f9f9] p-12 text-center">
              <p className="text-[#767676]">
                This settings section is coming soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
