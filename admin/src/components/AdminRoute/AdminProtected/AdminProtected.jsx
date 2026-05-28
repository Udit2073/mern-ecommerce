import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const adminAccess = localStorage.getItem("adminAccess");

  if (adminAccess !== "true") {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

export default AdminProtected;
