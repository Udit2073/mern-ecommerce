import {
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaTwitter,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#e9e9e9] pb-4 overflow-hidden">
      {/* HEADING */}
      <div className="bg-white mb-10 md:mb-12 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl text-center py-6">
          Over <span className="font-bold">6 Million</span> Happy Customers
        </h1>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-5 sm:px-10 md:px-20 lg:px-36 py-5">
        {/* NEED HELP */}
        <div>
          <h2 className="text-red-500 font-bold text-lg md:text-xl mb-4">
            NEED HELP
          </h2>
          <div className="flex flex-col gap-3 text-gray-700 text-sm md:text-base">
            <Link to="/contact" className="hover:text-black transition">
              Contact Us
            </Link>
            <Link to="/">Track Order</Link>
            <Link to="/">Returns & Refunds</Link>
            <Link to="/">FAQs</Link>
            <Link to="/">My Account</Link>
          </div>
        </div>

        {/* COMPANY */}
        <div>
          <h2 className="text-red-500 font-bold text-lg md:text-xl mb-4">
            COMPANY
          </h2>

          <div className="flex flex-col gap-3 text-gray-700 text-sm md:text-base">
            <Link to="/">About Us</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Blogs</Link>
            <Link to="/">Gift Vouchers</Link>
          </div>
        </div>

        {/* MORE INFO */}
        <div>
          <h2 className="text-red-500 font-bold text-lg md:text-xl mb-4">
            MORE INFO
          </h2>

          <div className="flex flex-col gap-3 text-gray-700 text-sm md:text-base">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms & Conditions</Link>
            <Link to="/">Sitemap</Link>
            <Link to="/">Notifications</Link>
          </div>
        </div>

        {/* STORE */}
        <div>
          <h2 className="text-red-500 font-bold text-lg md:text-xl mb-4">
            STORE NEAR ME
          </h2>

          <div className="flex flex-col gap-3 text-gray-700 text-sm md:text-base">
            <p>Mumbai</p>

            <p>Pune</p>

            <p>Bangalore</p>

            <p>Surat</p>
          </div>
        </div>
      </div>

      {/* APP BUTTONS */}
      <div className="flex flex-col items-center mt-12 px-4">
        <h2 className="text-lg md:text-xl font-bold mb-5 text-center">
          EXPERIENCE THE SHOPHUB APP
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center w-full sm:w-auto">
          {/* GOOGLE PLAY */}
          <button className="flex items-center justify-center gap-3 bg-black text-white px-5 py-3 rounded-lg w-full sm:w-auto">
            <FaGooglePlay className="text-2xl" />

            <div className="text-left">
              <p className="text-xs">GET IT ON</p>

              <h3 className="font-semibold text-sm md:text-base">
                Google Play
              </h3>
            </div>
          </button>

          {/* APPLE */}
          <button className="flex items-center justify-center gap-3 bg-black text-white px-5 py-3 rounded-lg w-full sm:w-auto">
            <FaApple className="text-2xl" />

            <div className="text-left">
              <p className="text-xs">Download on the</p>

              <h3 className="font-semibold text-sm md:text-base">App Store</h3>
            </div>
          </button>
        </div>
      </div>

      {/* SOCIAL */}
      <div className="flex justify-center gap-4 sm:gap-5 mt-10 flex-wrap px-4">
        <FaFacebookF className="text-4xl bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:scale-110 duration-300" />

        <FaInstagram className="text-4xl bg-pink-500 text-white p-2 rounded-full cursor-pointer hover:scale-110 duration-300" />

        <FaSnapchatGhost className="text-4xl bg-yellow-400 text-white p-2 rounded-full cursor-pointer hover:scale-110 duration-300" />

        <FaTwitter className="text-4xl bg-black text-white p-2 rounded-full cursor-pointer hover:scale-110 duration-300" />
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-400 mt-10 pt-5 text-center text-gray-600 text-sm md:text-base px-4">
        © 2026 ShopHub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
