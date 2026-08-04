import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getDashboardData } from "../services/dashboardService";
import LoadingSpinner from "../components/common/LoadingSpinner";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import SummaryCard from "../components/dashboard/SummaryCard";
import SkillOverview from "../components/dashboard/SkillOverview";
import ReadinessCard from "../components/dashboard/ReadinessCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import MotivationCard from "../components/dashboard/MotivationCard";
import ProfileCompletionCard from "../components/dashboard/ProfileCompletionCard";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getDashboardData();
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner message="Assembling your personalized dashboard..." />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-6 text-center space-y-4">
          <p className="font-bold text-sm">Failed to load dashboard</p>
          <p className="text-xs text-red-600">{error}</p>
          <button
            onClick={fetchDashboard}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition"
          >
            Retry Loading
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const { user, profile, skills, readiness, profileCompletion, dailyMotivation } =
    data || {};

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Section 1: Welcome Card */}
        <WelcomeCard user={user} profile={profile} />

        {/* Section 6: Daily Motivation */}
        <MotivationCard motivation={dailyMotivation} />

        {/* Grid Layout: Career Summary & Readiness Index */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 2: Career Summary */}
          <SummaryCard profile={profile} />

          {/* Section 4: Career Readiness Index */}
          <ReadinessCard readiness={readiness} />
        </div>

        {/* Grid Layout: Skill Overview & Profile Completion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section 3: Skill Overview (2 Columns) */}
          <div className="lg:col-span-2">
            <SkillOverview skills={skills} />
          </div>

          {/* Section 7: Profile Completion (1 Column) */}
          <div className="lg:col-span-1">
            <ProfileCompletionCard profileCompletion={profileCompletion} />
          </div>
        </div>

        {/* Section 5: Quick Action Modules */}
        <QuickActionCard />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;