import json
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.pdf_service import extract_text_from_pdf
from services.ai_service import analyze_resume_text

app = FastAPI(title="Resume Analyzer AI")

# Allow CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
@app.get("/api")
def read_root():
    return {"message": "Resume Analyzer AI Backend API is running."}

@app.post("/api/analyze-resume")
@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    try:
        # Read file contents
        contents = await file.read()
        
        # Extract text
        text = extract_text_from_pdf(contents)
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from the PDF. It might be an image or protected.")
            
        # Get AI analysis
        analysis_json_str = analyze_resume_text(text)
        
        # Parse the JSON string from Gemini back into a dict to return directly
        analysis_dict = json.loads(analysis_json_str)
        
        return analysis_dict
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
