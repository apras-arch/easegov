import AIFeaturePage from "../components/AIFeaturePage.jsx";

function RejectionPredictorPage() {
  return (
    <AIFeaturePage
      title="Rejection Predictor"
      subtitle="Check your form before submission and understand probable rejection reasons."
      endpoint="/predict-rejection"
      fieldKey="form_data"
      buttonText="Predict Rejection Risk"
      placeholder="Provide your filled form details, attached proofs, and any unusual conditions."
    />
  );
}

export default RejectionPredictorPage;
