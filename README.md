# Resume Analyzer AI

A full-stack AI-powered application designed to evaluate and analyze resumes. The application takes a PDF resume as input, extracts its text, and leverages Google's Gemini AI to provide a comprehensive evaluation including a score, strengths, weaknesses, and actionable suggestions for improvement.

## 🚀 Features

- **PDF Upload:** Seamlessly upload resume PDF files through an intuitive drag-and-drop interface.
- **AI-Powered Analysis:** Uses Google's Gemini 2.5 Flash model to deeply analyze the resume content.
- **Detailed Feedback:** Receives a structured JSON response containing:
  - **Overall Score:** A quantitative measure (0-100) of the resume's quality.
  - **Strengths:** Highlights the strongest points of the candidate's profile.
  - **Weaknesses:** Identifies missing information or areas that need improvement.
  - **Actionable Suggestions:** Provides direct advice on how to enhance the resume.
- **Modern UI/UX:** Features a stunning, responsive, and glassmorphism-styled interface built with React and custom CSS.
- **FastAPI Backend:** A robust, asynchronous Python backend to handle file processing and API communication.

## 🛠️ Technology Stack

### Frontend
- **React 19:** Modern UI library for building component-based interfaces.
- **Vite:** Next-generation frontend tooling for fast development and build processes.
- **Vanilla CSS (Custom):** Utilizes custom CSS variables, flexbox/grid layouts, and glassmorphism effects for a premium look.
- **Lucide React:** Used for scalable, consistent iconography.

### Backend
- **FastAPI:** High-performance web framework for building APIs with Python 3.7+.
- **Uvicorn:** Lightning-fast ASGI server for running the FastAPI application.
- **PyPDF2:** Python library for extracting text from uploaded PDF documents.
- **Google GenAI SDK (`google-genai`):** Interacts with the Gemini AI models to generate structured analytical responses.
- **Pydantic:** Used for data validation and settings management.
- **Python-dotenv:** Loads environment variables securely.

## 📁 Project Structure

```
Resume Analyzer AI/
├── backend/
│   ├── main.py                # FastAPI entry point & API routes
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables (Gemini API Key)
│   └── services/
│       ├── ai_service.py      # Gemini AI integration logic
│       └── pdf_service.py     # PDF text extraction logic
└── frontend/
    ├── package.json           # Node.js dependencies & scripts
    ├── vite.config.js         # Vite configuration
    ├── index.html             # Main HTML file
    └── src/
        ├── main.jsx           # React entry point
        ├── App.jsx            # Main App component
        ├── index.css          # Global styles & design system
        └── components/        # Reusable React components (e.g., AnalysisResults)
```

## ⚙️ Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **Python** (v3.8 or higher recommended)
- A **Google Gemini API Key** (Get it from [Google AI Studio](https://aistudio.google.com/))

### 1. Backend Setup

Navigate to the backend directory, install the dependencies, and start the server:

```bash
cd backend

# (Optional but recommended) Create a virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure Environment Variables
# Create a .env file in the backend directory and add your API key:
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Run the FastAPI server
uvicorn main:app --reload
```
The backend API will be running at `http://127.0.0.1:8000`.

### 2. Frontend Setup

Open a new terminal, navigate to the frontend directory, install dependencies, and start the Vite development server:

```bash
cd frontend

# Install dependencies
npm install

# Start the frontend app
npm run dev
```
The frontend application will typically be accessible at `http://localhost:5173`.

## 🤝 How It Works
1. The user drags and drops a PDF resume onto the frontend interface.
2. The file is sent via a `POST` request to the `/api/analyze-resume` endpoint on the backend.
3. `PyPDF2` reads the PDF bytes and extracts the text content.
4. The backend constructs a structured prompt instructing the AI to act as an expert recruiter.
5. The prompt and resume text are sent to the **Gemini 2.5 Flash** model via the `google-genai` client, specifically requesting a structured JSON output.
6. The JSON response is returned to the frontend, parsed, and displayed dynamically in the interactive dashboard.

## 📄 License
This project is open-source and available for educational and personal use.
