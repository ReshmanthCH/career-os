import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  getBookmarkedCompanies,
  removeCompanyBookmark,
} from "../services/companyService";
import CompanyCard from "../components/companies/CompanyCard";

function CompanyBookmarks() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getBookmarkedCompanies();
      if (res.success) {
        setCompanies(res.companies || []);
      }
    } catch (err) {
      console.error("Fetch bookmarks error:", err);
      setError("Failed to load bookmarked companies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleToggleBookmark = async (companyId) => {
    try {
      await removeCompanyBookmark(companyId);
      setSuccessMsg("Bookmark removed.");
      setTimeout(() => setSuccessMsg(""), 3000);
      fetchBookmarks();
    } catch (err) {
      console.error("Remove bookmark error:", err);
      setError("Failed to remove bookmark.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <Link to="/companies" className="text-xs font-bold text-gray-500 hover:text-gray-900 transition">
            ← Back to Companies Directory
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase tracking-wider mb-2">
              <span>★ Bookmarked Target Companies</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Your Bookmarks</h1>
            <p className="text-xs text-gray-500 mt-1">
              Your saved target companies for quick access, hiring updates, and interview prep.
            </p>
          </div>
        </div>

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
            <p className="text-xs font-semibold text-gray-700">Loading bookmarked companies...</p>
          </div>
        ) : companies.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center space-y-3">
            <span className="text-3xl block">☆</span>
            <p className="text-sm font-bold text-gray-800">No Bookmarked Companies Yet</p>
            <p className="text-xs text-gray-400">
              Click the "☆ Bookmark" button on any company card in the directory to save it here.
            </p>
            <Link to="/companies" className="inline-block px-4 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow">
              Browse Directory →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((comp) => (
              <CompanyCard
                key={comp._id}
                company={comp}
                onToggleBookmark={handleToggleBookmark}
                isSelectedForCompare={false}
                onSelectCompare={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default CompanyBookmarks;
