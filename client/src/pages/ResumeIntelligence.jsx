import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  getResume,
  uploadResume,
  deleteResume,
  runAIAnalysis,
} from "../services/resumeService";

import EmptyState from "../components/resume/EmptyState";
import LoadingAnalysis from "../components/resume/LoadingAnalysis";
import ResumeUpload from "../components/resume/ResumeUpload";
import ResumeCard from "../components/resume/ResumeCard";
import ResumeAIScore from "../components/resume/ResumeAIScore";
import ATSCard from "../components/resume/ATSCard";
import StrengthCard from "../components/resume/StrengthCard";
import WeaknessCard from "../components/resume/WeaknessCard";
import ImprovementCard from "../components/resume/ImprovementCard";
import CompanyRecommendationCard from "../components/resume/CompanyRecommendationCard";
import ImprovedSummaryCard from "../components/resume/ImprovedSummaryCard";
import ImprovedProjectCard from "../components/resume/ImprovedProjectCard";
import SectionAnalysis from "../components/resume/SectionAnalysis";

function ResumeIntelligence() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchResume = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getResume();
      if (res.success) {
        setResume(res.resume || null);
      }
    } catch (err) {
      console.error("Fetch resume error:", err);
      setError("Failed to fetch resume details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleFileUpload = async (file) => {
    try {
      setIsSubmitting(true);
      setError("");
      setSuccessMsg("");

      const formData = new FormData();
      formData.append("resume", file);

      const res = await uploadResume(formData);
      if (res.success) {
        setResume(res.resume);
        setShowUploadModal(false);
        setSuccessMsg("Resume uploaded & analyzed successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to upload resume."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!resume?._id) return;

    if (!window.confirm("Are you sure you want to delete your uploaded resume?")) {
      return;
    }

    try {
      setLoading(true);
      const res = await deleteResume(resume._id);
      if (res.success) {
        setResume(null);
        setSuccessMsg("Resume deleted successfully.");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.response?.data?.message || "Failed to delete resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleReAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      setError("");
      const res = await runAIAnalysis();
      if (res.success) {
        setResume(res.resume);
        setSuccessMsg("AI analysis refreshed successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      console.error("Re-analyze error:", err);
      setError("Failed to re-analyze resume.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl">
        {/* Page Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider mb-2 shadow-sm">
              <span>✨ Phase 5B Active • AI Resume Intelligence</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Resume AI Intelligence</h1>
            <p className="text-xs text-gray-500 mt-1">
              Upload, analyze, and optimize your technical resume using Gemini AI ATS analysis and company-specific benchmarks.
            </p>
          </div>

          {resume && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition"
            >
              Upload New Resume
            </button>
          )}
        </div>

        {/* Notifications */}
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

        {/* Upload Form View */}
        {showUploadModal && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-xs text-gray-500 hover:text-gray-900 font-semibold"
              >
                ✕ Cancel & Back to Dashboard
              </button>
            </div>
            <ResumeUpload onUpload={handleFileUpload} isSubmitting={isSubmitting} />
          </div>
        )}

        {/* Main Content View */}
        {!showUploadModal && (
          <>
            {loading ? (
              <LoadingAnalysis message="Retrieving your AI Resume Intelligence report..." />
            ) : !resume ? (
              <EmptyState onUploadClick={() => setShowUploadModal(true)} />
            ) : (
              <div className="space-y-6">
                {/* Active Resume Card */}
                <ResumeCard
                  resume={resume}
                  onDelete={handleDelete}
                  onReplaceClick={() => setShowUploadModal(true)}
                  onReAnalyze={handleReAnalyze}
                  isAnalyzing={isAnalyzing}
                />

                {/* Recruiter Impression Banner */}
                <ATSCard
                  recruiterImpression={resume.recruiterImpression}
                  atsScore={resume.atsScore || resume.score}
                />

                {/* Score & Strengths / Weaknesses */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Score Card */}
                  <div className="lg:col-span-1">
                    <ResumeAIScore
                      overallScore={resume.overallScore || resume.score}
                      atsScore={resume.atsScore || resume.score}
                      version={resume.analysisVersion}
                    />
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="lg:col-span-2 space-y-6">
                    <StrengthCard strengths={resume.strengths} />
                    <WeaknessCard
                      weaknesses={resume.weaknesses}
                      missingSections={resume.missingSections}
                    />
                  </div>
                </div>

                {/* Improved Summary */}
                <ImprovedSummaryCard improvedSummary={resume.improvedSummary} />

                {/* Project Improvements & Smart Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ImprovedProjectCard improvedProjects={resume.improvedProjects} />
                  <ImprovementCard
                    projectSuggestions={resume.projectSuggestions}
                    skillSuggestions={resume.skillSuggestions}
                    grammarSuggestions={resume.grammarSuggestions}
                  />
                </div>

                {/* Company Recommendations */}
                <CompanyRecommendationCard
                  companyRecommendations={resume.companyRecommendations}
                />

                {/* Section Audit */}
                <SectionAnalysis
                  sectionAnalysis={resume.sectionAnalysis}
                  formattingChecks={resume.formattingChecks}
                />
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ResumeIntelligence;
