import { motion } from "framer-motion";

function OutputCard({ title = "AI Result", content, error, loading }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl shadow-blue-950/20 backdrop-blur-md"
      aria-live="polite"
    >
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      {loading && (
        <p className="mt-4 rounded-2xl bg-blue-500/15 p-4 text-base font-medium text-cyan-200">
          Processing your request...
        </p>
      )}
      {!loading && error && (
        <p className="mt-4 rounded-2xl bg-rose-500/15 p-4 text-base font-medium text-rose-200">{error}</p>
      )}
      {!loading && !error && content && (
        <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-slate-900/55 p-4 text-base text-slate-100">
          {content}
        </pre>
      )}
      {!loading && !error && !content && (
        <p className="mt-4 rounded-2xl bg-slate-900/40 p-4 text-base text-slate-300">
          Submit the form to view AI guidance here.
        </p>
      )}
    </motion.section>
  );
}

export default OutputCard;
