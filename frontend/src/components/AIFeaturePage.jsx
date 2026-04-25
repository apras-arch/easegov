import { motion } from "framer-motion";
import { useState } from "react";

import { analyzeWithFile, postJson } from "../api.js";
import FileUploader from "./FileUploader.jsx";
import InputBox from "./InputBox.jsx";
import OutputCard from "./OutputCard.jsx";

function AIFeaturePage({ title, subtitle, endpoint, fieldKey, buttonText, placeholder }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!input.trim() && !file) {
      setError("Please enter details or upload a file.");
      setResult("");
      return;
    }

    setLoading(true);
    setError("");
    try {
      let data;
      if (file) {
        const queryForAnalysis = `${title}\n\nUser input:\n${input.trim() || "Please analyze this uploaded document."}`;
        data = await analyzeWithFile({
          query: queryForAnalysis,
          file,
          secondaryLanguage: "none",
        });
      } else {
        data = await postJson(endpoint, { [fieldKey]: input.trim(), secondary_language: "none" });
      }
      setResult(data.response || data.result || "");
      setFile(null);
    } catch (requestError) {
      setError(requestError?.response?.data?.error || requestError.message || "Request failed.");
      setResult("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="landing-panel p-6"
      >
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-lg text-slate-200">{subtitle}</p>
      </motion.header>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="landing-panel p-6"
        >
          <InputBox
            value={input}
            onChange={setInput}
            placeholder={placeholder}
            isLoading={loading}
            rows={8}
          />
          <div className="mt-4">
            <FileUploader file={file} onChange={setFile} />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="landing-button mt-4 text-lg transition disabled:opacity-60"
          >
            {loading ? "Working..." : buttonText}
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <OutputCard title={`${title} Output`} content={result} error={error} loading={loading} />
        </motion.div>
      </div>
    </section>
  );
}

export default AIFeaturePage;
