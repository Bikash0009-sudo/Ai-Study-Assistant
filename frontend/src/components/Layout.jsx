import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import {
  Bot,
  BookOpen,
  Brain,
  CalendarDays,
  ChevronRight,
  LayoutDashboard,
  Menu,
  Sparkles,
  X,
} from "lucide-react";

const links = [
  ["/", "Dashboard", LayoutDashboard],
  ["/chat", "AI Tutor", Bot],
  ["/notes", "Smart Notes", BookOpen],
  ["/quiz", "Quiz Lab", Brain],
  ["/flashcards", "Flashcards", Sparkles],
  ["/planner", "Study Planner", CalendarDays],
];

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080b14] text-[#eef2ff] font-[DM_Sans,sans-serif]">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-20 flex w-[255px] flex-col border-r border-[#232b3e] bg-[#0b0f19] px-[15px] py-[22px] transition-transform duration-200 max-[950px]:-translate-x-full ${open ? "translate-x-0" : ""}`}
      >
        {/* Brand */}
        <div className="flex items-center gap-[11px] px-[9px] pb-7 pt-[3px]">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-[0_8px_30px_#7c3aed30]">
            <Sparkles size={18} />
          </div>

          <div>
            <b className="block font-[Space_Grotesk,sans-serif] text-[17px]">StudyMate</b>
            <span className="mt-0.5 block text-[11px] text-[#707b90]">AI Study Assistant</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col">
          {links.map(
            ([to, label, Icon]) => (
              <NavLink
                key={to}
                to={to}
                onClick={() =>
                  setOpen(false)
                }
                className={({ isActive }) => `flex items-center gap-3 rounded-[11px] px-3 py-3 my-[3px] text-[#8d96a8] no-underline transition duration-200 hover:bg-[#131a28] hover:text-white ${isActive ? "bg-[linear-gradient(90deg,#1d1834,#131a28)] text-white shadow-[inset_2px_0_#8b5cf6]" : ""}`}
              >
                <Icon size={18} />

                <span>{label}</span>

                {label !== "Dashboard" && (
                  <ChevronRight
                    className="ml-auto opacity-35"
                    size={15}
                  />
                )}
              </NavLink>
            )
          )}
        </nav>

        {/* Sidebar Bottom */}
        <div className="mt-auto">
          <div className="flex items-start gap-2.5 rounded-[13px] border border-[#232b3e] bg-[#101624] p-[13px]">
            <Brain size={18} />

            <div>
              <b className="text-xs">Study smarter</b>
              <span className="mt-0.5 block text-[11px] text-[#8f99ad]">Ask, practice, remember.</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {open && (
        <button
          className="fixed inset-0 z-[15] border-0 bg-black/50 max-[950px]:block"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* Main Content */}
      <main className="ml-[255px] min-h-screen max-[950px]:ml-0">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3.5 border-b border-[#232b3e] bg-[#080b14]/85 px-[30px] backdrop-blur-[14px] max-[600px]:px-4">
          <button
            className="hidden border-0 bg-transparent text-white max-[950px]:grid max-[950px]:place-items-center"
            onClick={() =>
              setOpen(!open)
            }
          >
            {open ? <X /> : <Menu />}
          </button>

          <div className="text-xs text-[#778195]">
            AI-powered learning workspace
          </div>

          <div className="ml-auto flex items-center gap-2 text-xs text-[#9aa4b8] max-[600px]:hidden">
            <i className="h-[7px] w-[7px] rounded-full bg-[#34d399] shadow-[0_0_12px_#34d399]" />
            AI online
          </div>
        </header>

        {/* Page Content */}
        <motion.div
          className="mx-auto w-full max-w-[1200px] px-[34px] pt-[42px] pb-[70px] max-[600px]:px-4 max-[600px]:pt-7 max-[600px]:pb-14"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}