import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
