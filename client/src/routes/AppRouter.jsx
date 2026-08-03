import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/common/ProtectedRoute";
import PublicRoute from "../components/common/PublicRoute";

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

      {/* Protected Routes (Require Authentication) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* 404 Catch-All Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;