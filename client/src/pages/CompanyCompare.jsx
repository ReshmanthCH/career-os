import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { compareCompanies } from "../services/companyService";
import ComparisonTable from "../components/companies/ComparisonTable";

function CompanyCompare() {
  const [searchParams] = useSearchParams();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const idsQuery = searchParams.get("ids");

  useEffect(() => {
    const fetchComparisonData = async () => {
      if (!idsQuery) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const idsArray = idsQuery.split(",").map((id) => id.trim());
        const res = await compareCompanies(idsArray);
        if (res.success) {
          setCompanies(res.companies || []);
        }
      } catch (err) {
        console.error("Fetch compare error:", err);
        setError("Failed to load company comparison data.");
      } finally {
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, [idsQuery]);

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
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold uppercase tracking-wider mb-2">
              <span>⚖️ Side-by-Side Comparison Engine</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Compare Companies</h1>
            <p className="text-xs text-gray-500 mt-1">
              Compare interview round structures, fresher CTC packages, DSA weightages, and core CS requirements.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-semibold text-gray-700">Loading comparison metrics...</p>
          </div>
        ) : (
          <ComparisonTable companies={companies} />
        )}
      </div>
    </DashboardLayout>
  );
}

export default CompanyCompare;
