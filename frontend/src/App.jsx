import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FileUploader from './components/FileUploader';
import AnalysisResults from './components/AnalysisResults';
import { FileText, AlertCircle } from 'lucide-react';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = async (uploadedFile) => {
    setFile(uploadedFile);
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const API_URL = import.meta.env.DEV ? 'http://127.0.0.1:8000/api/analyze-resume' : '/api/analyze-resume';
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to analyze resume');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <header>
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1>Resume Analyzer AI</h1>
          <p className="subtitle">
            Upload your resume and get instant, AI-driven feedback to help you land your dream job.
          </p>
        </motion.div>
      </header>

      <main>
        <AnimatePresence mode="wait">
          {!file && !loading && !results && !error && (
            <motion.div
              key="uploader"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <FileUploader onUpload={handleFileUpload} />
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              key="error-page"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-card loading-container"
              style={{ borderColor: 'var(--warning)', background: 'rgba(245, 158, 11, 0.05)' }}
            >
              <AlertCircle size={64} color="var(--warning)" />
              <h2 style={{ color: 'var(--warning)' }}>Please Try Again</h2>
              <p className="subtitle" style={{ fontSize: '1rem', textAlign: 'center' }}>
                {error}
              </p>
              <button className="reset-btn" onClick={handleReset} style={{ width: 'auto', marginTop: '1rem' }}>
                Go Back
              </button>
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card loading-container"
            >
              <div className="spinner"></div>
              <h2>Analyzing your resume...</h2>
              <p className="subtitle" style={{ fontSize: '0.9rem' }}>
                Our AI is extracting text and evaluating your strengths, weaknesses, and overall impact.
              </p>
            </motion.div>
          )}

          {results && !loading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AnalysisResults results={results} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
