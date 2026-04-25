import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/chatbot", label: "EaseGov AI" },
  { to: "/jobs", label: "Gov Jobs" },
  { to: "/signup", label: "Profile" },
];

function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/65 backdrop-blur-xl"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <motion.div
            className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-blue-900/40"
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ duration: 0.25 }}
          >
            E
          </motion.div>
          <div>
            <p className="text-lg font-semibold text-white">EaseGov Platform</p>
            <p className="text-xs font-medium text-slate-300">Elder-friendly AI government help</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <motion.div key={link.to} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-indigo-900/40"
                      : "border border-white/15 bg-white/5 text-slate-200 hover:border-cyan-300/40 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}

export default Navbar;
