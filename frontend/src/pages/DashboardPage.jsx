import FeatureCard from "../components/FeatureCard.jsx";

const features = [
  {
    id: "solution",
    to: "/solution",
    icon: "💡",
    title: "Situation → Solution",
    description: "Share your real-life issue and receive a clear, practical, and simplified action plan.",
    highlight: "Most Used · Fast Help",
  },
  {
    id: "form-guide",
    to: "/form-guide",
    icon: "📋",
    title: "Guided Form Filling",
    description: "Fill difficult forms confidently with step-by-step instructions for every section.",
    highlight: "Step-by-Step · Guided",
    tagColor: "teal",
  },
  {
    id: "rejection",
    to: "/rejection-predictor",
    icon: "🛡️",
    title: "Rejection Predictor",
    description: "Detect possible rejection risks early and improve your submission before applying.",
    highlight: "Risk Check · Safety",
    tagColor: "orange",
  },
  {
    id: "suggestions",
    to: "/suggestions",
    icon: "✨",
    title: "Smart Suggestions",
    description: "Upgrade your answers with better alternatives, smarter wording, and stronger clarity.",
    highlight: "AI Improvements · Upgrade",
  },
  {
    id: "errors",
    to: "/error-detection",
    icon: "🔍",
    title: "Error Detection",
    description: "Automatically spot missing fields, wrong formats, and validation mistakes instantly.",
    highlight: "Auto Validation · Detect",
    tagColor: "green",
  },
  {
    id: "jobs",
    to: "/jobs",
    icon: "💼",
    title: "Government Jobs",
    description: "Explore curated government opportunities with clear eligibility and quick apply links.",
    highlight: "Career Support · Opportunity",
    tagColor: "teal",
  },
  {
    id: "ai",
    to: "/chatbot",
    icon: "🤖",
    title: "EaseGov AI",
    description: "Chat with AI, upload images/PDFs, and get easy guidance in one powerful assistant.",
    highlight: "Advanced AI · Smart AI",
  },
];

function DashboardPage() {
  return (
    <>
      <section className="hero">
        <h1>
          Simplify Government
          <br />
          Processes <span className="gradient-text">with AI</span>
        </h1>
        <p>
          Navigate complex bureaucracy effortlessly. EaseGov uses AI to guide you through government
          services, forms, and applications — making everything simple, clear, and accessible for everyone.
        </p>
        <div className="hero-preview">
          <div className="preview-card">
            <div className="preview-bar">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
              <span className="preview-title">EASEGOV PLATFORM · localhost:5173</span>
            </div>
            <div className="preview-pills">
              <span className="pill active">Dashboard</span>
              <span className="pill">EaseGov AI</span>
              <span className="pill">Gov Jobs</span>
              <span className="pill">Guided Form Filling</span>
              <span className="pill">Rejection Predictor</span>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="section-header">
          <span className="section-label">Powerful Features</span>
          <h2 className="section-title">
            Everything you need to navigate
            <br />
            government processes with confidence
          </h2>
          <p className="section-sub">
            Pick any tool and get started — each one is designed to make government work faster, safer, and
            easier.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </section>

      <section className="dashboard-section" id="dashboard">
        <div className="dashboard-inner">
          <div className="dashboard-text">
            <span className="section-label">Dashboard</span>
            <h2 className="section-title">
              From confusion
              <br />
              to <span className="dashboard-gradient">approval</span>
            </h2>
            <p className="section-sub">
              EaseGov stands with you at every stage, helping you move from confusion to clarity. With
              supportive AI guidance, you can confidently complete forms and avoid common mistakes.
            </p>
            {/* Button AFTER text, with margin-top via inline style */}
            <a
              className="btn-primary open-dashboard-btn"
              href="/chatbot"
              style={{ marginTop: "28px", display: "inline-block" }}
            >
              Open Chatbot →
            </a>
          </div>
          <div className="dashboard-visual">
            <div className="dv-header">
              <div className="dot dot-r" />
              <div className="dot dot-y" />
              <div className="dot dot-g" />
              <span className="dv-title">EASEGOV DASHBOARD</span>
            </div>
            <div className="dv-body">
              <div className="dv-hero-text">
                From confusion
                <br />
                to <span className="g">approval</span>
              </div>
              <div className="dv-desc">
                Start with any feature and take your next step with confidence — your success is possible,
                and we are here to help you achieve it.
              </div>
              <div className="dv-mini-cards">
                <div className="dv-mini">
                  <div className="dv-mini-icon">💡</div>
                  <div className="dv-mini-label">Situation → Solution</div>
                  <div className="dv-mini-desc">Get a clear action plan fast</div>
                </div>
                <div className="dv-mini">
                  <div className="dv-mini-icon">📋</div>
                  <div className="dv-mini-label">Form Filling</div>
                  <div className="dv-mini-desc">Step-by-step guided help</div>
                </div>
                <div className="dv-mini">
                  <div className="dv-mini-icon">🛡️</div>
                  <div className="dv-mini-label">Rejection Predictor</div>
                  <div className="dv-mini-desc">Catch errors before submitting</div>
                </div>
                <div className="dv-mini">
                  <div className="dv-mini-icon">🤖</div>
                  <div className="dv-mini-label">EaseGov AI</div>
                  <div className="dv-mini-desc">Chat + PDF upload support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how">
        <div className="section-header">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">Three simple steps</h2>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <div className="step-content">
              <h4>Describe your situation</h4>
              <p>Tell EaseGov what government task you are trying to complete in simple language.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div className="step-content">
              <h4>AI guides you step-by-step</h4>
              <p>Our AI analyzes your situation and gives personalized guidance with better clarity.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div className="step-content">
              <h4>Submit with confidence</h4>
              <p>Error-check your application before sending and continue getting ongoing support.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DashboardPage;