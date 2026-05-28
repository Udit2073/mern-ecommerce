import { useState } from "react";

import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    // CHANGE PASSWORD HERE
    if (password === "udit123") {
      localStorage.setItem("adminAccess", "true");

      navigate("/add-product");
    } else {
      setError("Wrong Password");
    }
  };

 return (
   <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 py-6">
     {/* CARD */}
     <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-5 sm:p-8">
       {/* TITLE */}
       <div className="text-center">
         <h1 className="text-2xl sm:text-3xl font-bold">Admin Login</h1>

         <p className="text-gray-500 mt-2 text-sm sm:text-base">
           Only authorized admin can access
         </p>
       </div>

       {/* FORM */}
       <form onSubmit={handleLogin} className="mt-6 sm:mt-8">
         {/* PASSWORD */}
         <div>
           <label className="text-sm font-medium">Admin Password</label>

           <input
             type="password"
             placeholder="Enter password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             className="w-full border rounded-xl px-4 py-3 mt-2 text-sm sm:text-base outline-none focus:border-black"
           />
         </div>

         {/* ERROR */}
         {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

         {/* BUTTON */}
         <button
           type="submit"
           className="w-full bg-black text-white py-3 rounded-xl mt-6 font-medium hover:bg-gray-800 transition"
         >
           LOGIN
         </button>
       </form>
     </div>
   </div>
 );
};

export default AdminLogin;
