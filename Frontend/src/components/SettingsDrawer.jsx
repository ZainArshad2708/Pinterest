import { useState } from "react";
import { ArrowLeft, Download, MoreHorizontal, Save, X } from "lucide-react";
import { authApi, clearSession } from "../lib/api";
import { useNavigate } from "react-router-dom";

const menuItems = [
  "Edit profile",
  "Account management",
  "Profile visibility",
  "Refine your recommendations",
  "Link to Pinterest",
  "Social permissions",
  "Notifications",
  "Privacy and data",
  "Security",
  "Branded Content",
  "Labs",
];

function Toggle({ checked, onChange, label, description }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-[#e9e9e9] p-4">
      <span><strong className="block text-sm">{label}</strong><small className="mt-1 block text-xs text-[#767676]">{description}</small></span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-[#E60023]" />
    </label>
  );
}

export default function SettingsDrawer({ onClose, user, onUserUpdated }) {
  const navigate = useNavigate();
  const [activeSetting, setActiveSetting] = useState("Edit profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [about, setAbout] = useState(user?.about || "");
  const [pronouns, setPronouns] = useState(user?.pronouns || "");
  const [visibility, setVisibility] = useState(user?.profileVisibility || "public");
  const [settings, setSettings] = useState(user?.settings || {});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");

  const save = async (data = {}) => {
    try {
      const { user: updatedUser } = await authApi.updateProfile(data);
      onUserUpdated(updatedUser);
      setStatus("Changes saved");
    } catch (error) {
      setStatus(error.message);
    }
  };

  const saveProfile = () => save({ name, about, pronouns });
  const saveSettings = () => save({ settings });
  const selectSetting = (item) => {
    setActiveSetting(item);
    setIsMobileMenuOpen(false);
    setStatus("");
  };
  const downloadData = async () => {
    const data = await authApi.exportData();
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "pinterest-data.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Your data download has started");
  };
  const updateSetting = (key, value) => setSettings((current) => ({ ...current, [key]: value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 backdrop-blur-[2px] sm:p-4">
      <div className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:h-[85vh]">
        <div className="flex items-center justify-between border-b border-[#efefef] p-4 sm:hidden">
          <h2 className="text-lg font-bold">Settings</h2>
          <div className="flex gap-2">
            <button aria-label="Open settings menu" onClick={() => setIsMobileMenuOpen((open) => !open)} className="rounded-full p-2 text-[#767676] hover:bg-[#e9e9e9]"><MoreHorizontal size={22} /></button>
            <button aria-label="Close settings" onClick={onClose} className="rounded-full p-2 text-[#767676] hover:bg-[#e9e9e9]"><X size={20} /></button>
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden sm:flex-row">
          {isMobileMenuOpen && <div className="absolute inset-0 z-10 bg-black/20 sm:hidden" onClick={() => setIsMobileMenuOpen(false)} />}
          <aside className={`${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} absolute inset-y-0 left-0 z-20 w-64 overflow-y-auto bg-[#fafafa] p-4 transition-transform sm:static sm:block sm:w-64 sm:translate-x-0 sm:border-r sm:border-[#efefef] sm:p-6`}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Settings</h2>
              <button aria-label="Close settings menu" onClick={onClose} className="hidden text-[#767676] hover:text-[#111111] sm:block"><X size={24} /></button>
            </div>
            <ul className="space-y-1">
              {menuItems.map((item) => <li key={item}><button onClick={() => selectSetting(item)} className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium ${activeSetting === item ? "bg-[#e9e9e9] text-[#111111]" : "text-[#767676] hover:bg-[#f0f0f0] hover:text-[#111111]"}`}>{item}</button></li>)}
            </ul>
          </aside>

          <section className="flex-1 overflow-y-auto bg-white p-5 sm:p-10">
            <div className="flex items-center gap-2">
              <button aria-label="Close settings" onClick={onClose} className="rounded-full p-2 hover:bg-[#f0f0f0] sm:hidden"><ArrowLeft size={18} /></button>
              <h1 className="text-2xl font-bold sm:text-3xl">{activeSetting}</h1>
            </div>
            {status && <p className={`mt-3 rounded-lg p-3 text-sm ${status.includes("saved") || status.includes("started") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{status}</p>}

            {activeSetting === "Edit profile" && <div className="mt-6 max-w-xl space-y-5">
              <p className="text-sm text-[#767676]">Update the details people see on your profile.</p>
              <div className="flex items-center gap-4"><span className="grid h-16 w-16 place-items-center rounded-full bg-[#f6c94c] text-2xl font-bold text-[#5a4600]">{(name || "P").charAt(0).toUpperCase()}</span><span className="text-sm text-[#767676]">Your profile avatar is generated from your name.</span></div>
              <label className="block text-sm font-medium">Name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-[#e9e9e9] p-3 outline-none focus:border-[#111111]" /></label>
              <label className="block text-sm font-medium">About<textarea value={about} onChange={(event) => setAbout(event.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-[#e9e9e9] p-3 outline-none focus:border-[#111111]" /></label>
              <label className="block text-sm font-medium">Pronouns<select value={pronouns} onChange={(event) => setPronouns(event.target.value)} className="mt-2 w-full rounded-xl border border-[#e9e9e9] p-3"><option value="">Choose pronouns</option><option>She/Her</option><option>He/Him</option><option>They/Them</option></select></label>
              <button onClick={saveProfile} className="flex items-center gap-2 rounded-full bg-[#E60023] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#ad001b]"><Save size={16} /> Save profile</button>
            </div>}

            {activeSetting === "Account management" && <div className="mt-6 max-w-xl space-y-4"><p className="text-sm text-[#767676]">Manage the account currently signed in.</p><div className="rounded-xl border border-[#e9e9e9] p-4"><strong>{user?.name}</strong><p className="text-sm text-[#767676]">{user?.email}</p><p className="mt-2 text-xs capitalize text-[#767676]">{user?.accountType || "personal"} account</p></div><button onClick={() => save({ accountType: user?.accountType === "business" ? "personal" : "business" })} className="rounded-full bg-[#111111] px-5 py-2.5 text-sm font-bold text-white">Switch to {user?.accountType === "business" ? "personal" : "business"}</button><button onClick={() => { clearSession(); navigate("/login", { replace: true }); onClose(); }} className="block rounded-full bg-[#f0f0f0] px-5 py-2.5 text-sm font-bold">Sign out of this account</button><button onClick={async () => { if (!window.confirm("Delete this account permanently?")) return; await authApi.deleteAccount(); clearSession(); navigate("/login", { replace: true }); onClose(); }} className="block rounded-full px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50">Delete account</button></div>}

            {activeSetting === "Profile visibility" && <div className="mt-6 max-w-xl space-y-4"><p className="text-sm text-[#767676]">Choose who can see your profile and ideas.</p><Toggle label="Private profile" description="Only people you approve can view your profile." checked={visibility === "private"} onChange={(checked) => setVisibility(checked ? "private" : "public")} /><button onClick={() => save({ profileVisibility: visibility })} className="rounded-full bg-[#E60023] px-5 py-2.5 text-sm font-bold text-white">Save visibility</button></div>}

            {activeSetting === "Refine your recommendations" && <div className="mt-6 max-w-xl space-y-4"><p className="text-sm text-[#767676]">Choose the subjects you want to see more often.</p>{["Home decor", "Food and recipes", "Fashion", "Travel"].map((item) => <Toggle key={item} label={item} description={`Show more ${item.toLowerCase()} ideas`} checked={settings[`interest_${item}`] !== false} onChange={(checked) => updateSetting(`interest_${item}`, checked)} />)}<button onClick={saveSettings} className="rounded-full bg-[#E60023] px-5 py-2.5 text-sm font-bold text-white">Save recommendations</button></div>}

            {activeSetting === "Link to Pinterest" && <div className="mt-6 max-w-xl space-y-4"><p className="text-sm text-[#767676]">Connect a website so people can discover more of your work.</p><input placeholder="https://your-website.com" value={settings.website || ""} onChange={(event) => updateSetting("website", event.target.value)} className="w-full rounded-xl border border-[#e9e9e9] p-3" /><button onClick={saveSettings} className="rounded-full bg-[#E60023] px-5 py-2.5 text-sm font-bold text-white">Save website</button></div>}

            {activeSetting === "Social permissions" && <div className="mt-6 max-w-xl space-y-4"><Toggle label="Personalized sharing" description="Allow Pinterest to suggest people you may know." checked={settings.socialSuggestions !== false} onChange={(checked) => updateSetting("socialSuggestions", checked)} /><Toggle label="Messages from people" description="Allow messages from people you do not follow." checked={settings.openMessages === true} onChange={(checked) => updateSetting("openMessages", checked)} /><button onClick={saveSettings} className="rounded-full bg-[#E60023] px-5 py-2.5 text-sm font-bold text-white">Save permissions</button></div>}

            {activeSetting === "Notifications" && <div className="mt-6 max-w-xl space-y-4"><Toggle label="Email notifications" description="Receive updates about your account by email." checked={settings.emailNotifications !== false} onChange={(checked) => updateSetting("emailNotifications", checked)} /><Toggle label="Push notifications" description="Receive activity notifications in your browser." checked={settings.pushNotifications === true} onChange={(checked) => updateSetting("pushNotifications", checked)} /><button onClick={saveSettings} className="rounded-full bg-[#E60023] px-5 py-2.5 text-sm font-bold text-white">Save notifications</button></div>}

            {activeSetting === "Privacy and data" && <div className="mt-6 max-w-xl space-y-4"><p className="text-sm text-[#767676]">You control your information and can download a copy at any time.</p><button onClick={downloadData} className="flex items-center gap-2 rounded-full bg-[#111111] px-5 py-2.5 text-sm font-bold text-white"><Download size={16} /> Download your data</button><button onClick={() => { localStorage.removeItem("pinterest_search_history"); setStatus("Search history cleared"); }} className="block rounded-full bg-[#f0f0f0] px-5 py-2.5 text-sm font-bold">Clear search history</button></div>}

            {activeSetting === "Security" && <form onSubmit={async (event) => { event.preventDefault(); try { await authApi.updatePassword({ currentPassword, newPassword }); setCurrentPassword(""); setNewPassword(""); setStatus("Password updated"); } catch (error) { setStatus(error.message); } }} className="mt-6 max-w-xl space-y-4"><p className="text-sm text-[#767676]">Use a strong password to keep your account safe.</p><input required type="password" placeholder="Current password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="w-full rounded-xl border border-[#e9e9e9] p-3" /><input required minLength={8} type="password" placeholder="New password (8+ characters)" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="w-full rounded-xl border border-[#e9e9e9] p-3" /><button className="rounded-full bg-[#E60023] px-5 py-2.5 text-sm font-bold text-white">Update password</button></form>}

            {activeSetting === "Branded Content" && <div className="mt-6 max-w-xl space-y-4"><p className="text-sm text-[#767676]">Declare sponsored content clearly when you collaborate with brands.</p><Toggle label="Show paid partnership label" description="Add a visible label to Pins you mark as sponsored." checked={settings.brandedContent === true} onChange={(checked) => updateSetting("brandedContent", checked)} /><button onClick={saveSettings} className="rounded-full bg-[#E60023] px-5 py-2.5 text-sm font-bold text-white">Save branded content settings</button></div>}

            {activeSetting === "Labs" && <div className="mt-6 max-w-xl space-y-4"><p className="text-sm text-[#767676]">Try experimental features before they become generally available.</p><Toggle label="Early access" description="Receive experimental Pinterest features when available." checked={settings.earlyAccess === true} onChange={(checked) => updateSetting("earlyAccess", checked)} /><button onClick={saveSettings} className="rounded-full bg-[#E60023] px-5 py-2.5 text-sm font-bold text-white">Save Labs settings</button></div>}
          </section>
        </div>
      </div>
    </div>
  );
}
