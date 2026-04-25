import os
import base64
from io import BytesIO

import pdfplumber
from google.cloud import vision
from PIL import Image
from openai import OpenAI, OpenAIError


DEFAULT_MODEL = "openai/gpt-4o-mini"
DEFAULT_OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
LANGUAGE_LABELS = {
    "hindi": "Hindi",
    "tamil": "Tamil",
    "marathi": "Marathi",
}

BASE_INSTRUCTIONS = """
You are EaseGov, a helpful assistant that explains government processes in simple language.
Use clear headings, short paragraphs, bullets, and numbered steps when useful.
Do not invent official fees, deadlines, websites, or legal requirements.
When details may change, tell the user to verify them with the relevant official government source.
Keep responses elderly-friendly and avoid technical jargon.
""".strip()


def _get_client():
    api_key = os.getenv("OPENROUTER_API_KEY") or os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENROUTER_API_KEY is not configured. Add it to your .env file.")

    base_url = os.getenv("OPENROUTER_BASE_URL", DEFAULT_OPENROUTER_BASE_URL)
    return OpenAI(api_key=api_key, base_url=base_url)


def _build_language_instruction(secondary_language):
    language_label = LANGUAGE_LABELS.get(secondary_language)
    if not language_label:
        return ""

    return (
        f"After the main English response, add a 'Secondary Language ({language_label})' section "
        f"with the same guidance translated into {language_label}. Keep it clear and concise."
    )


def _call_openai(task_prompt, user_input, secondary_language="none"):
    client = _get_client()
    model = os.getenv("OPENROUTER_MODEL") or os.getenv("OPENAI_MODEL", DEFAULT_MODEL)

    language_instruction = _build_language_instruction(secondary_language)
    prompt_parts = [task_prompt]
    if language_instruction:
        prompt_parts.append(language_instruction)
    prompt_parts.append(f"User input:\n{user_input}")
    prompt = "\n\n".join(prompt_parts)

    try:
        response = client.responses.create(
            model=model,
            instructions=BASE_INSTRUCTIONS,
            input=prompt,
            max_output_tokens=900,
        )
    except OpenAIError as exc:
        raise RuntimeError(f"OpenAI request failed: {exc}") from exc

    output_text = getattr(response, "output_text", "").strip()
    if not output_text:
        raise RuntimeError("OpenAI returned an empty response.")

    return output_text


def run_task(task_prompt, user_input, secondary_language="none"):
    return _call_openai(task_prompt, user_input, secondary_language)


def extract_text_from_image(file_bytes):
    try:
        client = vision.ImageAnnotatorClient()
    except Exception as exc:
        raise RuntimeError(
            "Google Vision API is not configured. Set credentials to use image analysis."
        ) from exc

    try:
        image = Image.open(BytesIO(file_bytes))
        image.verify()
    except Exception as exc:
        raise RuntimeError("Uploaded image is invalid or unsupported.") from exc

    image_data = vision.Image(content=file_bytes)
    response = client.text_detection(image=image_data)
    if response.error.message:
        raise RuntimeError(f"Google Vision API error: {response.error.message}")

    return (response.full_text_annotation.text or "").strip()


def extract_text_from_pdf(file_bytes):
    text_parts = []
    with pdfplumber.open(BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text() or ""
            if extracted.strip():
                text_parts.append(extracted.strip())
    return "\n\n".join(text_parts).strip()


def analyze_image_with_ai(task_prompt, query, file_bytes, mime_type, secondary_language="none"):
    client = _get_client()
    model = os.getenv("OPENROUTER_MODEL") or os.getenv("OPENAI_MODEL", DEFAULT_MODEL)

    language_instruction = _build_language_instruction(secondary_language)
    text_prompt = f"{task_prompt}\n\nUser query:\n{query}"
    if language_instruction:
        text_prompt = f"{text_prompt}\n\n{language_instruction}"

    image_b64 = base64.b64encode(file_bytes).decode("utf-8")
    data_url = f"data:{mime_type};base64,{image_b64}"

    try:
        response = client.responses.create(
            model=model,
            instructions=BASE_INSTRUCTIONS,
            input=[
                {
                    "role": "user",
                    "content": [
                        {"type": "input_text", "text": text_prompt},
                        {"type": "input_image", "image_url": data_url},
                    ],
                }
            ],
            max_output_tokens=900,
        )
    except OpenAIError as exc:
        raise RuntimeError(f"OpenAI image analysis failed: {exc}") from exc

    output_text = getattr(response, "output_text", "").strip()
    if not output_text:
        raise RuntimeError("AI returned an empty response for image analysis.")

    return output_text
