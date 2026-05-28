import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = ({ mobileMenu, setMobileMenu }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAccess");

    navigate("/admin-login");
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link to="/" className="text-lg sm:text-2xl font-bold tracking-wide">
            Admin Panel
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="hover:text-gray-300 duration-300">
              Home
            </Link>

            <Link
              to="/add-product"
              className="hover:text-gray-300 duration-300"
            >
              Add Product
            </Link>

            {/* MEN */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-gray-300 duration-300 py-2">
                Men
                <ChevronDown size={18} />
              </button>

              <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                <div className="bg-white text-black rounded-lg shadow-xl overflow-hidden min-w-55">
                  <Link
                    to="/products/men/tshirts"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    T-Shirts
                  </Link>
                  <Link
                    to="/products/men/shirts"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Shirts
                  </Link>
                  <Link
                    to="/products/men/polos"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Polos
                  </Link>
                  <Link
                    to="/products/men/sneakers"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Sneakers
                  </Link>
                  <Link
                    to="/products/men/joggers"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Joggers
                  </Link>
                  <Link
                    to="/products/men/jeans"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Jeans
                  </Link>
                  <Link
                    to="/products/men/pants"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Pants
                  </Link>
                  <Link
                    to="/products/men/backpacks"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Backpacks
                  </Link>
                  <Link
                    to="/products/men/perfumes"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Perfumes
                  </Link>
                </div>
              </div>
            </div>

            {/* WOMEN */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-gray-300 duration-300 py-2">
                Women
                <ChevronDown size={18} />
              </button>

              <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                <div className="bg-white text-black rounded-lg shadow-xl overflow-hidden min-w-55">
                  <Link
                    to="/products/women/tshirts"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    T-Shirts
                  </Link>
                  <Link
                    to="/products/women/shirts"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Shirts
                  </Link>
                  <Link
                    to="/products/women/tops"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Tops
                  </Link>
                  <Link
                    to="/products/women/pants"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Pants
                  </Link>
                  <Link
                    to="/products/women/joggers"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Joggers
                  </Link>
                  <Link
                    to="/products/women/denims"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Denims
                  </Link>
                  <Link
                    to="/products/women/dresses"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Dresses
                  </Link>
                  <Link
                    to="/products/women/sneakers"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Sneakers
                  </Link>
                  <Link
                    to="/products/women/perfumes"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Perfumes
                  </Link>
                </div>
              </div>
            </div>

            <Link to="/products" className="hover:text-gray-300 duration-300">
              All Products
            </Link>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg duration-300"
            >
              Logout
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden"
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="lg:hidden bg-black border-t border-gray-800">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <Link to="/" className="py-2" onClick={() => setMobileMenu(false)}>
              Home
            </Link>

            <Link
              to="/add-product"
              className="py-2"
              onClick={() => setMobileMenu(false)}
            >
              Add Product
            </Link>

            <Link
              to="/products"
              className="py-2"
              onClick={() => setMobileMenu(false)}
            >
              All Products
            </Link>

            {/* MOBILE LOGOUT */}
            <button
              onClick={() => {
                handleLogout();
                setMobileMenu(false);
              }}
              className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-lg"
            >
              Logout
            </button>

            {/* MEN */}
            <div className="border-t border-gray-700 pt-3">
              <h3 className="font-semibold mb-3">Men</h3>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <Link to="/products/men/tshirts">T-Shirts</Link>
                <Link to="/products/men/shirts">Shirts</Link>
                <Link to="/products/men/polos">Polos</Link>
                <Link to="/products/men/sneakers">Sneakers</Link>
                <Link to="/products/men/joggers">Joggers</Link>
                <Link to="/products/men/jeans">Jeans</Link>
                <Link to="/products/men/pants">Pants</Link>
                <Link to="/products/men/backpacks">Backpacks</Link>
                <Link to="/products/men/perfumes">Perfumes</Link>
              </div>
            </div>

            {/* WOMEN */}
            <div className="border-t border-gray-700 pt-3">
              <h3 className="font-semibold mb-3">Women</h3>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <Link to="/products/women/tshirts">T-Shirts</Link>
                <Link to="/products/women/shirts">Shirts</Link>
                <Link to="/products/women/tops">Tops</Link>
                <Link to="/products/women/pants">Pants</Link>
                <Link to="/products/women/joggers">Joggers</Link>
                <Link to="/products/women/denims">Denims</Link>
                <Link to="/products/women/dresses">Dresses</Link>
                <Link to="/products/women/sneakers">Sneakers</Link>
                <Link to="/products/women/perfumes">Perfumes</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
