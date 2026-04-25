import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { analyzeWithFile } from "../api.js";
import ChatWindow from "../components/ChatWindow.jsx";
import FileUploader from "../components/FileUploader.jsx";

function buildKeyword(text) {
  return text
    .trim()
    .split(/\s+/)
    .slice(0, 6)
    .join(" ")
    .replace(/[^\w\s]/g, "")
    .trim();
}

function ChatbotPage() {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeKeyword, setActiveKeyword] = useState("");

  const filteredMessages = useMemo(() => {
    if (!activeKeyword) {
      return messages;
    }
    return history.find((item) => item.keyword === activeKeyword)?.messages || [];
  }, [activeKeyword, history, messages]);

  async function handleSend(event) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery && !file) {
      return;
    }

    const userMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: file ? `${trimmedQuery || "Analyze this file"}\n[File: ${file.name}]` : trimmedQuery,
    };
    const workingMessages = [...messages, userMessage];
    setMessages(workingMessages);
    setQuery("");
    setLoading(true);

    try {
      const data = await analyzeWithFile({ query: trimmedQuery || "Analyze this document.", file });
      const botMessage = { id: `a-${Date.now()}`, role: "assistant", text: data.result || "No response." };
      const nextMessages = [...workingMessages, botMessage];
      setMessages(nextMessages);

      const keyword = buildKeyword(trimmedQuery || file?.name || "file chat");
      setHistory((prev) => [{ keyword, messages: nextMessages }, ...prev.slice(0, 29)]);
      setActiveKeyword("");
      setFile(null);
    } catch (requestError) {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          text: requestError?.response?.data?.error || requestError.message || "Request failed.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="landing-panel p-6"
      >
        <h1 className="text-3xl font-bold text-white">EaseGov AI</h1>
        <p className="mt-2 text-lg text-slate-200">
          Ask in text, upload an image or PDF, and get elderly-friendly step-by-step guidance.
        </p>
      </motion.header>

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <motion.aside
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="landing-panel space-y-3 p-4"
        >
          <h2 className="text-lg font-semibold text-white">Saved keywords</h2>
          <button
            type="button"
            onClick={() => setActiveKeyword("")}
            className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold ${
              !activeKeyword
                ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white"
                : "border border-white/15 bg-white/5 text-slate-200"
            }`}
          >
            Current chat
          </button>
          {history.map((item) => (
            <button
              key={`${item.keyword}-${item.messages.length}`}
              type="button"
              onClick={() => setActiveKeyword(item.keyword)}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold ${
                activeKeyword === item.keyword
                  ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white"
                  : "border border-white/15 bg-white/5 text-slate-200"
              }`}
            >
              {item.keyword}
            </button>
          ))}
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="space-y-4"
        >
          <ChatWindow messages={filteredMessages} loading={loading} />
          <form onSubmit={handleSend} className="landing-panel p-4">
            <div className="space-y-4">
              <textarea
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ask anything about government services..."
                rows={3}
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-300"
              />
              <FileUploader file={file} onChange={setFile} />
              <button
                type="submit"
                disabled={loading}
                className="landing-button text-lg"
              >
                {loading ? "Analyzing..." : "Send to AI"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default ChatbotPage;
