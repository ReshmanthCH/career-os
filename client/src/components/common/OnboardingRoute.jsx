import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";

function OnboardingRoute() {
  const { isAuthenticated, onboardingCompleted, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Checking onboarding status..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (onboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default OnboardingRoute;
