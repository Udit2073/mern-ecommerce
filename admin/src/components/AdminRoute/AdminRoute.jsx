import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  // ADMIN PASSWORD
  const adminAccess = localStorage.getItem("adminAccess");

  // NOT ADMIN
  if (adminAccess !== "true") {
    const password = prompt("Enter Admin Password");

    // CHANGE THIS PASSWORD
    if (password === "udit123") {
      localStorage.setItem("adminAccess", "true");

      return children;
    }

    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
