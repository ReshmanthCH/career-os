import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  getCompanyById,
  addCompanyBookmark,
  removeCompanyBookmark,
} from "../services/companyService";

import CompanyHeader from "../components/companies/CompanyHeader";
import InterviewCard from "../components/companies/InterviewCard";
import TopicCard from "../components/companies/TopicCard";
import SalaryCard from "../components/companies/SalaryCard";

function CompanyDetails() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getCompanyById(id);
      if (res.success) {
        setCompany(res.company);
      }
    } catch (err) {
      console.error("Fetch details error:", err);
      setError("Failed to load company details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleToggleBookmark = async (companyId, isCurrentlyBookmarked) => {
    try {
      if (isCurrentlyBookmarked) {
        await removeCompanyBookmark(companyId);
        setSuccessMsg("Bookmark removed.");
      } else {
        await addCompanyBookmark(companyId);
        setSuccessMsg("Company bookmarked!");
      }
      setTimeout(() => setSuccessMsg(""), 3000);
      fetchDetails();
    } catch (err) {
      console.error("Bookmark toggle error:", err);
      setError("Failed to update bookmark.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link to="/companies" className="text-xs font-bold text-gray-500 hover:text-gray-900 transition">
            ← Back to All Companies
          </Link>
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

        {loading ? (
          <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-semibold text-gray-700">Loading company profile intelligence...</p>
          </div>
        ) : !company ? (
          <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center space-y-2">
            <p className="text-sm font-bold text-gray-800">Company not found.</p>
            <Link to="/companies" className="text-xs font-bold text-indigo-600">
              Return to Companies Directory
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <CompanyHeader company={company} onToggleBookmark={handleToggleBookmark} />

            <SalaryCard compensation={company.compensation} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InterviewCard interviewProcess={company.interviewProcess} />
              <TopicCard
                preparation={company.preparation}
                resumeExpectations={company.resumeExpectations}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default CompanyDetails;
