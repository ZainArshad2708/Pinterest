import { useNavigate } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";

export default function Header({
  isSearchFocused,
  setIsSearchFocused,
  isUserMenuOpen,
  setIsUserMenuOpen,
  searchQuery,
  setSearchQuery,
}) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center gap-3 bg-white px-4 sm:px-6">
      <div
        className="relative flex-1"
        onFocus={() => setIsSearchFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setIsSearchFocused(false);
        }}
      >
        <label className="flex h-12 items-center gap-3 rounded-full bg-[#e9e9e9] px-4 transition focus-within:ring-2 focus-within:ring-[#767676]">
          <Search size={20} className="shrink-0 text-[#767676]" />
          <input
            aria-label="Search Pinterest"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[15px] font-medium outline-none placeholder:text-[#767676]"
          />
        </label>

        {isSearchFocused && searchQuery === "" && (
          <div className="absolute left-0 right-0 top-[60px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/5" />
        )}
      </div>

      <div className="flex shrink-0 items-center">
        <div className="relative">
          <button
            aria-label="Open profile menu"
            aria-expanded={isUserMenuOpen}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex h-11 items-center gap-1 rounded-full px-1.5 transition hover:bg-[#e9e9e9]"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f6c94c] text-sm font-bold text-[#5a4600]">
              Z
            </span>
            <ChevronDown size={16} className="hidden text-[#767676] sm:block" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-[52px] w-80 rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-black/5">
              <p className="px-2 pb-2 text-xs font-semibold text-[#767676]">
                Currently in
              </p>
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsUserMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-[#f0f0f0]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f6c94c] text-lg font-bold text-[#5a4600]">
                  Z
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">zain arshad</span>
                  <span className="block truncate text-sm text-[#767676]">
                    zainii2003@gmail.com
                  </span>
                </span>
                <ChevronDown size={18} className="text-[#767676]" />
              </button>
              <div className="my-2 h-px bg-[#e9e9e9]" />
              {[
                "Convert to business",
                "Your accounts",
                "Add Pinterest account",
                "Log out",
              ].map((item) => (
                <button
                  key={item}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition hover:bg-[#f0f0f0]"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
