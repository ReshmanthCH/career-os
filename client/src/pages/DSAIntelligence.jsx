import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  getDSAProblems,
  getDSAAnalytics,
  createDSAProblem,
  updateDSAProblem,
  deleteDSAProblem,
  reviseDSAProblem,
} from "../services/dsaService";

import DSAStatCard from "../components/dsa/DSAStatCard";
import TopicProgressCard from "../components/dsa/TopicProgressCard";
import DifficultyCard from "../components/dsa/DifficultyCard";
import RecommendationCard from "../components/dsa/RecommendationCard";
import ProblemTable from "../components/dsa/ProblemTable";
import ProblemForm from "../components/dsa/ProblemForm";
import FilterBar from "../components/dsa/FilterBar";
import EmptyState from "../components/dsa/EmptyState";
import LoadingState from "../components/dsa/LoadingState";

function DSAIntelligence() {
  const [problems, setProblems] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRevising, setIsRevising] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    topic: "All",
    difficulty: "All",
    status: "All",
    platform: "All",
    sortBy: "newest",
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [probRes, analyticsRes] = await Promise.all([
        getDSAProblems(filters),
        getDSAAnalytics(),
      ]);

      if (probRes.success) setProblems(probRes.problems || []);
      if (analyticsRes.success) {
        setAnalytics(analyticsRes.analytics);
        setRecommendations(analyticsRes.recommendations || []);
      }
    } catch (err) {
      console.error("Fetch DSA data error:", err);
      setError("Failed to fetch DSA progress data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError("");

      if (editingProblem) {
        const res = await updateDSAProblem(editingProblem._id, formData);
        if (res.success) {
          setSuccessMsg("DSA problem updated successfully!");
        }
      } else {
        const res = await createDSAProblem(formData);
        if (res.success) {
          setSuccessMsg("New DSA problem logged successfully!");
        }
      }

      setShowForm(false);
      setEditingProblem(null);
      setTimeout(() => setSuccessMsg(""), 4000);
      fetchData();
    } catch (err) {
      console.error("Save DSA problem error:", err);
      setError(err.response?.data?.message || "Failed to save DSA problem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (problem) => {
    setEditingProblem(problem);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this DSA problem record?")) return;

    try {
      setLoading(true);
      const res = await deleteDSAProblem(id);
      if (res.success) {
        setSuccessMsg("Problem record deleted.");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchData();
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete problem record.");
    } finally {
      setLoading(false);
    }
  };

  const handleRevise = async (id) => {
    try {
      setIsRevising(id);
      const res = await reviseDSAProblem(id);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchData();
      }
    } catch (err) {
      console.error("Revise error:", err);
      setError("Failed to mark problem as revised.");
    } finally {
      setIsRevising(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold uppercase tracking-wider mb-2">
              <span>⚡ Phase 6A Active • DSA Intelligence Infrastructure</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">DSA Intelligence</h1>
            <p className="text-xs text-gray-500 mt-1">
              Track Data Structures & Algorithms preparation, monitor topic mastery, and schedule problem revisions.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingProblem(null);
              setShowForm(true);
            }}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
          >
            <span>+ Log New Problem</span>
          </button>
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

        {/* Modal Form */}
        {showForm && (
          <ProblemForm
            initialData={editingProblem}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingProblem(null);
            }}
            isSubmitting={isSubmitting}
          />
        )}

        {loading ? (
          <LoadingState />
        ) : (
          <div className="space-y-6">
            {/* Stat Cards */}
            <DSAStatCard analytics={analytics} />

            {/* Recommendations & Difficulty Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecommendationCard recommendations={recommendations} />
              </div>
              <div className="lg:col-span-1">
                <DifficultyCard difficultyDistribution={analytics?.difficultyDistribution} />
              </div>
            </div>

            {/* Topic Mastery */}
            <TopicProgressCard topicWiseProgress={analytics?.topicWiseProgress} />

            {/* Filter & Search Bar */}
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />

            {/* Problem Table or Empty State */}
            {problems.length === 0 && filters.topic === "All" && filters.difficulty === "All" && !filters.search ? (
              <EmptyState onLogClick={() => setShowForm(true)} />
            ) : (
              <ProblemTable
                problems={problems}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRevise={handleRevise}
                isRevising={isRevising}
              />
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default DSAIntelligence;
