import AIFeaturePage from "../components/AIFeaturePage.jsx";

function FormGuidePage() {
  return (
    <AIFeaturePage
      title="Guided Form Filling"
      subtitle="Paste your form details and receive step-by-step help to complete it correctly."
      endpoint="/form-guide"
      fieldKey="form_data"
      buttonText="Get Form Guidance"
      placeholder="Paste applicant details, form sections, and fields you are unsure about."
    />
  );
}

export default FormGuidePage;
