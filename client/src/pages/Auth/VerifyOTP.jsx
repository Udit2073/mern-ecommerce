import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      setLoading(true);

      const signupData = JSON.parse(sessionStorage.getItem("signupData"));

      if (!signupData) {
        toast.error("Signup data not found");
        return navigate("/signup");
      }

      // Verify OTP
      await api.post("/otp/verify", {
        email: signupData.email,
        otp,
      });

      // Create User after OTP verification
      const response = await api.post("/users/register", {
        name: signupData.firstName + " " + signupData.lastName,

        email: signupData.email,

        password: signupData.password,

        gender: signupData.gender.toLowerCase(),
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      sessionStorage.removeItem("signupData");

      toast.success("Account Created Successfully");

      if (signupData.gender.toLowerCase() === "male") {
        navigate("/men");
      } else {
        navigate("/women");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#efefef] px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Verify OTP</h1>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border px-4 py-3 rounded-md outline-none"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full mt-4 bg-[#008080] text-white py-3 rounded-md"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
