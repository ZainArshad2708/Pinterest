import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { authApi, clearSession } from "../lib/api";

export default function Header({
  isSearchFocused,
  setIsSearchFocused,
  isUserMenuOpen,
  setIsUserMenuOpen,
  searchQuery,
  setSearchQuery,
  onOpenSettings,
  user,
  onUserUpdated,
}) {
  const navigate = useNavigate();
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);
  const displayName = user?.name || "Pinterest user";
  const email = user?.email || "";
  const initial = displayName.charAt(0).toUpperCase();

  const convertToBusiness = async () => {
    const { user: updatedUser } = await authApi.updateProfile({ accountType: "business" });
    onUserUpdated(updatedUser);
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-2 bg-white px-3 md:h-20 md:gap-3 md:px-4 sm:px-6">
      <div
        className="relative flex-1"
        onFocus={() => setIsSearchFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setIsSearchFocused(false);
        }}
      >
        <label className="flex h-9 items-center gap-2 rounded-full bg-[#e9e9e9] px-3 transition focus-within:ring-2 focus-within:ring-[#767676] md:h-12 md:gap-3 md:px-4">
          <Search
            size={16}
            className="shrink-0 text-[#767676] md:size-[20px]"
          />
          <input
            aria-label="Search Pinterest"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[13px] font-medium outline-none placeholder:text-[#767676] md:text-[15px]"
          />
        </label>

        {/* ✅ REMOVED THE EXTRA PADDING AND DIVIDER LINE CAUSING THE WHITE BAR */}
        {isSearchFocused && searchQuery === "" && (
          <div className="absolute left-0 right-0 top-[44px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 md:top-[56px]" />
        )}
      </div>

      <div className="flex shrink-0 items-center">
        <div className="relative">
          <button
            aria-label="Open profile menu"
            aria-expanded={isUserMenuOpen}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex h-8 items-center gap-0.5 rounded-full px-1 transition hover:bg-[#e9e9e9] md:h-11 md:gap-1 md:px-1.5"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#f6c94c] text-[10px] font-bold text-[#5a4600] md:h-8 md:w-8 md:text-sm">
               {initial}
            </span>
            <ChevronDown
              size={12}
              className="hidden text-[#767676] md:block md:size-[16px]"
            />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-[36px] w-56 rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 md:top-[52px] md:w-80 md:p-3">
              <p className="px-2 pb-2 text-[10px] font-semibold text-[#767676] md:text-xs">
                Currently in
              </p>
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsUserMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-xl p-1.5 text-left transition hover:bg-[#f0f0f0] md:gap-3 md:p-2"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f6c94c] text-sm font-bold text-[#5a4600] md:h-12 md:w-12 md:text-lg">
                   {initial}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold md:text-sm">
                    {displayName}
                  </span>
                  <span className="block truncate text-[10px] text-[#767676] md:text-sm">
                    {email}
                  </span>
                </span>
                <ChevronDown
                  size={14}
                  className="text-[#767676] md:size-[16px]"
                />
              </button>
              <div className="my-1.5 h-px bg-[#e9e9e9] md:my-2" />

               <button onClick={convertToBusiness} className="block w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition hover:bg-[#f0f0f0] md:px-3 md:py-2 md:text-sm">
                 {user?.accountType === "business" ? "Business account active" : "Convert to business"}
               </button>
               <button onClick={() => setIsAccountsOpen(true)} className="block w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition hover:bg-[#f0f0f0] md:px-3 md:py-2 md:text-sm">
                 Your accounts
               </button>
               <button onClick={() => navigate("/register")} className="block w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition hover:bg-[#f0f0f0] md:px-3 md:py-2 md:text-sm">
                 Add Pinterest account
               </button>

               {isAccountsOpen && (
                 <div className="my-2 rounded-xl bg-[#f7f7f7] p-3 text-xs">
                   <p className="font-bold">Active account</p>
                   <p className="mt-1 truncate text-[#767676]">{email}</p>
                   <button onClick={() => { setIsAccountsOpen(false); navigate("/profile"); }} className="mt-2 font-semibold underline">View profile</button>
                 </div>
               )}

              <div className="my-1.5 h-px bg-[#e9e9e9] md:hidden" />
              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onOpenSettings();
                }}
                className="block w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition hover:bg-[#f0f0f0] md:hidden"
              >
                Settings
              </button>

              <div className="my-1.5 h-px bg-[#e9e9e9] md:my-2" />
              <button
                onClick={() => {
                  clearSession();
                  navigate("/login");
                  setIsUserMenuOpen(false);
                }}
                className="block w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition hover:bg-[#f0f0f0] md:px-3 md:py-2 md:text-sm"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
