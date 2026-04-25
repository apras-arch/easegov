import AIFeaturePage from "../components/AIFeaturePage.jsx";

function SituationSolutionPage() {
  return (
    <AIFeaturePage
      title="Situation → Solution"
      subtitle="Tell us your issue and get clear, simple, and practical AI guidance."
      endpoint="/ask"
      fieldKey="query"
      buttonText="Generate Solution"
      placeholder="Example: I need to apply for pension but I do not understand eligibility requirements."
    />
  );
}

export default SituationSolutionPage;
