import { motion } from "framer-motion";
import {
  Briefcase,
  Bug,
  FileCheck,
  FileText,
  Lightbulb,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";

import FeatureCard from "../components/FeatureCard.jsx";

const features = [
  {
    id: "solution",
    to: "/solution",
    icon: Lightbulb,
    title: "Situation → Solution",
    description: "Share your real-life issue and receive a clear, practical, and simplified action plan.",
    highlight: "Most used",
    cta: "Get your solution",
    floatingText: "Fast help",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    className: "md:col-span-3 lg:col-span-2 lg:mt-2",
  },
  {
    id: "form-guide",
    to: "/form-guide",
    icon: FileText,
    title: "Guided Form Filling",
    description: "Fill difficult forms confidently with step-by-step instructions for every section.",
    highlight: "Step-by-step",
    cta: "Start guided filling",
    floatingText: "Guided",
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    className: "md:col-span-3 lg:col-span-2",
  },
  {
    id: "rejection",
    to: "/rejection-predictor",
    icon: ShieldAlert,
    title: "Rejection Predictor",
    description: "Detect possible rejection risks early and improve your submission before applying.",
    highlight: "Risk check",
    cta: "Check rejection risk",
    floatingText: "Safety",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    className: "md:col-span-3 lg:col-span-2 lg:-mt-3",
  },
  {
    id: "suggestions",
    to: "/suggestions",
    icon: MessageSquare,
    title: "Smart Suggestions",
    description: "Upgrade your answers with better alternatives, smarter wording, and stronger clarity.",
    highlight: "AI improvements",
    cta: "See smart suggestions",
    floatingText: "Upgrade",
    imageUrl:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80",
    className: "md:col-span-3 lg:col-span-2 lg:mt-5",
  },
  {
    id: "errors",
    to: "/error-detection",
    icon: Bug,
    title: "Error Detection",
    description: "Automatically spot missing fields, wrong formats, and validation mistakes instantly.",
    highlight: "Auto validation",
    cta: "Scan for errors",
    floatingText: "Detect",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    className: "md:col-span-3 lg:col-span-2",
  },
  {
    id: "jobs",
    to: "/jobs",
    icon: Briefcase,
    title: "Government Jobs",
    description: "Explore curated government opportunities with clear eligibility and quick apply links.",
    highlight: "Career support",
    cta: "Explore jobs",
    floatingText: "Opportunity",
    imageUrl:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    className: "md:col-span-3 lg:col-span-2 lg:mt-4",
  },
  {
    id: "ai",
    to: "/chatbot",
    icon: FileCheck,
    title: "EaseGov AI",
    description: "Chat with AI, upload images/PDFs, and get easy guidance in one powerful assistant.",
    highlight: "Advanced AI",
    cta: "Open EaseGov AI",
    floatingText: "Smart AI",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    className: "md:col-span-3 lg:col-span-2 lg:-mt-4",
  },
];

function DashboardPage() {
  return (
    <section className="space-y-6">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-10 shadow-2xl shadow-blue-950/20 backdrop-blur-md sm:p-12"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/25 blur-3xl"
          animate={{ scale: [1, 1.03, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">EaseGov Dashboard</p>
        <h1 className="mt-3 max-w-5xl bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-lime-300 bg-clip-text text-4xl font-bold leading-tight text-transparent drop-shadow-[0_0_18px_rgba(56,189,248,0.28)] sm:text-5xl lg:text-6xl">
          From confusion to approval
        </h1>
        <p className="mt-5 max-w-5xl text-lg leading-relaxed text-slate-200 sm:text-xl">
          EaseGov stands with you at every stage, helping you move from confusion to clarity. With
          supportive AI guidance, you can confidently complete forms, avoid common mistakes, and make
          steady progress toward your goals.
        </p>
        <p className="mt-3 max-w-5xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Start with any feature below and take your next step with confidence - your success is possible,
          and we are here to help you achieve it.
        </p>
      </motion.header>

      <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/5 px-4 py-3 text-center text-sm font-medium text-cyan-100 shadow-lg shadow-cyan-900/20 sm:text-base">
        Pick any card to begin - each tool is designed to make government work faster, safer, and easier.
      </div>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            {...feature}
            layout="square"
            className="aspect-square"
          />
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;
