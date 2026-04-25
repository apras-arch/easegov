import AIFeaturePage from "../components/AIFeaturePage.jsx";

function SuggestionsPage() {
  return (
    <AIFeaturePage
      title="Smart Suggestions"
      subtitle="Receive AI recommendations to improve your answers and submission quality."
      endpoint="/suggest"
      fieldKey="form_data"
      buttonText="Get Suggestions"
      placeholder="Share your current answers and the section where you need better alternatives."
    />
  );
}

export default SuggestionsPage;
