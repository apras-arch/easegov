import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/chatbot", label: "EaseGov AI" },
  { to: "/jobs", label: "Gov Jobs" },
  // ...removed profile navigation...
];

function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="landing-nav"
    >
      <div className="landing-nav-inner">
        <NavLink to="/" className="landing-logo">
          <span className="logo-icon">E</span>
          EaseGov
        </NavLink>

        <nav className="landing-nav-links">
          {links.map((link) => (
            <motion.div key={link.to} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `landing-nav-link ${isActive ? "active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>
        {/* Removed empty CTA button for a cleaner navbar */}
      </div>
    </motion.header>
  );
}

export default Navbar;
