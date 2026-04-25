import AIFeaturePage from "../components/AIFeaturePage.jsx";

function ErrorDetectionPage() {
  return (
    <AIFeaturePage
      title="Error Detection"
      subtitle="Detect missing fields, wrong format patterns, and validation problems quickly."
      endpoint="/detect-errors"
      fieldKey="form_data"
      buttonText="Detect Errors"
      placeholder="Paste your form values and mention expected format if known."
    />
  );
}

export default ErrorDetectionPage;
