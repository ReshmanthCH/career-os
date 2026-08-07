import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { submitUserFeedback } from "../services/feedbackService";

function Feedback() {
  const [category, setCategory] = useState("General Feedback");
  const [rating, setRating] = useState(5);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const categories = [
    "General Feedback",
    "Feature Request",
    "Bug Report",
    "UI / Design Improvement",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!subject.trim() || !message.trim()) {
      setError("Please fill in both the subject and detailed message.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await submitUserFeedback({
        category,
        rating,
        subject: subject.trim(),
        message: message.trim(),
      });

      if (res.success) {
        setSuccessMsg(res.message || "Thank you! Your feedback has been sent to the Devryn team.");
        setSubject("");
        setMessage("");
        setRating(5);
      }
    } catch (err) {
      console.error("Feedback submission error:", err);
      setError(err.response?.data?.message || err.message || "Failed to submit feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold uppercase tracking-wider">
            <span>💬 Developer Feedback</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Share Your Experience</h1>
          <p className="text-xs text-gray-500">
            Help us improve Devryn! Report bugs, request new features, or share your thoughts directly with our engineering team.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded-xl">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Feedback Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Platform Rating
                </label>
                <div className="flex items-center space-x-1 py-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition ${
                        star <= rating ? "text-amber-400 scale-110" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs font-bold text-gray-500 ml-2">({rating}/5 Stars)</span>
                </div>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Subject / Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Great DSA mentor suggestions, or issue with CodeChef sync"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Detailed Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your feedback, feature idea, or bug report in detail..."
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Feedback;
