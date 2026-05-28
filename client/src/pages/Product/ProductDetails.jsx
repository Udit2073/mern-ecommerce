import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import CartContext from "../../context/CartContext";
import WishlistContext from "../../context/WishlistContext";

const ProductDetails = () => {
  const { name } = useParams();

  const navigate = useNavigate();

  const { addToCart, cartItems } = useContext(CartContext);

  const { wishlistItems, toggleWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);

  const [animateCart, setAnimateCart] = useState(false);

  const [selectedSize, setSelectedSize] = useState("");

  const [selectedImage, setSelectedImage] = useState("");

  const isMobile = window.innerWidth < 768;

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
      {/* FLYING IMAGE ANIMATION */}
      {animateCart && (
        <motion.img
          src={product.image}
          alt=""
          initial={{
            position: "fixed",
            top: isMobile ? "65%" : "55%",
            left: isMobile ? "50%" : "35%",
            x: isMobile ? "-50%" : "0%",
            scale: 1,
            opacity: 1,
          }}
          animate={{
            top: isMobile ? "1px" : "-50px",
            left: isMobile ? "90%" : "100%",
            scale: 0.1,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-xl z-9999 pointer-events-none"
        />
      )}
      <div className="pl-3 pr-6 sm:pl-5 sm:pr-8 md:pl-8 md:pr-15 py-6 md:py-10 grid lg:grid-cols-[58%_42%] gap-8 lg:gap-10">

        {/* LEFT SIDE IMAGE GALLERY */}
        <div className="w-full overflow-hidden">

          {/* MAIN IMAGE */}
          <div className="w-full rounded-xl overflow-hidden bg-gray-100">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-87.5 sm:h-125 md:h-162.5 lg:h-180 object-cover"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {[product.image, ...(product.images || [])]
              .filter((img) => img)
              .map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`min-w-20 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 shrink-0 transition
          ${selectedImage === img ? "border-black" : "border-gray-200"}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="h-fit w-full">

          {/* PRODUCT NAME */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {product.name}
          </h1>

          {/* CATEGORY */}
          <p className="text-gray-500 text-sm mt-1 capitalize">
            {product.category}
          </p>

          {/* LINE */}
          <div className="border-b mt-4"></div>

          {/* PRICE */}
          <h2 className="text-2xl md:text-3xl mt-6 font-bold">
            ₹ {product.price}
          </h2>
          <p className="text-gray-500 text-sm mt-1">Price incl. of all taxes</p>

          {/* SIZE */}
          <div className="mt-6">
            <p className="font-semibold text-sm">
              Please select a size.
              <span className="text-blue-600 ml-2 cursor-pointer">
                SIZE CHART
              </span>
            </p>

            {/* SIZE BUTTONS */}
            <div className="flex gap-3 mt-3 flex-wrap">
              {["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-10 border rounded flex items-center justify-center text-xs transition
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
          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm">Quantity</span>

            <select className="border px-3 py-1 rounded outline-none">
              {[1, 2, 3, 4, 5].map((qty) => (
                <option key={qty}>{qty}</option>
              ))}
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">

            {/* ADD TO CART */}
            <button
              onClick={() => {
                if (!selectedSize) {
                  alert("Please select a size");
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
                setAnimateCart(true);
                setTimeout(() => {
                  setAnimateCart(false);
                }, 1000);
              }}
              className={`h-12 w-full rounded font-semibold text-sm transition
          ${
            cartItems.some(
              (item) =>
                item._id === product._id && item.selectedSize === selectedSize,
            )
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
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
      : "border border-pink-500 text-pink-500 hover:bg-pink-50"
  }`}
            >
              {isWishlisted ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
            </button>
          </div>

          {/* DELIVERY */}
          <div className="mt-10">
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
            {/* PRODUCT DETAILS */}
            <details open className="border-b">
              <summary className="cursor-pointer px-4 py-3 font-semibold">
                Product Details
              </summary>
              <div className="px-4 pb-4 text-gray-600 leading-6">
                Premium quality oversized t-shirt with soft cotton fabric and
                relaxed fit.
              </div>
            </details>

            {/* DESCRIPTION */}
            <details className="border-b">
              <summary className="cursor-pointer px-4 py-3 font-semibold">
                Product Description
              </summary>
              <div className="px-4 pb-4 text-gray-600 leading-6">
                {product.description}
              </div>
            </details>

            {/* ARTIST */}
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
