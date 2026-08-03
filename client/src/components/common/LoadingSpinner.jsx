import React from "react";

function LoadingSpinner({ fullScreen = true, message = "Loading..." }) {
  const content = (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      {message && <p className="text-gray-600 text-sm font-medium animate-pulse">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        {content}
      </div>
    );
  }

  return content;
}

export default LoadingSpinner;
