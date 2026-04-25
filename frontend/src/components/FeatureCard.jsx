import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function FeatureCard({
  to,
  icon,
  title,
  description,
  highlight = "Feature",
  tagColor = "",
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link to={to} className={`feat-card ${className}`}>
        <span className={`feat-tag ${tagColor}`}>{highlight}</span>
        <div className="feat-thumb">
          <span className="thumb-icon">{icon}</span>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </Link>
    </motion.div>
  );
}

export default FeatureCard;
