import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Onboarding from "../pages/Onboarding";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import ResumeIntelligence from "../pages/ResumeIntelligence";
import DSAIntelligence from "../pages/DSAIntelligence";
import ConnectedPlatforms from "../pages/ConnectedPlatforms";
import DSAAIMentor from "../pages/DSAAIMentor";
import CompanyList from "../pages/CompanyList";
import CompanyDetails from "../pages/CompanyDetails";
import CompanyCompare from "../pages/CompanyCompare";
import CompanyBookmarks from "../pages/CompanyBookmarks";
import CompanyAIMentor from "../pages/CompanyAIMentor";
import AICareerCopilot from "../pages/AICareerCopilot";
import Feedback from "../pages/Feedback";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/common/ProtectedRoute";
import PublicRoute from "../components/common/PublicRoute";
import OnboardingRoute from "../components/common/OnboardingRoute";
import AdminRoute from "../components/common/AdminRoute";

function AppRouter() {
  return (
    <Routes>
      {/* Public Home Route */}
      <Route path="/" element={<Home />} />

      {/* Guest-only Routes (Redirect to /dashboard if logged in) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* Onboarding Route (Requires Auth, blocks if already completed) */}
      <Route element={<OnboardingRoute />}>
        <Route path="/onboarding" element={<Onboarding />} />
      </Route>

      {/* Protected Student Routes (Require Auth & Onboarding Completion) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/resume" element={<ResumeIntelligence />} />
        <Route path="/resume/upload" element={<ResumeIntelligence />} />
        <Route path="/resume/report" element={<ResumeIntelligence />} />
        <Route path="/dsa" element={<DSAIntelligence />} />
        <Route path="/dsa/ai" element={<DSAAIMentor />} />
        <Route path="/integrations" element={<ConnectedPlatforms />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/bookmarks" element={<CompanyBookmarks />} />
        <Route path="/companies/compare" element={<CompanyCompare />} />
        <Route path="/companies/:id" element={<CompanyDetails />} />
        <Route path="/company-ai" element={<CompanyAIMentor />} />
        <Route path="/copilot" element={<AICareerCopilot />} />
        <Route path="/feedback" element={<Feedback />} />
      </Route>

      {/* 404 Catch-All Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;