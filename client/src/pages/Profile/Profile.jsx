import toast from "react-hot-toast";
import { useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

const Profile = () => {
  const navigate = useNavigate();

  const { clearCartUI } = useContext(CartContext);

  // Get User Data From LocalStorage

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Address State

  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem("user"))?.address || "",
  );

  // Account Delete
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?",
    );
    if (!confirmDelete) return;

    try {
      // Get Token
      const token = localStorage.getItem("token");

      // API Call
      const response = await api.delete("/users/delete-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Success
      toast(response.data.message);

      // Clear Storage
      clearCartUI();
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect
      navigate("/signup");
    } catch (error) {
      console.log(error);
      toast(error.response?.data?.message || "Something went wrong");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    clearCartUI();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Save Address
  const handleSave = () => {
    const updatedUser = {
      ...user,
      address,
      birthdate: user?.birthdate,
      phone: user?.phone,
      gender: user?.gender,
      email: user?.email,
      name: user?.name,
    };

    // Update State
    setUser(updatedUser);

    // Update LocalStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast("Address Saved Successfully");
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f5f5] py-4 px-0 md:px-8">
      {/* Main Container */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-6">
        {/* LEFT SIDEBAR */}

        <div className="hidden xl:block space-y-5">
          {/* User Card */}

          <div className="bg-white border p-5 sm:p-6 rounded-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 wrap-break-word">
              {user?.name || "User Name"}
            </h2>

            <p className="text-gray-500 mt-2 text-sm sm:text-base wrap-break-word">
              {user?.email || "user@gmail.com"}
            </p>

            <button className="mt-5 text-red-500 text-sm underline">
              Get Membership Now
            </button>
          </div>

          {/* Sidebar Menu */}

          <div className="bg-white border rounded-md overflow-hidden">
            {[
              "Orders",
              "Gift Vouchers",
              "TSH Points",
              "TSH Money",
              "FAQs",
              "Profile",
            ].map((item, index) => (
              <div
                key={index}
                className={`px-4 sm:px-5 py-4 border-b cursor-pointer hover:bg-gray-50 transition text-sm sm:text-base
                
                ${
                  item === "Profile"
                    ? "text-cyan-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Buttons */}

          <button
            onClick={handleDeleteAccount}
            className="w-full border border-red-500 text-red-500 py-3 sm:py-4 text-sm sm:text-base font-semibold hover:bg-red-500 hover:text-white transition rounded-md"
          >
            DELETE MY ACCOUNT
          </button>

          <button
            onClick={handleLogout}
            className="w-full border border-red-500 text-red-500 py-3 sm:py-4 text-sm sm:text-base font-semibold hover:bg-red-500 hover:text-white transition rounded-md"
          >
            LOGOUT
          </button>
        </div>

        {/* RIGHT SECTION */}

        <div className="bg-white border rounded-md overflow-hidden">
          {/* Header */}

          <div className="border-b px-4 sm:px-6 md:px-10 py-5 sm:py-6">
            <h2 className="text-center text-lg sm:text-xl font-bold text-gray-800">
              EDIT PROFILE
            </h2>
          </div>

          {/* Form Section */}

          <div className="p-4 sm:p-6 md:p-10">
            {/* Email */}

            <div className="mb-8 sm:mb-10">
              <label className="block text-gray-700 mb-3 font-medium text-sm sm:text-base">
                Email Id
              </label>

              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full md:w-100 border rounded-xl px-4 sm:px-5 py-3 sm:py-4 outline-none bg-gray-100 text-sm sm:text-base"
              />
            </div>

            {/* Form Grid */}
            <div className="space-y-6">
              {/* LEFT */}
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block mb-2 font-medium text-sm sm:text-base">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user?.name || ""}
                    readOnly
                    className="w-full border rounded-xl px-4 sm:px-5 py-3 sm:py-4 outline-none text-sm sm:text-base bg-gray-100"
                  />
                </div>

                {/* Gender */}

                <div>
                  <label className="block mb-4 font-medium text-sm sm:text-base">
                    Gender
                  </label>

                  <input
                    type="text"
                    value={user?.gender || ""}
                    readOnly
                    className="w-full border rounded-xl px-4 sm:px-5 py-3 sm:py-4 outline-none bg-gray-100 capitalize"
                  />
                </div>

                {/* DOB */}

                <div>
                  <label className="block mb-2 font-medium text-sm sm:text-base">
                    Date of Birth
                  </label>

                  <input
                    type="text"
                    value={user?.birthdate || ""}
                    readOnly
                    className="w-full border rounded-xl px-4 sm:px-5 py-3 sm:py-4 outline-none bg-gray-100"
                  />
                </div>
              </div>

              {/* RIGHT */}

              <div className="space-y-6">
                {/* Mobile */}

                <div>
                  <label className="block mb-2 font-medium text-sm sm:text-base">
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    value={user?.phone || ""}
                    readOnly
                    className="w-full border rounded-xl px-4 sm:px-5 py-3 sm:py-4 outline-none text-sm sm:text-base bg-gray-100"
                  />
                </div>

                {/* Address */}

                <div>
                  <div className="flex items-center justify-between mb-2 gap-4">
                    <label className="font-medium text-sm sm:text-base">
                      Address
                    </label>

                    <button className="text-blue-500 text-sm sm:text-base whitespace-nowrap">
                      Change/Edit
                    </button>
                  </div>

                  <textarea
                    rows="5"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Address"
                    className="w-full border rounded-xl px-4 sm:px-5 py-3 sm:py-4 outline-none resize-none text-sm sm:text-base"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Save Button */}

            <div className="flex justify-center mt-10 sm:mt-12">
              <button
                onClick={handleSave}
                className="w-60 bg-teal-700 hover:bg-teal-800 text-white py-3 rounded font-semibold transition"
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
