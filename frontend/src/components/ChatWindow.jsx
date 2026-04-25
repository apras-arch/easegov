import { AnimatePresence, motion } from "framer-motion";

function ChatWindow({ messages, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="h-[56vh] overflow-y-auto rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl shadow-blue-950/20 backdrop-blur-md"
    >
      {messages.length === 0 && (
        <p className="mt-10 text-center text-lg font-medium text-slate-300">
          What do you want to do today?
        </p>
      )}

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            key={message.id}
            className={`max-w-[88%] rounded-2xl px-4 py-3 text-base ${
              message.role === "user"
                  ? "ml-auto bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-indigo-950/40"
                  : "bg-slate-900/55 text-slate-100"
            }`}
            >
              {message.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {loading && (
        <motion.p
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-100"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-300" />
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-300/70" />
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-300/50" />
          EaseGov AI is thinking...
        </motion.p>
      )}
    </motion.div>
  );
}

export default ChatWindow;
