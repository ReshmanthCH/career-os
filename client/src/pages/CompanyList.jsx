import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  getCompanies,
  addCompanyBookmark,
  removeCompanyBookmark,
} from "../services/companyService";

import CompanyCard from "../components/companies/CompanyCard";
import FilterPanel from "../components/companies/FilterPanel";

function CompanyList() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompareIds, setSelectedCompareIds] = useState([]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const initialFilters = {
    search: "",
    category: "All",
    industry: "All",
    hiringStatus: "All",
    difficultyLevel: "All",
    internshipAvailable: "All",
    fullTimeAvailable: "All",
    sortBy: "name",
  };

  const [filters, setFilters] = useState(initialFilters);

  const fetchCompaniesData = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getCompanies(filters);
      if (res.success) {
        setCompanies(res.companies || []);
      }
    } catch (err) {
      console.error("Fetch companies error:", err);
      setError("Unable to load target companies. Please verify your backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompaniesData();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

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
      fetchCompaniesData();
    } catch (err) {
      console.error("Bookmark toggle error:", err);
      setError("Failed to update bookmark.");
    }
  };

  const handleSelectCompare = (companyId) => {
    setSelectedCompareIds((prev) => {
      if (prev.includes(companyId)) {
        return prev.filter((id) => id !== companyId);
      } else {
        if (prev.length >= 4) {
          alert("You can compare up to 4 companies simultaneously.");
          return prev;
        }
        return [...prev, companyId];
      }
    });
  };

  const handleCompareClick = () => {
    if (selectedCompareIds.length < 2) {
      alert("Please select at least 2 companies to compare.");
      return;
    }
    navigate(`/companies/compare?ids=${selectedCompareIds.join(",")}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold uppercase tracking-wider mb-2">
              <span>🏢 Phase 7A Active • Target Company Database ({companies.length} Loaded)</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Company Intelligence</h1>
            <p className="text-xs text-gray-500 mt-1">
              Explore 50+ top Product, FinTech, Banking, IT Service, Startup & Automotive companies with verified interview benchmarks.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to="/companies/bookmarks"
              className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs rounded-xl border border-amber-200 transition"
            >
              ★ Bookmarked Companies
            </Link>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded-xl flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchCompaniesData} className="underline font-bold">Retry</button>
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl">
            {successMsg}
          </div>
        )}

        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          totalCount={companies.length}
          selectedCountForCompare={selectedCompareIds.length}
          onCompareClick={handleCompareClick}
        />

        {/* Company Cards Grid */}
        {loading ? (
          <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-semibold text-gray-700">Loading company profiles & hiring benchmarks...</p>
          </div>
        ) : companies.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center space-y-3">
            <span className="text-3xl block">🔍</span>
            <p className="text-sm font-bold text-gray-800">No matching target companies found.</p>
            <p className="text-xs text-gray-400">Try adjusting your search criteria or resetting filters.</p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-xl border border-indigo-200 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((comp) => (
              <CompanyCard
                key={comp._id}
                company={comp}
                onToggleBookmark={handleToggleBookmark}
                isSelectedForCompare={selectedCompareIds.includes(comp._id)}
                onSelectCompare={handleSelectCompare}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default CompanyList;
