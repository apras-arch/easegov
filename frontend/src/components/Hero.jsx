function Hero({ children }) {
  return (
    <section className="hero" id="top">
      <div className="hero-content fade-in">
        <p className="hero-kicker">AI-powered citizen support</p>
        <h1>Premium Guidance for Government Services</h1>
        <p className="hero-subheading">
          Understand documents, plan next steps, and complete forms faster with clear,
          structured help.
        </p>
      </div>

      {children}
    </section>
  );
}

export default Hero;
