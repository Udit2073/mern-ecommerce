import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";

import WishlistContext from "../../context/WishlistContext";
import CartContext from "../../context/CartContext";

const Wishlist = () => {
  const navigate = useNavigate();

  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  const { addToCart, cartItems } = useContext(CartContext);

  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8 min-h-[70vh]">
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <HiOutlineHeart className="text-8xl text-gray-300 mb-6" />

          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Your wishlist is lonely and looking for love.
          </h2>

          <p className="text-gray-500 max-w-lg mb-8">
            Add products to your wishlist, review them anytime and easily move
            them to cart.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <>
          {/* HEADING */}
          <h1 className="text-3xl font-bold mb-8">
            My Wishlist ({wishlistItems.length})
          </h1>

          {/* PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="w-full border border-gray-200 rounded overflow-hidden bg-white hover:shadow-lg transition"
              >
                {/* IMAGE */}
                <div className="relative">
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="absolute top-3 right-3 bg-white w-8 h-8 rounded-full shadow flex items-center justify-center text-lg hover:bg-red-500 hover:text-white transition z-10"
                  >
                    ✕
                  </button>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-72 sm:h-80 md:h-96 object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="p-4">
                  <h2 className="font-semibold text-base sm:text-lg line-clamp-2">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-sm capitalize mt-1">
                    {item.category}
                  </p>

                  <p className="font-bold text-lg sm:text-xl mt-3">
                    ₹ {item.price}
                  </p>
                </div>

                {/* MOVE TO CART */}
                <button
                  onClick={() => {
                    setSelectedProduct(item);
                    setShowSizeModal(true);
                  }}
                  className="w-full border-t py-3 sm:py-4 font-semibold text-teal-600 hover:bg-gray-50 transition"
                >
                  MOVE TO CART
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* SIZE MODAL */}
      {showSizeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6">
            <h2 className="text-xl font-bold text-center mb-5">Select Size</h2>

            <div className="grid grid-cols-4 gap-3">
              {["xss", "XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    const alreadyInCart = cartItems.some(
                      (item) =>
                        item._id === selectedProduct._id &&
                        item.selectedSize === size,
                    );
                    if (alreadyInCart) {
                      navigate("/cart");
                      return;
                    }
                    addToCart({
                      ...selectedProduct,
                      selectedSize: size,
                    });
                    removeFromWishlist(selectedProduct._id);
                    setShowSizeModal(false);
                    setSelectedProduct(null);
                    navigate("/cart");
                  }}
                  className="border py-2 rounded hover:bg-black hover:text-white transition"
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setShowSizeModal(false);
                setSelectedProduct(null);
              }}
              className="mt-5 w-full border py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
