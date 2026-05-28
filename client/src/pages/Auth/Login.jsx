import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../services/api";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Normal Login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/users/login", formData);

      // Save Token
      localStorage.setItem("token", response.data.token);

      // Save User Data
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Login Successful");

      // Redirect To Profile
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  // Google Login

  const handleGoogleLogin = async () => {
    try {
      // Google Popup
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      // Send Email To Backend
      const response = await api.post("/users/google-login", {
        email: googleUser.email,
      });

      // Save Token
      localStorage.setItem("token", response.data.token);

      // Save User Data
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Login Successful");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Please register first");
    }
  };

  return (
    <div className="min-h-[calc(100vh-180px)] bg-[#efefef] flex flex-col items-center justify-center px-4 py-8">
      {/* Login Card */}
      <div className="bg-white w-full max-w-105 border border-gray-300 rounded-lg shadow-sm">
        <div className="p-5 sm:p-6">

          {/* Heading */}
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Login with ShopHub
          </h2>

          {/* Tabs */}
          <div className="grid grid-cols-2 border border-gray-300 rounded-md overflow-hidden">
            <button className="bg-[#008080] text-white py-3 text-sm sm:text-base font-semibold cursor-pointer">
              LOGIN
            </button>

            <Link to="/signup">
              <button className="w-full py-3 text-sm sm:text-base font-semibold text-gray-700 hover:bg-gray-100 transition cursor-pointer">
                REGISTER
              </button>
            </Link>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">

            {/* Facebook */}
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition cursor-pointer">
              <FaFacebook className="text-blue-600 text-lg" />
              <span className="font-medium text-sm sm:text-base">Facebook</span>
            </button>

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition cursor-pointer"
            >
              <FaGoogle className="text-red-500 text-lg" />

              <span className="font-medium text-sm sm:text-base">Google</span>
            </button>
          </div>

          {/* OR */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="font-semibold text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm sm:text-base outline-none focus:border-[#008080]"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm sm:text-base outline-none focus:border-[#008080]"
              />

              {/* Eye Icon */}
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl text-gray-500"
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md text-sm sm:text-base font-semibold transition cursor-pointer"
            >
              {loading ? "Logging in..." : "PROCEED"}
            </button>
          </form>

          {/* Bottom */}
          <p className="text-center mt-6 text-sm sm:text-base text-gray-600">
            New User ?{" "}
            <Link
              to="/signup"
              className="text-red-500 hover:underline font-medium"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;