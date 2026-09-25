import {
  Users,
  Menu,
  ShieldCheck,
  X,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DesktopNav from "./DesktopNav";
import LanguageSwitcher from "./LanguageSwitcher";
import JoinMovementModal from "./JoinMovementModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleAdmin = () => {
    setMobileMenuOpen(false);
    navigate("/admin");
  };

  const handleJoin = () => {
    setMobileMenuOpen(false);
    setJoinModalOpen(true);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-lime-400/20 bg-[#03120b]/95 shadow-2xl backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
          
          {/* ================= LOGO ================= */}
          <div className="group flex cursor-pointer items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-400 text-2xl transition duration-300 group-hover:rotate-12 sm:h-12 sm:w-12">
              🏛️
            </div>

            <div>
              <h1 className="text-sm font-bold sm:text-lg">
                SUMIT YADAV
              </h1>

              <p className="text-[9px] text-slate-400 sm:text-[10px]">
                Bishrampur Gaunpalika 2084
              </p>
            </div>
          </div>

          {/* ================= DESKTOP NAV ================= */}
          <DesktopNav />

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            <LanguageSwitcher />

            {/* ================= DESKTOP ADMIN ================= */}
            <button
              type="button"
              onClick={handleAdmin}
              className="hidden items-center gap-2 rounded-xl border border-lime-400/30 bg-lime-400/10 px-4 py-3 text-sm font-bold text-lime-300 transition-all duration-300 hover:scale-105 hover:border-lime-400/60 hover:bg-lime-400 hover:text-black md:flex"
              aria-label="Open Admin Login"
            >
              <ShieldCheck size={17} />
              ADMIN
            </button>

            {/* ================= DESKTOP JOIN ================= */}
            <button
              type="button"
              onClick={handleJoin}
              className="hidden items-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:scale-105 md:flex"
            >
              JOIN MOVEMENT
              <Users size={16} />
            </button>

            {/* ================= MOBILE MENU BUTTON ================= */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-lime-400/40 hover:bg-lime-400/10 xl:hidden"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ================================================= */}
      {/*                  MOBILE APP MENU                  */}
      {/* ================================================= */}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] xl:hidden">
          
          {/* Background overlay */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Mobile App Drawer */}
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-[420px] overflow-y-auto border-l border-lime-400/10 bg-[#03120b] shadow-2xl">
            
            {/* Top */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#03120b]/95 px-5 py-4 backdrop-blur-xl">
              
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 text-xl">
                  🏛️
                </div>

                <div>
                  <h2 className="text-sm font-black tracking-wide">
                    SUMIT YADAV
                  </h2>

                  <p className="text-[10px] text-slate-500">
                    Bishrampur Gaunpalika 2084
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-lime-400/40 hover:text-lime-400"
                aria-label="Close menu"
              >
                <X size={21} />
              </button>
            </div>

            {/* Menu Content */}
            <div className="px-4 py-5">
              
              {/* Section title */}
              <div className="mb-3 px-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-400/70">
                  Navigation
                </p>
              </div>

              {/* Navigation */}
              <DesktopNav
                mobile
                onNavigate={() => setMobileMenuOpen(false)}
              />

              {/* Divider */}
              <div className="my-5 h-px bg-white/10" />

              {/* Quick Actions */}
              <div className="mb-3 px-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-400/70">
                  Quick Actions
                </p>
              </div>

              {/* Admin */}
              <button
                type="button"
                onClick={handleAdmin}
                className="mb-3 flex w-full items-center justify-between rounded-2xl border border-lime-400/20 bg-lime-400/5 p-4 text-left transition-all duration-300 active:scale-[0.98] hover:border-lime-400/50 hover:bg-lime-400/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Admin Login
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Access administration
                    </p>
                  </div>
                </div>

                <ChevronRight size={18} className="text-slate-500" />
              </button>

              {/* Join */}
              <button
                type="button"
                onClick={handleJoin}
                className="flex w-full items-center justify-between rounded-2xl bg-lime-400 p-4 text-left text-black shadow-lg shadow-lime-400/10 transition-all duration-300 active:scale-[0.98] hover:bg-lime-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/10">
                    <Users size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-black">
                      JOIN MOVEMENT
                    </p>
                    <p className="mt-0.5 text-[11px] text-black/60">
                      Participate and connect
                    </p>
                  </div>
                </div>

                <ChevronRight size={18} />
              </button>

              {/* Language */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Language
                </p>

                <LanguageSwitcher />
              </div>

              {/* Footer */}
              <div className="mt-8 px-2 pb-5 text-center">
                <p className="text-[10px] text-slate-600">
                  Bishrampur Gaunpalika • 2084
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= JOIN MODAL ================= */}
      <JoinMovementModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
      />
    </>
  );
}
