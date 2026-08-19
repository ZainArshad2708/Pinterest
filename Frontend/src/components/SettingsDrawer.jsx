import { useState } from "react";
import { X, ExternalLink, MoreHorizontal, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SettingsDrawer({ onClose }) {
  const navigate = useNavigate();
  const [activeSetting, setActiveSetting] = useState("Edit profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Profile States
  const [name, setName] = useState(() => {
    const saved = localStorage.getItem("pinterest_profile_name");
    return saved || "zain arshad";
  });
  const [about, setAbout] = useState(() => {
    const saved = localStorage.getItem("pinterest_profile_about");
    return saved || "";
  });
  const [pronouns, setPronouns] = useState(() => {
    const saved = localStorage.getItem("pinterest_profile_pronouns");
    return saved || "";
  });

  // Account Management
  const [email, setEmail] = useState("zainii2003@gmail.com");
  const [password, setPassword] = useState("");

  // Notifications
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);

  // Privacy & Data Toggles
  const [privacyToggles, setPrivacyToggles] = useState({
    siteVisits: true,
    partnerInfo: true,
    adsAboutPinterest: true,
    adReporting: true,
    sharingPartners: true,
    adsOffPinterest: true,
    genAI: true,
  });

  // Security & Labs
  const [twoFactor, setTwoFactor] = useState(false);
  const [googleLogin, setGoogleLogin] = useState(true);
  const [labsEnabled, setLabsEnabled] = useState(true);

  // NEW STATES FOR PROFILE VISIBILITY
  const [privateProfile, setPrivateProfile] = useState(false);
  const [searchPrivacy, setSearchPrivacy] = useState(false);

  // Profile Picture (Simulated)
  const [profilePic, setProfilePic] = useState("Z");

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

  // Save Functions
  const handleSaveProfile = () => {
    localStorage.setItem("pinterest_profile_name", name);
    localStorage.setItem("pinterest_profile_about", about);
    localStorage.setItem("pinterest_profile_pronouns", pronouns);
    const user = JSON.parse(localStorage.getItem("pinterest_user") || "{}");
    if (user) {
      user.name = name;
      localStorage.setItem("pinterest_user", JSON.stringify(user));
    }
    onClose();
  };

  const handleUpdateEmail = () => {
    const user = JSON.parse(localStorage.getItem("pinterest_user") || "{}");
    if (user) {
      user.email = email;
      localStorage.setItem("pinterest_user", JSON.stringify(user));
    }
    onClose();
  };

  const handleResetProfile = () => {
    setName("zain arshad");
    setAbout("");
    setPronouns("");
  };

  const handleMenuSelect = (label) => {
    setActiveSetting(label);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-2 sm:p-4">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl h-[90vh] sm:h-[85vh] relative">
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-[#efefef] p-4 sm:hidden">
          <h2 className="text-lg font-bold">Settings</h2>
          <div className="flex items-center gap-2">
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
          {/* Mobile Slide-out Menu */}
          <div
            className={`absolute inset-y-0 left-0 z-20 w-64 transform bg-[#fafafa] p-4 transition-transform duration-300 ease-in-out sm:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
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
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${activeSetting === item.label ? "bg-[#e9e9e9] text-[#111111]" : "text-[#767676] hover:bg-[#f0f0f0] hover:text-[#111111]"}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {isMobileMenuOpen && (
            <div
              className="absolute inset-0 z-10 bg-black/20 sm:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* Desktop Sidebar */}
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
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${activeSetting === item.label ? "bg-[#e9e9e9] text-[#111111]" : "text-[#767676] hover:bg-[#f0f0f0] hover:text-[#111111]"}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ SETTINGS CONTENT AREA */}
          <div className="flex-1 overflow-y-auto bg-white p-5 sm:p-10 relative">
            <h1 className="hidden text-3xl font-bold sm:block">
              {activeSetting}
            </h1>

            {/* === EDIT PROFILE === */}
            {activeSetting === "Edit profile" && (
              <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 max-w-xl">
                <p className="text-sm text-[#767676]">
                  Update your display name, bio, and pronouns here.
                </p>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f6c94c] text-xl font-bold text-[#5a4600] sm:h-16 sm:w-16 sm:text-2xl">
                      {profilePic}
                    </span>
                    <button
                      onClick={() => setProfilePic("Z")}
                      className="rounded-full bg-[#e9e9e9] px-4 py-2 text-xs font-semibold transition hover:bg-[#dcdcdc] sm:px-4 sm:py-2 sm:text-sm"
                    >
                      Change
                    </button>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-[#e9e9e9] p-3 text-sm outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    About
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell your story"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="w-full rounded-xl border border-[#e9e9e9] p-3 text-sm outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Pronouns
                  </label>
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
                </div>
                <div className="flex justify-end gap-3 border-t border-[#e9e9e9] pt-6">
                  <button
                    onClick={handleResetProfile}
                    className="rounded-full bg-[#e9e9e9] px-6 py-2 text-xs font-bold transition hover:bg-[#dcdcdc] sm:px-6 sm:py-2.5 sm:text-sm"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="rounded-full bg-[#E60023] px-6 py-2 text-xs font-bold text-white transition hover:bg-[#ad001b] sm:px-6 sm:py-2.5 sm:text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* === ACCOUNT MANAGEMENT === */}
            {activeSetting === "Account management" && (
              <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 max-w-xl">
                <p className="text-sm text-[#767676]">
                  Manage your account settings, email, and password.
                </p>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#e9e9e9] p-3 text-sm outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    New Password (Optional)
                  </label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep current"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#e9e9e9] p-3 text-sm outline-none focus:border-[#111111]"
                  />
                </div>
                <div className="flex justify-end gap-3 border-t border-[#e9e9e9] pt-6">
                  <button
                    onClick={onClose}
                    className="rounded-full bg-[#e9e9e9] px-6 py-2 text-xs font-bold transition hover:bg-[#dcdcdc] sm:px-6 sm:py-2.5 sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateEmail}
                    className="rounded-full bg-[#E60023] px-6 py-2 text-xs font-bold text-white transition hover:bg-[#ad001b] sm:px-6 sm:py-2.5 sm:text-sm"
                  >
                    Update Email
                  </button>
                </div>
              </div>
            )}

            {/* === NOTIFICATIONS === */}
            {activeSetting === "Notifications" && (
              <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 max-w-xl">
                <p className="text-sm text-[#767676]">
                  Manage how you receive notifications.
                </p>
                <div className="flex items-center justify-between border-b border-[#e9e9e9] py-4">
                  <span className="text-sm font-medium">
                    Email Notifications
                  </span>
                  <button
                    onClick={() => setEmailNotifs(!emailNotifs)}
                    className={`h-6 w-10 rounded-full transition-colors duration-200 ${emailNotifs ? "bg-[#E60023]" : "bg-[#e9e9e9]"}`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ${emailNotifs ? "translate-x-4" : "translate-x-0"}`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between border-b border-[#e9e9e9] py-4">
                  <span className="text-sm font-medium">
                    Push Notifications
                  </span>
                  <button
                    onClick={() => setPushNotifs(!pushNotifs)}
                    className={`h-6 w-10 rounded-full transition-colors duration-200 ${pushNotifs ? "bg-[#E60023]" : "bg-[#e9e9e9]"}`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ${pushNotifs ? "translate-x-4" : "translate-x-0"}`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* === REFINE YOUR RECOMMENDATIONS === */}
            {activeSetting === "Refine your recommendations" && (
              <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 max-w-2xl">
                <p className="text-sm text-[#767676]">
                  Make your Pinterest more you. Edit the details Pinterest uses
                  to recommend ideas to you.
                </p>
                <div className="flex gap-4 border-b border-[#e9e9e9] pb-2">
                  <button className="border-b-2 border-[#111111] pb-1 text-sm font-bold">
                    Activity
                  </button>
                  <button className="text-sm font-medium text-[#767676] transition hover:text-[#111111]">
                    AI content
                  </button>
                  <button className="text-sm font-medium text-[#767676] transition hover:text-[#111111]">
                    Interests
                  </button>
                  <button className="text-sm font-medium text-[#767676] transition hover:text-[#111111]">
                    Boards
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-[#767676]">
                    Hide ideas related to Pins you recently saved or tapped to
                    view.
                  </p>
                  <button className="mt-2 rounded-full bg-[#e9e9e9] px-6 py-2 text-xs font-bold transition hover:bg-[#dcdcdc] sm:text-sm">
                    Turn off all
                  </button>
                  <p className="mt-6 text-sm text-[#767676]">
                    You haven't visited any Pins yet. When you explore Pins,
                    they'll appear here.
                  </p>
                </div>
              </div>
            )}

            {/* === LINK TO PINTEREST === */}
            {activeSetting === "Link to Pinterest" && (
              <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 max-w-xl">
                <p className="text-sm text-[#767676]">
                  When you claim an account, you can monitor analytics and
                  ensure your name appears on every Pin.
                </p>
                <div className="flex items-center justify-between rounded-xl border border-[#e9e9e9] p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-[#111111] text-2xl">📸</div>
                    <div>
                      <p className="text-sm font-bold">Instagram</p>
                      <p className="text-xs text-[#767676]">
                        Connect your account to auto-publish Pins.
                      </p>
                    </div>
                  </div>
                  <button className="rounded-full bg-[#e9e9e9] px-4 py-1.5 text-xs font-bold transition hover:bg-[#dcdcdc] sm:text-sm">
                    Link
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[#e9e9e9] p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-[#111111] text-2xl">🌐</div>
                    <div>
                      <p className="text-sm font-bold">Websites</p>
                      <p className="text-xs text-[#767676]">
                        Get attribution for all Pins linking to your website.
                      </p>
                    </div>
                  </div>
                  <button className="rounded-full bg-[#e9e9e9] px-4 py-1.5 text-xs font-bold transition hover:bg-[#dcdcdc] sm:text-sm">
                    Claim
                  </button>
                </div>
              </div>
            )}

            {/* === PROFILE VISIBILITY (New!) === */}
            {activeSetting === "Profile visibility" && (
              <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 max-w-xl">
                <p className="text-sm text-[#767676]">
                  Manage how your profile can be viewed on and off Pinterest.
                </p>

                <div className="flex items-center justify-between border-b border-[#e9e9e9] py-4">
                  <div>
                    <p className="text-sm font-bold">Private profile</p>
                    <p className="text-xs text-[#767676]">
                      When your profile is private, only the people you approve
                      can see your profile, Pins, and boards.
                    </p>
                  </div>
                  <button
                    onClick={() => setPrivateProfile(!privateProfile)}
                    className={`h-6 w-10 rounded-full transition-colors duration-200 ${privateProfile ? "bg-[#E60023]" : "bg-[#e9e9e9]"}`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ${privateProfile ? "translate-x-4" : "translate-x-0"}`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between border-b border-[#e9e9e9] py-4">
                  <div>
                    <p className="text-sm font-bold">Search privacy</p>
                    <p className="text-xs text-[#767676]">
                      Hide your profile and boards from search engines (e.g.
                      Google).
                    </p>
                  </div>
                  <button
                    onClick={() => setSearchPrivacy(!searchPrivacy)}
                    className={`h-6 w-10 rounded-full transition-colors duration-200 ${searchPrivacy ? "bg-[#E60023]" : "bg-[#e9e9e9]"}`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ${searchPrivacy ? "translate-x-4" : "translate-x-0"}`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* === BRANDED CONTENT (New!) === */}
            {activeSetting === "Branded Content" && (
              <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 max-w-xl">
                <p className="text-sm text-[#767676]">
                  Pinterest's Branded Content programme is a service that
                  connects creators to brands for sponsorship opportunities.
                </p>
                <div className="flex items-center justify-between border-b border-[#e9e9e9] pb-4">
                  <div>
                    <p className="text-sm font-bold">
                      Sign up for Branded Content
                    </p>
                    <p className="text-xs text-[#767676]">
                      We'll do our best to match you to brands, but signing up
                      does not guarantee brand deals.
                    </p>
                  </div>
                  <button className="rounded-full bg-[#e9e9e9] px-4 py-2 text-xs font-bold transition hover:bg-[#dcdcdc] sm:px-6 sm:py-2.5 sm:text-sm">
                    Sign up
                  </button>
                </div>
              </div>
            )}

            {/* === PRIVACY AND DATA === */}
            {activeSetting === "Privacy and data" && (
              <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4 max-w-xl">
                <p className="text-sm text-[#767676]">
                  Manage the data that Pinterest shares with advertisers.
                </p>
                <h3 className="mt-4 text-lg font-bold">Ads personalisation</h3>
                {[
                  { label: "Use info from sites you visit", key: "siteVisits" },
                  { label: "Use of partner info", key: "partnerInfo" },
                  { label: "Ads about Pinterest", key: "adsAboutPinterest" },
                  { label: "Activity for ad reporting", key: "adReporting" },
                  {
                    label: "Sharing info with partners",
                    key: "sharingPartners",
                  },
                  { label: "Ads off Pinterest", key: "adsOffPinterest" },
                ].map((item) => (
                  <div key={item.key} className="flex items-start gap-3 py-1">
                    <button
                      onClick={() =>
                        setPrivacyToggles({
                          ...privacyToggles,
                          [item.key]: !privacyToggles[item.key],
                        })
                      }
                      className={`mt-0.5 h-5 w-5 rounded-md border transition-colors ${privacyToggles[item.key] ? "bg-blue-600 border-blue-600" : "bg-white border-[#b5b5b5]"}`}
                    >
                      {privacyToggles[item.key] && (
                        <span className="flex items-center justify-center text-white text-xs">
                          ✓
                        </span>
                      )}
                    </button>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-[#767676]">
                        Allow Pinterest to use data from sites you visit to
                        improve ads.
                      </p>
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <h3 className="text-lg font-bold">GenAI</h3>
                  <div className="flex items-start gap-3 py-2">
                    <button
                      onClick={() =>
                        setPrivacyToggles({
                          ...privacyToggles,
                          genAI: !privacyToggles.genAI,
                        })
                      }
                      className={`mt-0.5 h-5 w-5 rounded-md border transition-colors ${privacyToggles.genAI ? "bg-blue-600 border-blue-600" : "bg-white border-[#b5b5b5]"}`}
                    >
                      {privacyToggles.genAI && (
                        <span className="flex items-center justify-center text-white text-xs">
                          ✓
                        </span>
                      )}
                    </button>
                    <div>
                      <p className="text-sm font-medium">
                        Use your data to train Pinterest Canvas
                      </p>
                      <p className="text-xs text-[#767676]">
                        Allow your data to be used to help train Pinterest
                        Canvas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* === SECURITY === */}
            {activeSetting === "Security" && (
              <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 max-w-xl">
                <p className="text-sm text-[#767676]">
                  Keep your account safe with two-factor authentication.
                </p>
                <h3 className="text-lg font-bold">Two-factor authentication</h3>
                <div className="flex items-center gap-3 py-1">
                  <button
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`mt-0.5 h-5 w-5 rounded-md border transition-colors ${twoFactor ? "bg-blue-600 border-blue-600" : "bg-white border-[#b5b5b5]"}`}
                  >
                    {twoFactor && (
                      <span className="flex items-center justify-center text-white text-xs">
                        ✓
                      </span>
                    )}
                  </button>
                  <p className="text-sm font-medium">Require code at login</p>
                </div>
                <h3 className="text-lg font-bold mt-4">Login options</h3>
                <div className="flex items-center gap-3 py-1">
                  <button
                    onClick={() => setGoogleLogin(!googleLogin)}
                    className={`mt-0.5 h-5 w-5 rounded-md border transition-colors ${googleLogin ? "bg-blue-600 border-blue-600" : "bg-white border-[#b5b5b5]"}`}
                  >
                    {googleLogin && (
                      <span className="flex items-center justify-center text-white text-xs">
                        ✓
                      </span>
                    )}
                  </button>
                  <p className="text-sm font-medium">
                    Use your Google account to log in
                  </p>
                </div>
              </div>
            )}

            {/* === LABS === */}
            {activeSetting === "Labs" && (
              <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 max-w-xl">
                <p className="text-sm text-[#767676]">
                  Try experimental Pinterest features before they launch.
                </p>
                <div className="flex items-center justify-between border-b border-[#e9e9e9] pb-4">
                  <div>
                    <h3 className="text-lg font-bold">Join Pinterest Labs</h3>
                    <p className="text-xs text-[#767676]">
                      Get early access to experimental features.
                    </p>
                  </div>
                  <button
                    onClick={() => setLabsEnabled(!labsEnabled)}
                    className={`h-6 w-10 rounded-full transition-colors duration-200 ${labsEnabled ? "bg-[#E60023]" : "bg-[#e9e9e9]"}`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ${labsEnabled ? "translate-x-4" : "translate-x-0"}`}
                    />
                  </button>
                </div>
                <h3 className="text-lg font-bold mt-4">
                  Available experiments
                </h3>
                <div className="rounded-xl bg-[#f0f0f0] p-4">
                  <h4 className="text-sm font-bold">AI Forward</h4>
                  <p className="text-xs text-[#767676]">
                    Experience enhanced AI-powered search conversations.
                  </p>
                  <p className="mt-1 text-xs text-green-600 font-medium">
                    Active
                  </p>
                </div>
              </div>
            )}

            {/* Catch-all for other tabs */}
            {activeSetting !== "Edit profile" &&
              activeSetting !== "Account management" &&
              activeSetting !== "Notifications" &&
              activeSetting !== "Refine your recommendations" &&
              activeSetting !== "Link to Pinterest" &&
              activeSetting !== "Profile visibility" &&
              activeSetting !== "Branded Content" &&
              activeSetting !== "Privacy and data" &&
              activeSetting !== "Security" &&
              activeSetting !== "Labs" && (
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
