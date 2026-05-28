import { Navigate } from "react-router-dom";

import { Routes, Route } from "react-router-dom";

import AddProduct from "../pages/AddProduct";

import Products from "../pages/Products";

import EditProduct from "../pages/EditProduct";

import AdminRoute from "../components/AdminRoute/AdminRoute";

import AdminLogin from "../components/AdminRoute/AdminLogin";

const AppRoutes = () => {
  return (
    <Routes>
      {/* HOME REDIRECT */}
      <Route path="/" element={<Navigate to="/admin-login" />} />

      {/* BLOCK /ADMIN */}
      <Route path="/admin" element={<Navigate to="/admin-login" />} />

      {/* ADMIN LOGIN */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* ADD PRODUCT */}
      <Route
        path="/add-product"
        element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        }
      />

      {/* ALL PRODUCTS */}
      <Route
        path="/products"
        element={
          <AdminRoute>
            <Products />
          </AdminRoute>
        }
      />

      {/* MEN */}

      <Route
        path="/products/men/tshirts"
        element={
          <AdminRoute>
            <Products gender="men" category="tshirts" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/men/shirts"
        element={
          <AdminRoute>
            <Products gender="men" category="shirts" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/men/polos"
        element={
          <AdminRoute>
            <Products gender="men" category="polos" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/men/sneakers"
        element={
          <AdminRoute>
            <Products gender="men" category="sneakers" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/men/joggers"
        element={
          <AdminRoute>
            <Products gender="men" category="joggers" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/men/jeans"
        element={
          <AdminRoute>
            <Products gender="men" category="jeans" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/men/pants"
        element={
          <AdminRoute>
            <Products gender="men" category="pants" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/men/backpacks"
        element={
          <AdminRoute>
            <Products gender="men" category="backpacks" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/men/perfumes"
        element={
          <AdminRoute>
            <Products gender="men" category="perfumes" />
          </AdminRoute>
        }
      />

      {/* WOMEN */}

      <Route
        path="/products/women/tshirts"
        element={
          <AdminRoute>
            <Products gender="women" category="tshirts" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/women/shirts"
        element={
          <AdminRoute>
            <Products gender="women" category="shirts" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/women/tops"
        element={
          <AdminRoute>
            <Products gender="women" category="tops" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/women/pants"
        element={
          <AdminRoute>
            <Products gender="women" category="pants" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/women/joggers"
        element={
          <AdminRoute>
            <Products gender="women" category="joggers" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/women/denims"
        element={
          <AdminRoute>
            <Products gender="women" category="denims" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/women/dresses"
        element={
          <AdminRoute>
            <Products gender="women" category="dresses" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/women/sneakers"
        element={
          <AdminRoute>
            <Products gender="women" category="sneakers" />
          </AdminRoute>
        }
      />

      <Route
        path="/products/women/perfumes"
        element={
          <AdminRoute>
            <Products gender="women" category="perfumes" />
          </AdminRoute>
        }
      />

      {/* EDIT PRODUCT */}
      <Route
        path="/admin/edit/:id"
        element={
          <AdminRoute>
            <EditProduct />
          </AdminRoute>
        }
      />

      {/* UNKNOWN ROUTES */}
      <Route path="*" element={<Navigate to="/admin-login" />} />
    </Routes>
  );
};

export default AppRoutes;
