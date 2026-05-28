import { BrowserRouter } from "react-router-dom";

import { useState } from "react";

import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import AppRoutes from "./routes/AppRoutes";

function Layout() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const [menDropdown, setMenDropdown] = useState(false);

  const [womenDropdown, setWomenDropdown] = useState(false);

  const location = useLocation();

  // HIDE NAVBAR
  const hideNavbar = location.pathname === "/admin-login";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* SHOW NAVBAR ONLY AFTER LOGIN */}
      {!hideNavbar && (
        <Navbar
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
          menDropdown={menDropdown}
          setMenDropdown={setMenDropdown}
          womenDropdown={womenDropdown}
          setWomenDropdown={setWomenDropdown}
        />
      )}

      <AppRoutes />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
