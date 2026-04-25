import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function FeatureCard({
  to,
  icon: Icon,
  title,
  description,
  highlight,
  cta,
  floatingText,
  imageUrl,
  className = "",
  layout = "square",
}) {
  const rowLayout = layout === "row";
  const squareLayout = layout === "square";

  return (
    <motion.div
      animate={{ y: [0, -4, 0, 4, 0] }}
      transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.99 }}
      className={className}
    >
      <Link
        to={to}
        className={`group relative block overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition hover:border-cyan-300/60 hover:shadow-2xl hover:shadow-blue-900/40 ${
          rowLayout ? "md:p-5" : ""
        } ${squareLayout ? "h-full" : ""}`}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`${title} background`}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 transition duration-500 group-hover:scale-105 group-hover:opacity-40"
            loading="lazy"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-slate-950/80" />

        {squareLayout && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-cyan-400/10" />
        )}
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl transition group-hover:bg-cyan-300/25" />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-indigo-400/15 blur-2xl transition group-hover:bg-indigo-300/25" />

        {highlight && (
          <span className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
            {highlight}
          </span>
        )}

        {floatingText && (
          <motion.span
            className="pointer-events-none absolute right-4 top-4 rounded-full border border-fuchsia-300/40 bg-fuchsia-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-fuchsia-100"
            animate={{ y: [0, -5, 0], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {floatingText}
          </motion.span>
        )}

        <motion.div
          className={`${rowLayout ? "flex items-start gap-4 md:gap-5" : ""} ${
            squareLayout ? "relative z-10 flex h-full flex-col justify-between" : "relative z-10"
          }`}
          animate={{ y: [0, -2, 0, 2, 0] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        >
          <div
            className={`inline-flex rounded-2xl bg-gradient-to-br from-blue-500/25 to-indigo-500/25 p-3 text-cyan-200 ${
              rowLayout ? "mt-1 shrink-0" : "mb-4"
            }`}
          >
            <Icon size={rowLayout ? 26 : 28} />
          </div>

          <div className={rowLayout ? "flex-1" : ""}>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p
              className={`text-base leading-relaxed text-slate-200 ${
                rowLayout ? "mt-1.5" : "mt-2 min-h-[72px]"
              }`}
            >
              {description}
            </p>
            <p className="mt-4 text-sm font-semibold text-cyan-200">
              {cta || "Open feature"} <span aria-hidden="true">→</span>
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default FeatureCard;
