# list_models.py
import os
import google.generativeai as genai
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

for m in genai.list_models():
    print(m.name)
