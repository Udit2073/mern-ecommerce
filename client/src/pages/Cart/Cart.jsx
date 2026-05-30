import toast from "react-hot-toast";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>

        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 md:px-6 py-6">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        My Cart ({cartItems.length})
      </h1>

      <div className="grid lg:grid-cols-[65%_35%] gap-6">
        {/* LEFT */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={`${item._id}-${item.selectedSize}`}
              className="bg-white border rounded-lg overflow-hidden"
            >
              {/* Top Section */}
              <div className="flex gap-3 p-3">
                {/* Image */}
                <img
                  src={item.image || item.images?.[0]}
                  alt={item.name}
                  className="w-28 h-36 md:w-40 md:h-48 object-cover rounded"
                />

                {/* Details */}
                <div className="flex-1">
                  <h2 className="font-semibold text-sm md:text-xl line-clamp-2">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1 capitalize">
                    {item.category}
                  </p>

                  <p className="text-sm mt-1">
                    Size:{" "}
                    <span className="font-medium">{item.selectedSize}</span>
                  </p>

                  {/* Size & Qty */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <select
                      className="border rounded px-3 py-2 text-sm bg-gray-50"
                      value={item.selectedSize}
                      disabled
                    >
                      <option>Size: {item.selectedSize}</option>
                    </select>

                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item._id,
                          item.selectedSize,
                          Number(e.target.value),
                        )
                      }
                      className="border rounded px-3 py-2 text-sm bg-gray-50"
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <option key={qty} value={qty}>
                          Qty: {qty}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div className="mt-3">
                    <span className="font-bold text-lg md:text-2xl">
                      ₹ {item.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="grid grid-cols-2 border-t">
                <button
                  onClick={() => removeFromCart(item._id, item.selectedSize)}
                  className="py-3 font-semibold text-sm md:text-base border-r hover:bg-gray-50"
                >
                  REMOVE
                </button>

                <button className="py-3 font-semibold text-sm md:text-base hover:bg-gray-50">
                  MOVE TO WISHLIST
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="border rounded-lg p-5 bg-white h-fit lg:sticky lg:top-24">
          <h2 className="text-xl md:text-2xl font-bold mb-5">
            Billing Details
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Cart Total</span>
              <span>₹ {total}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>
          </div>

          <button
            onClick={() => {
              const token = localStorage.getItem("token");

              if (!token) {
                toast("Please login first");
                navigate("/login");
                return;
              }

              navigate("/checkout");
            }}
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
