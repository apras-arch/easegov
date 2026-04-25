import { motion } from "framer-motion";
import { useState } from "react";

import { postJson } from "../api.js";
import InputBox from "../components/InputBox.jsx";
import OutputCard from "../components/OutputCard.jsx";

const sampleJobs = [
  {
    title: "Village Revenue Assistant",
    eligibility: "12th pass, local language proficiency, basic computer skills.",
    link: "https://www.ncs.gov.in/",
  },
  {
    title: "Junior Clerk (State Secretariat)",
    eligibility: "Graduate degree, typing speed requirement, age as per notification.",
    link: "https://www.india.gov.in/",
  },
  {
    title: "Assistant in Public Service Board",
    eligibility: "Graduate + aptitude exam qualification + document verification.",
    link: "https://www.upsc.gov.in/",
  },
];

function JobsPage() {
  const [qualification, setQualification] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRecommend(event) {
    event.preventDefault();
    if (!qualification.trim()) {
      setError("Please enter your qualifications first.");
      setResult("");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await postJson("/job-recommend", {
        qualification: qualification.trim(),
        secondary_language: "none",
      });
      setResult(data.response || data.result || "");
    } catch (requestError) {
      setError(requestError?.response?.data?.error || requestError.message || "Unable to recommend jobs.");
      setResult("");
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
        className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-md"
      >
        <h1 className="text-3xl font-bold text-white">Government Jobs</h1>
        <p className="mt-2 text-lg text-slate-200">
          Enter your qualifications and EaseGov AI will suggest suitable government jobs.
        </p>
      </motion.header>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.form
          onSubmit={handleRecommend}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-md"
        >
          <InputBox
            value={qualification}
            onChange={setQualification}
            placeholder="Example: B.A. graduate, 2 years clerical experience, basic computer certificate, Hindi and English typing."
            isLoading={loading}
            rows={7}
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 text-lg font-semibold text-white shadow-lg shadow-indigo-900/40"
          >
            {loading ? "Finding jobs..." : "Suggest jobs for me"}
          </button>
        </motion.form>

        <OutputCard title="Recommended Jobs" content={result} error={error} loading={loading} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sampleJobs.map((job) => (
          <article key={job.title} className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
            <h2 className="text-xl font-semibold text-white">{job.title}</h2>
            <p className="mt-2 text-base text-slate-200">{job.eligibility}</p>
            <a
              href={job.link}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-xl bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-100"
            >
              Apply / Check notification
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default JobsPage;
