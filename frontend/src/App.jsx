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
// import SignupPage removed
import SituationSolutionPage from "./pages/SituationSolutionPage.jsx";
import SuggestionsPage from "./pages/SuggestionsPage.jsx";

function App() {
  const location = useLocation();

  return (
    <div className="app-root">
      <div className="bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <Navbar />
      <main className="page-shell">
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
              {/* SignupPage route removed */}
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