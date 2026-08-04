import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 p-8 rounded-2xl space-y-4 shadow-2xl">
            <div className="text-4xl">⚠️</div>
            <h2 className="text-xl font-bold text-red-400">Something went wrong</h2>
            <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-700 font-mono text-left overflow-x-auto">
              {this.state.error?.toString() || "Unknown error occurred"}
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow transition"
            >
              Reset Session & Go to Login
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
