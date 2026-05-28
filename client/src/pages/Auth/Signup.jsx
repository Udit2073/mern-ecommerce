import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";

import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    phone: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (formData.phone.length !== 10) {
      return toast.error("Mobile number must be exactly 10 digits");
    }

    try {
      setLoading(true);

      await api.post("/otp/send", {
        email: formData.email,
      });

      sessionStorage.setItem("signupData", JSON.stringify(formData));

      toast.success("OTP Sent Successfully");

      navigate("/verify-otp");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#efefef] flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-105 border border-gray-300 shadow-sm rounded-md">
        <div className="p-6">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Register with ShopHub
          </h2>

          <div className="grid grid-cols-2 border border-gray-300 rounded-md overflow-hidden">
            <Link to="/login">
              <button className="w-full py-3 text-gray-700 font-semibold hover:bg-gray-100 transition">
                LOGIN
              </button>
            </Link>

            <button className="bg-[#008080] text-white py-3 font-semibold">
              REGISTER
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#008080]"
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#008080]"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email ID *"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#008080]"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password *"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#008080]"
              />

              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl"
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </div>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password *"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#008080]"
              />

              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl"
              >
                {showConfirmPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </div>
            </div>

            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#008080]"
            />

            <p className="text-sm text-gray-500">
              Avail 10% Birthday discount as a member
            </p>

            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <div className="px-4 flex items-center bg-gray-100 border-r">
                +91
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  if (value.length <= 10) {
                    setFormData({
                      ...formData,
                      phone: value,
                    });
                  }
                }}
                maxLength={10}
                required
                className="w-full px-4 py-3 outline-none"
              />
            </div>

            <div className="flex gap-5">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  required
                />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#008080] hover:bg-[#006666] text-white py-3 font-semibold rounded-md transition"
            >
              {loading ? "Sending OTP..." : "SEND OTP"}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Already a Customer?{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
