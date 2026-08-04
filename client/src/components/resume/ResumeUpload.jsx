import { useState, useRef } from "react";

function ResumeUpload({ onUpload, isSubmitting }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    setError("");

    if (!file) {
      setError("Please select a file.");
      return false;
    }

    const allowedExtensions = [".pdf", ".docx"];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      setError("Invalid file type. Only .pdf and .docx files are accepted.");
      return false;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError("File size exceeds 5MB limit. Please upload a smaller file.");
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }
    onUpload(selectedFile);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Upload Resume Document</h2>
        <p className="text-xs text-gray-500 mt-1">Select a PDF or DOCX file (maximum size 5MB).</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-md text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 rounded-2xl p-8 text-center cursor-pointer transition bg-indigo-50/30 hover:bg-indigo-50/60"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
          />

          <div className="w-12 h-12 bg-white text-indigo-600 rounded-full flex items-center justify-center text-2xl mx-auto shadow mb-3">
            📁
          </div>

          {selectedFile ? (
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-900">{selectedFile.name}</p>
              <p className="text-xs text-indigo-600 font-medium">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Selected
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-800">
                Click to browse or drag & drop your resume file here
              </p>
              <p className="text-xs text-gray-400">Supports PDF (.pdf) and Word (.docx)</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3">
          <button
            type="submit"
            disabled={!selectedFile || isSubmitting}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition disabled:opacity-50"
          >
            {isSubmitting ? "Uploading & Analyzing..." : "Submit & Run Analysis"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResumeUpload;
