import { Users, Menu, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DesktopNav from "./DesktopNav";
import LanguageSwitcher from "./LanguageSwitcher";
import JoinMovementModal from "./JoinMovementModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // सिर्फ Join Movement modal के लिए
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  // Admin navigation
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-lime-400/20 bg-[#03120b]/95 shadow-2xl backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4">
          {/* Logo */}
          <div className="group flex cursor-pointer items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400 text-2xl transition group-hover:rotate-12">
             🏛️
            </div>

            <div>
              <h1 className="text-sm font-bold md:text-lg">SUMIT YADAV</h1>

              <p className="text-[10px] text-slate-400">
                Bishrampur Gaunpalika 2084
              </p>
            </div>
          </div>

          {/* Desktop */}
          <DesktopNav />

          {/* Right */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* Admin */}
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="hidden md:flex items-center gap-2 rounded-xl border border-lime-400/30 bg-lime-400/10 px-4 py-3 text-sm font-bold text-lime-300 transition-all duration-300 hover:scale-105 hover:border-lime-400/60 hover:bg-lime-400 hover:text-black"
              aria-label="Open Admin Login"
            >
              <ShieldCheck size={17} />
              ADMIN
            </button>

            {/* सिर्फ onClick add किया है */}
            <button
              type="button"
              onClick={() => setJoinModalOpen(true)}
              className="hidden md:flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:scale-105"
            >
              JOIN MOVEMENT
              <Users size={16} />
            </button>

            {/* Mobile */}
            <button
              type="button"
              className="xl:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/10"
              aria-label="Open menu"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* सिर्फ modal */}
      <JoinMovementModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
      />
    </>
  );
}
