import toast from "react-hot-toast";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CartContext from "../../context/CartContext";
import WishlistContext from "../../context/WishlistContext";
import "swiper/css";
import "swiper/css/pagination";

const ProductDetails = () => {
  const { name } = useParams();

  const navigate = useNavigate();

  const { addToCart, cartItems } = useContext(CartContext);

  const { wishlistItems, toggleWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);

  const [selectedSize, setSelectedSize] = useState("");

  // const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/name/${name}`,
        );

        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [name]);

  if (!product) {
    return <div className="p-10">Loading...</div>;
  }

  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  return (
    <div className="overflow-x-hidden">
      <div className="px-0 md:px-8 py-0 md:py-10 grid lg:grid-cols-[58%_42%] gap-8 lg:gap-10">
        {/* LEFT SIDE IMAGE GALLERY */}
        <div className="w-full mt-3">
          {/* MOBILE VIEW - SLIDER */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {[product.image, ...(product.images || [])]
              .filter(Boolean)
              .map((img, index) => (
                <div key={index} className="min-w-full snap-center">
                  <img
                    src={img}
                    alt={`${product.name}-${index}`}
                    className="w-full h-125 object-cover"
                  />
                </div>
              ))}
          </div>

          {/* DESKTOP & TABLET VIEW - GRID */}
          <div className="hidden md:grid md:grid-cols-2 gap-3">
            {[product.image, ...(product.images || [])]
              .filter(Boolean)
              .map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden bg-gray-100 rounded-lg"
                >
                  <img
                    src={img}
                    alt={`${product.name}-${index}`}
                    className="w-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="px-4 md:px-0 h-fit w-full lg:sticky lg:top-5">
          {/* PRODUCT NAME */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
            {product.name}
          </h1>

          {/* CATEGORY */}
          <p className="text-gray-500 text-sm mt-2 capitalize">
            {product.category}
          </p>

          {/* LINE */}
          <div className="border-b mt-4"></div>

          {/* PRICE */}
          <h2 className="text-2xl md:text-3xl mt-5 font-bold">
            ₹ {product.price}
          </h2>

          <p className="text-gray-500 text-sm mt-1">Price incl. of all taxes</p>

          {/* SIZE */}
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">Please select a size</p>

              <span className="text-blue-600 text-sm cursor-pointer">
                SIZE CHART
              </span>
            </div>

            {/* SIZE BUTTONS */}
            <div className="flex flex-wrap gap-2 mt-3">
              {["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-11 h-10 sm:w-12 sm:h-10 border rounded flex items-center justify-center text-xs transition
          ${
            selectedSize === size
              ? "bg-black text-white border-black"
              : "hover:border-black"
          }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mt-6">
            <p className="text-sm mb-2">Quantity</p>

            <select className="border px-3 py-2 rounded outline-none w-full sm:w-32">
              {[1, 2, 3, 4, 5].map((qty) => (
                <option key={qty}>{qty}</option>
              ))}
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3 mt-6">
            {/* ADD TO CART */}
            <button
              onClick={() => {
                if (!selectedSize) {
                  toast.error("Please select a size");
                  return;
                }

                const alreadyInCart = cartItems.some(
                  (item) =>
                    item._id === product._id &&
                    item.selectedSize === selectedSize,
                );

                if (alreadyInCart) {
                  navigate("/cart");
                  return;
                }

                addToCart({
                  ...product,
                  selectedSize,
                });

                toast.success("Product added to cart 🛒");
              }}
              className="h-12 w-full bg-black text-white rounded font-semibold text-sm"
            >
              {cartItems.some(
                (item) =>
                  item._id === product._id &&
                  item.selectedSize === selectedSize,
              )
                ? "GO TO CART"
                : "ADD TO CART"}
            </button>

            {/* WISHLIST */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`h-12 w-full rounded font-semibold text-sm transition
      ${
        isWishlisted
          ? "bg-pink-500 text-white"
          : "border border-pink-500 text-pink-500"
      }`}
            >
              {isWishlisted ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
            </button>
          </div>

          {/* DELIVERY */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Delivery Details</h3>

            <div className="flex border rounded overflow-hidden px-3">
              <input
                type="text"
                placeholder="Enter Pincode"
                className="flex-1 h-12 outline-none text-sm"
              />
              <button className="text-blue-600 font-semibold text-sm">
                CHECK
              </button>
            </div>
          </div>

          {/* RETURN POLICY */}
          <div className="mt-6 border border-gray-300 p-4 text-sm text-gray-600 rounded">
            This product is eligible for return or exchange under our 30-day
            return or exchange policy.
          </div>

          {/* ACCORDION */}
          <div className="mt-6 border rounded overflow-hidden text-sm">
            <details open className="border-b">
              <summary className="cursor-pointer px-4 py-3 font-semibold">
                Product Details
              </summary>

              <div className="px-4 pb-4 text-gray-600 leading-6">
                Premium quality oversized t-shirt with soft cotton fabric and
                relaxed fit.
              </div>
            </details>

            <details className="border-b">
              <summary className="cursor-pointer px-4 py-3 font-semibold">
                Product Description
              </summary>

              <div className="px-4 pb-4 text-gray-600 leading-6">
                {product.description}
              </div>
            </details>

            <details>
              <summary className="cursor-pointer px-4 py-3 font-semibold">
                Artist's Details
              </summary>

              <div className="px-4 pb-4 text-gray-600 leading-6">
                Designed exclusively for ShopHub streetwear collection.
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
