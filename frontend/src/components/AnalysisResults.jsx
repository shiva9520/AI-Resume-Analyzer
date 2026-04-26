import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

const AnalysisResults = ({ results, onReset }) => {
  const { score, strengths, weaknesses, suggestions } = results;

  return (
    <div className="glass-card">
      <div className="results-grid">
        <div className="score-card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Overall Score</h2>
          <div className="score-circle" style={{ '--score': score }}>
            <span className="score-value">{score}</span>
          </div>
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>out of 100</p>
          <button className="reset-btn" onClick={onReset}>Analyze Another</button>
        </div>
        
        <div>
          <div className="feedback-section">
            <h3 className="feedback-title title-strengths">
              <CheckCircle2 size={24} /> Strengths
            </h3>
            <ul className="feedback-list">
              {strengths?.map((item, idx) => (
                <motion.li key={idx} initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: idx * 0.1}}>
                  <CheckCircle2 size={18} className="icon" color="var(--success)" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="feedback-section">
            <h3 className="feedback-title title-weaknesses">
              <XCircle size={24} /> Areas for Improvement
            </h3>
            <ul className="feedback-list">
              {weaknesses?.map((item, idx) => (
                <motion.li key={idx} initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: idx * 0.1}}>
                  <XCircle size={18} className="icon" color="var(--danger)" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="feedback-section">
            <h3 className="feedback-title title-suggestions">
              <Lightbulb size={24} /> Actionable Suggestions
            </h3>
            <ul className="feedback-list">
              {suggestions?.map((item, idx) => (
                <motion.li key={idx} initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: idx * 0.1}}>
                  <Lightbulb size={18} className="icon" color="var(--warning)" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
