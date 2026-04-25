import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
});

export async function postJson(endpoint, payload) {
  const response = await client.post(endpoint, payload);
  return response.data;
}

export async function analyzeWithFile({ query, file, secondaryLanguage = "none" }) {
  const formData = new FormData();
  formData.append("query", query);
  formData.append("secondary_language", secondaryLanguage);
  if (file) {
    formData.append("file", file);
  }

  const response = await client.post("/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export { API_BASE_URL };
