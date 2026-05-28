import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/Product/ProductDetails";
import CategoryPage from "./pages/Category/CategoryPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Signup";
import BrandBanner from "./components/BrandBanner/BrandBanner";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import RouteWrapper from "./components/RouteWrapper/RouteWrapper";

import maleRoutes from "./routes/maleRoutes";
import MaleHome from "./pages/Male/MaleHome";

import femaleRoutes from "./routes/femaleRoutes";
import FemaleHome from "./pages/Female/FemaleHome";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import Wishlist from "./pages/Wishlist/Wishlist";

import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";

import NotFound from "./pages/Not Found/NotFound";

import VerifyOTP from "./pages/Auth/VerifyOTP";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";

import Contact from "./components/Footer/ContactUS/Contact";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Scroll to Top */}
      <ScrollToTop />

      <Routes>
        <Route element={<RouteWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<MaleHome />} />
          <Route path="/women" element={<FemaleHome />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          <Route
            path="/:gender/product/:category/:name"
            element={<ProductDetails />}
          />

          <Route path="/category/:categoryName" element={<CategoryPage />} />

          {maleRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {femaleRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <BrandBanner />
      <Footer />
    </BrowserRouter>
  );
}

export default App;