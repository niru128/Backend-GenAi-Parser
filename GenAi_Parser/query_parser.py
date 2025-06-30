import google.generativeai as genai
import os
import json

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash-latest")  # or gemini-1.5-pro-latest if your quota allows

def extract_visa_info(query: str):
    prompt = f"""
    Extract the following information from this free-text visa query:
    - destination_country
    - travel_purpose
    - travel_month
    - nationality

    Return the result only as valid JSON with keys:
    destination_country, travel_purpose, travel_month, nationality.

    Query: "{query}"
    """

    response = model.generate_content(prompt)
    text = response.text.strip()

    # Clean Markdown formatting if present
    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(text)
    except Exception as e:
        return {
            "error": "Failed to parse model output",
            "raw": text
        }
