import API from "../../services/api.js";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineMenuAlt3,
  HiOutlineSearch,
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineX,
} from "react-icons/hi";
import CartContext from "../../context/CartContext";
import WishlistContext from "../../context/WishlistContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  const { wishlistItems } = useContext(WishlistContext);

  const { cartItems } = useContext(CartContext);

  // CART COUNT
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  

  // NAV LINKS
  const navLinks = [
    {
      name: "MEN",
      path: "/men",
    },

    {
      name: "WOMEN",
      path: "/women",
    },
  ];

  // SEARCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      // EMPTY SEARCH
      if (!search.trim()) {
        setSearchResults([]);

        return;
      }

      try {
        const response = await API.get("/products");

        // FILTER
        const filtered = response.data.filter((item) => {
          // SEARCH WORDS
          const searchWords = search.toLowerCase().split(" ");

          // PRODUCT DATA
          const productData = `
      ${item.name}
      ${item.category}
      ${item.gender}
    `.toLowerCase();

          // MATCH ALL WORDS
          return searchWords.every((word) => productData.includes(word));
        });

        setSearchResults(filtered);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [search]);

  return (
    <nav className="w-full bg-[#f5f5f5] border-b border-gray-200 sticky top-0 z-50">
      {/* MAIN CONTAINER */}
      <div className="max-w-362,5 mx-auto px-4 sm:px-6 lg:px-10">
        {/* NAVBAR */}
        <div className="flex items-center justify-between h-17.5 md:h-21.25">
          {/* LEFT */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* MOBILE MENU */}
            <button
              className="text-3xl md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <HiOutlineMenuAlt3 />
            </button>

            {/* DESKTOP NAV */}
            <ul className="hidden md:flex items-center gap-6 lg:gap-10">
              {navLinks.map((item, index) => (
                <li
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`relative cursor-pointer text-[15px] lg:text-[17px] font-bold tracking-wide transition duration-300 group
                    ${
                      (item.name === "MEN" &&
                        (location.pathname.startsWith("/men") ||
                          location.pathname === "/cart")) ||
                      (item.name === "WOMEN" &&
                        location.pathname.startsWith("/women")) ||
                      (item.name === "SNEAKERS" &&
                        location.pathname.startsWith("/sneakers"))
                        ? "text-black"
                        : "text-gray-700 hover:text-black"
                    }`}
                >
                  {item.name}

                  {/* UNDERLINE */}
                  <span
                    className={`absolute left-0 -bottom-2 h-0.5 bg-red-500 transition-all duration-300

                      ${
                        (item.name === "MEN" &&
                          (location.pathname.startsWith("/men") ||
                            location.pathname === "/cart")) ||
                        (item.name === "WOMEN" &&
                          location.pathname.startsWith("/women"))
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                  ></span>
                </li>
              ))}
            </ul>
          </div>

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer shrink-0"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-red-500">
              Shop
              <span className="text-black">Hub</span>
            </h1>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            {/* DESKTOP SEARCH */}
            <div className="hidden xl:block relative">
              <div className="flex items-center border border-gray-400 rounded-full px-5 py-2 bg-white w-[320px]">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full outline-none bg-transparent text-sm"
                />

                <HiOutlineSearch className="text-2xl cursor-pointer" />
              </div>

              {/* SEARCH RESULTS */}
              {searchResults.length > 0 && (
                <div className="absolute top-14 left-0 w-full bg-white shadow-xl rounded-xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => {
                        navigate(
                          `/${product.gender}/product/${product.category}/${product.name
                            .toLowerCase()
                            .replace(/[^a-zA-Z0-9 ]/g, "")
                            .replaceAll(" ", "-")}`,
                        );
                        setSearch("");
                        setSearchResults([]);
                      }}
                      className="flex items-center gap-4 p-4 hover:bg-gray-100 cursor-pointer border-b"
                    >
                      {/* IMAGE */}
                      <img
                        src={product.image || product.images?.[0]}
                        alt=""
                        className="w-14 h-14 object-cover rounded"
                      />

                      {/* DETAILS */}
                      <div>
                        <h2 className="font-semibold text-sm">
                          {product.name}
                        </h2>

                        <p className="text-gray-500 text-xs capitalize">
                          {product.category}
                        </p>
                        <p className="font-bold text-sm mt-1">
                          ₹ {product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ICONS */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 text-[26px] sm:text-[28px] lg:text-[30px]">
              {/* MOBILE SEARCH */}
              <HiOutlineSearch className="xl:hidden cursor-pointer hover:text-red-500 transition duration-300" />

              {/* USER */}
              <HiOutlineUser
                onClick={() => {
                  const token = localStorage.getItem("token");

                  if (token) {
                    navigate("/profile");
                  } else {
                    navigate("/login");
                  }
                }}
                className="cursor-pointer hover:text-red-500 transition duration-300"
              />

              {/* WISHLIST */}
              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/wishlist")}
              >
                <HiOutlineHeart className="hover:text-red-500 transition duration-300" />

                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {wishlistItems.length}
                  </span>
                )}
              </div>

              {/* CART */}
              <div
                id="cart-icon"
                className="relative cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <HiOutlineShoppingBag size={24} />

                {/* CART COUNT */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="xl:hidden pb-4">
          <div className="flex items-center border border-gray-400 rounded-full px-4 py-2 bg-white">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none bg-transparent text-sm"
            />

            <HiOutlineSearch className="text-2xl cursor-pointer" />
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-70 bg-white shadow-lg z-50 transform transition-transform duration-300

        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* SIDEBAR TOP */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-bold">Menu</h2>

          <HiOutlineX
            className="text-3xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* SIDEBAR LINKS */}
        <div className="flex flex-col p-5 gap-6">
          {navLinks.map((item, index) => (
            <p
              key={index}
              onClick={() => {
                navigate(item.path);

                setMenuOpen(false);
              }}
              className={`text-lg font-semibold cursor-pointer transition duration-300

                ${
                  location.pathname.startsWith(item.path)
                    ? "text-red-500"
                    : "hover:text-red-500"
                }`}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
