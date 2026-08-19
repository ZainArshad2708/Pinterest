import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export default function Header({
  isSearchFocused,
  setIsSearchFocused,
  isUserMenuOpen,
  setIsUserMenuOpen,
  searchQuery,
  setSearchQuery,
  onOpenSettings,
}) {
  const navigate = useNavigate();
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);
  const [isBusinessActive, setIsBusinessActive] = useState(false);

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

        {isSearchFocused && searchQuery === "" && (
          <div className="absolute left-0 right-0 top-[44px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 md:top-[56px]" />
        )}
      </div>

      <div className="flex shrink-0 items-center">
        <div className="relative">
          <button
            aria-label="Open profile menu"
            aria-expanded={isUserMenuOpen}
            onClick={() => {
              setIsUserMenuOpen(!isUserMenuOpen);
              setIsAccountsOpen(false);
            }}
            className="flex h-8 items-center gap-0.5 rounded-full px-1 transition hover:bg-[#e9e9e9] md:h-11 md:gap-1 md:px-1.5"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#f6c94c] text-[10px] font-bold text-[#5a4600] md:h-8 md:w-8 md:text-sm">
              Z
            </span>
            <ChevronDown
              size={12}
              className="hidden text-[#767676] md:block md:size-[16px]"
            />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-[36px] w-64 rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 md:top-[52px] md:w-80 md:p-3">
              <p className="px-2 pb-2 text-[10px] font-semibold text-[#767676] md:text-xs">
                Currently in
              </p>

              {/* Account Info Row */}
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsUserMenuOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl p-2 text-left transition hover:bg-[#f0f0f0]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f6c94c] text-base font-bold text-[#5a4600] md:h-12 md:w-12 md:text-lg">
                    Z
                  </span>
                  <div>
                    <p className="text-sm font-semibold">zain</p>
                    <p className="text-xs text-[#767676]">zain123@gmail.com</p>
                  </div>
                </div>
                <span className="text-[#767676] text-xs">›</span>
              </button>

              <div className="my-1.5 h-px bg-[#e9e9e9] md:my-2" />

              {/* ✅ Business Account Toggle (Text change only) */}
              <button
                onClick={() => setIsBusinessActive(!isBusinessActive)}
                className="block w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition hover:bg-[#f0f0f0] md:px-3 md:py-2 md:text-sm"
              >
                {isBusinessActive
                  ? "Business account active"
                  : "Business account"}
              </button>

              {/* Accordion Style Your Accounts */}
              <div className="w-full my-1.5">
                <button
                  onClick={() => setIsAccountsOpen(!isAccountsOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition hover:bg-[#f0f0f0] md:px-3 md:py-2 md:text-sm"
                >
                  <span>Your accounts</span>
                  <span
                    className={`transition-transform duration-200 ${isAccountsOpen ? "rotate-90" : ""}`}
                  >
                    ›
                  </span>
                </button>

                {isAccountsOpen && (
                  <div className="mt-1 rounded-xl bg-[#f3f3f3] p-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="flex items-center justify-between rounded-lg bg-white p-2 shadow-sm my-1">
                      <div className="flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f6c94c] text-xs font-bold text-[#5a4600]">
                          Z
                        </span>
                        <div>
                          <p className="text-xs font-bold">zain</p>
                          <p className="text-[10px] text-[#767676]">
                            zain123@gmail.com
                          </p>
                        </div>
                      </div>
                      <p className="text-[10px] font-semibold text-[#111111]">
                        Active
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsUserMenuOpen(false);
                        setIsAccountsOpen(false);
                      }}
                      className="mt-1 w-full text-left px-2 py-1 text-xs font-bold text-[#111111] underline hover:text-[#767676]"
                    >
                      View profile
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  navigate("/login");
                  setIsUserMenuOpen(false);
                }}
                className="block w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition hover:bg-[#f0f0f0] md:px-3 md:py-2 md:text-sm"
              >
                Add Pinterest account
              </button>

              <div className="my-1.5 h-px bg-[#e9e9e9] md:my-2" />

              {/* Settings - Only on mobile, hidden on desktop */}
              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  setIsAccountsOpen(false);
                  if (onOpenSettings) onOpenSettings();
                  else alert("Settings page coming soon!");
                }}
                className="block w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition hover:bg-[#f0f0f0] md:hidden"
              >
                Settings
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("pinterest_user");
                  navigate("/login");
                  setIsUserMenuOpen(false);
                  setIsAccountsOpen(false);
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
