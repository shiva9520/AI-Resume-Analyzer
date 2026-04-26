import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv() 
# We need an API key to initialize the client.
API_KEY = os.getenv("GEMINI_API_KEY")

def analyze_resume_text(resume_text: str) -> str:
    """
    Sends the resume text to Gemini to get a structured analysis.
    Returns a JSON string.
    """
    print(os.getenv("GEMINI_API_KEY"))
    if not API_KEY:
        raise Exception("GEMINI_API_KEY environment variable is not set. Please add it to your .env file.")

    client = genai.Client(api_key=API_KEY)
    
    prompt = f"""
You are an expert technical recruiter and resume analyzer.
Analyze the following resume and provide your assessment in JSON format.
The JSON must have the following structure exactly:
{{
  "score": <integer from 0 to 100 representing overall quality>,
  "strengths": [<array of 3-5 strings detailing strong points>],
  "weaknesses": [<array of 2-4 strings detailing areas for improvement>],
  "suggestions": [<array of 3-5 strings with actionable advice to improve the resume>]
}}

Resume text:
{resume_text}
"""

    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.2,
        ),
    )
    
    return response.text
