import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

const FileUploader = ({ onUpload }) => {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  return (
    <div className="glass-card">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <UploadCloud className="upload-icon" />
        {
          isDragActive ?
            <h3>Drop the resume here ...</h3> :
            <h3>Drag & drop your resume PDF here</h3>
        }
        <p className="file-type-hint">Only PDF files are supported at this time.</p>
      </div>
    </div>
  );
};

export default FileUploader;
