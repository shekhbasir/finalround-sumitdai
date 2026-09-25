import { ChevronRight } from "lucide-react";
import { menuItems } from "../../data/navbarData";
import { useLanguage } from "../../context/LanguageContext";

const navigationTargets = [
  "home",
  "about",
  "services",
  "development",
  "news",
  "media",
  "contact",
  "data",
];

export default function DesktopNav({
  mobile = false,
  onNavigate = () => {},
}) {
  const { language } = useLanguage();

  const handleNavigation = (targetId) => {
    const target = document.getElementById(targetId);

    if (!target) {
      onNavigate();
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    onNavigate();
  };

  {/* ================= MOBILE ================= */}
  if (mobile) {
    return (
      <nav className="flex flex-col gap-2">
        {menuItems[language].map((item, index) => {
          const targetId = navigationTargets[index];

          return (
            <button
              key={`${item}-${index}`}
              type="button"
              onClick={() => handleNavigation(targetId)}
              className={`group flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left transition-all duration-300 active:scale-[0.98] ${
                index === 0
                  ? "border border-lime-400/20 bg-lime-400/10 text-lime-400"
                  : "border border-transparent bg-white/[0.025] text-slate-200 hover:border-white/10 hover:bg-white/[0.06] hover:text-lime-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                    index === 0
                      ? "bg-lime-400/15 text-lime-400"
                      : "bg-white/5 text-slate-500"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-sm font-semibold">
                  {item}
                </span>
              </div>

              <ChevronRight
                size={17}
                className="text-slate-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-lime-400"
              />
            </button>
          );
        })}
      </nav>
    );
  }

  {/* ================= DESKTOP ================= */}
  return (
    <nav className="hidden items-center gap-6 xl:flex">
      {menuItems[language].map((item, index) => {
        const targetId = navigationTargets[index];

        return (
          <button
            key={`${item}-${index}`}
            type="button"
            onClick={() => handleNavigation(targetId)}
            className={`group relative text-sm transition duration-300 ${
              index === 0
                ? "text-lime-400"
                : "text-white hover:text-lime-300"
            }`}
          >
            {item}

            <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-lime-400 transition-all duration-300 group-hover:w-full" />
          </button>
        );
      })}
    </nav>
  );
}
