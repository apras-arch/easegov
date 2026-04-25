import { AnimatePresence, motion } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ChatbotPage from "./pages/ChatbotPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ErrorDetectionPage from "./pages/ErrorDetectionPage.jsx";
import FormGuidePage from "./pages/FormGuidePage.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import RejectionPredictorPage from "./pages/RejectionPredictorPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import SituationSolutionPage from "./pages/SituationSolutionPage.jsx";
import SuggestionsPage from "./pages/SuggestionsPage.jsx";

function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-16 h-[26rem] w-[26rem] rounded-full bg-blue-600/30 blur-[110px]"
        animate={{ scale: [1, 1.03, 1], opacity: [0.9, 1, 0.9], x: [0, 20, 0], y: [0, -16, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-10 h-[30rem] w-[30rem] rounded-full bg-indigo-500/30 blur-[120px]"
        animate={{ scale: [1, 1.03, 1], opacity: [0.88, 1, 0.88], x: [0, -25, 0], y: [0, 18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-cyan-400/20 blur-[90px]"
        animate={{ scale: [1, 1.03, 1], opacity: [0.85, 1, 0.85], x: [0, 18, 0], y: [0, -18, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Navbar />
      <main className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Routes location={location}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/solution" element={<SituationSolutionPage />} />
              <Route path="/form-guide" element={<FormGuidePage />} />
              <Route path="/rejection-predictor" element={<RejectionPredictorPage />} />
              <Route path="/suggestions" element={<SuggestionsPage />} />
              <Route path="/error-detection" element={<ErrorDetectionPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
