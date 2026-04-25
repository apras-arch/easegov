from flask import Blueprint, jsonify, request

from services.openai_service import (
    analyze_image_with_ai,
    extract_text_from_image,
    extract_text_from_pdf,
    run_task,
)

ai_bp = Blueprint("ai_routes", __name__)
SUPPORTED_SECONDARY_LANGUAGES = {"none", "hindi", "tamil", "marathi"}


PROMPTS = {
    "ask": """
Answer the user's situation and provide an easy solution.
Use this structure:
1) Simple explanation
2) Step-by-step instructions
3) Important notes
""".strip(),
    "form_guide": """
Guide the user to fill the form correctly.
Explain each section in simple language with clear steps.
Mention supporting documents when relevant.
""".strip(),
    "predict_rejection": """
Analyze the provided form data and predict possible rejection reasons.
Start with: "Your form may be rejected because..."
Then provide prevention steps.
""".strip(),
    "suggest": """
Provide smart suggestions to improve the submission.
Include:
- Add this instead of this
- Better alternatives
- Another way to complete the process
""".strip(),
    "detect_errors": """
Detect form issues and validation problems.
Categorize:
- Missing fields
- Wrong formats
- Validation issues
Then provide fixes step-by-step.
""".strip(),
    "job_recommend": """
Recommend suitable government jobs based on user's qualifications.
Use simple language and this structure:
1) Best matching roles
2) Why each role matches
3) Skills/documents to prepare
4) Next steps to apply
Keep it practical, elderly-friendly, and avoid jargon.
""".strip(),
    "analyze": """
You are EaseGov AI. Analyze the document and explain in simple language with step-by-step instructions.
Focus on what the citizen should do next and what to verify officially.
""".strip(),
}


def _get_secondary_language(data):
    secondary_language = str(data.get("secondary_language", "none")).strip().lower() or "none"
    if secondary_language not in SUPPORTED_SECONDARY_LANGUAGES:
        raise ValueError("'secondary_language' must be one of: none, hindi, tamil, marathi.")
    return secondary_language


def _handle_json_task(field_name, task_key):
    data = request.get_json(silent=True) or {}
    value = data.get(field_name, "")
    if not isinstance(value, str) or not value.strip():
        return jsonify({"error": f"'{field_name}' is required and must be a non-empty string."}), 400

    try:
        secondary_language = _get_secondary_language(data)
        result = run_task(PROMPTS[task_key], value.strip(), secondary_language)
        return jsonify({"result": result, "response": result})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        return jsonify({"error": "Unable to process request right now.", "details": str(exc)}), 500


@ai_bp.post("/ask")
def ask():
    return _handle_json_task("query", "ask")


@ai_bp.post("/form-guide")
def form_guide():
    return _handle_json_task("form_data", "form_guide")


@ai_bp.post("/predict-rejection")
def predict_rejection():
    return _handle_json_task("form_data", "predict_rejection")


@ai_bp.post("/suggest")
def suggest():
    return _handle_json_task("form_data", "suggest")


@ai_bp.post("/detect-errors")
def detect_errors():
    return _handle_json_task("form_data", "detect_errors")


@ai_bp.post("/job-recommend")
def job_recommend():
    return _handle_json_task("qualification", "job_recommend")


@ai_bp.post("/analyze")
def analyze():
    query = (request.form.get("query") or "").strip()
    if not query:
        return jsonify({"error": "'query' is required."}), 400

    try:
        secondary_language = _get_secondary_language(request.form)
        uploaded_file = request.files.get("file")
        extracted_text = ""

        if uploaded_file and uploaded_file.filename:
            filename = uploaded_file.filename.lower()
            file_bytes = uploaded_file.read()
            if filename.endswith((".png", ".jpg", ".jpeg", ".webp")):
                mime_type = uploaded_file.mimetype or "image/png"
                try:
                    extracted_text = extract_text_from_image(file_bytes)
                except Exception:
                    # Fallback to direct multimodal analysis when OCR provider is unavailable.
                    result = analyze_image_with_ai(
                        PROMPTS["analyze"], query, file_bytes, mime_type, secondary_language
                    )
                    return jsonify(
                        {
                            "result": result,
                            "response": result,
                            "extracted_text": "",
                            "analysis_method": "ai_image_direct",
                        }
                    )
            elif filename.endswith(".pdf"):
                extracted_text = extract_text_from_pdf(file_bytes)
            else:
                return jsonify({"error": "Unsupported file type. Upload image or PDF only."}), 400

        combined_input = query
        if extracted_text:
            combined_input = f"User query:\n{query}\n\nExtracted document text:\n{extracted_text}"

        result = run_task(PROMPTS["analyze"], combined_input, secondary_language)
        return jsonify({"result": result, "response": result, "extracted_text": extracted_text})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        return jsonify({"error": "Unable to analyze file right now.", "details": str(exc)}), 500
