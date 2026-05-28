import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import CartContext from "../../context/CartContext";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleRazorpayPayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/payment/create-order",
        {
          amount: total,
        },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "ShopHub",
        description: "Order Payment",

        handler: function () {
          navigate("/order-success");
        },

        prefill: {
          name: fullName,
        },

        theme: {
          color: "#0f766e",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }
  };

  const handleConfirmOrder = async () => {
    if (!fullName || !pincode || !address) {
      alert("Please fill all address details");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (paymentMethod === "cod") {
      alert("Order placed successfully");
      navigate("/order-success");
      return;
    }

    await handleRazorpayPayment();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-4 md:px-10 py-4 md:py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[65%_35%] gap-4 md:gap-8">
        {/* LEFT */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-6">
            Delivery Address
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 text-sm md:text-base outline-none"
            />

            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 text-sm md:text-base outline-none"
            />

            <textarea
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 text-sm md:text-base outline-none h-24 md:h-28 resize-none"
            />
          </div>

          {/* PAYMENT */}
          <h2 className="text-lg md:text-xl font-bold mt-8 md:mt-10 mb-5">
            Payment Method
          </h2>

          <div className="space-y-4">
            <label className="flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer">
              <span className="text-sm md:text-base">Cash On Delivery</span>

              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
            </label>

            <label className="flex items-start md:items-center justify-between gap-3 border rounded-lg px-4 py-3 cursor-pointer">
              <span className="text-sm md:text-base">
                Online Payment (UPI / Cards / Wallets / Net Banking)
              </span>

              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
              />
            </label>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-6">
              Order Summary
            </h2>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.selectedSize}`}
                  className="flex justify-between gap-3 text-xs md:text-sm"
                >
                  <span className="flex-1 truncate">
                    {item.name} × {item.quantity}
                  </span>

                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t mt-5 pt-5">
              <div className="flex justify-between text-sm md:text-base">
                <span>Subtotal</span>
                <span>₹ {total}</span>
              </div>

              <div className="flex justify-between mt-2 text-sm md:text-base">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between mt-4 font-bold text-base md:text-lg">
                <span>Total</span>
                <span>₹ {total}</span>
              </div>
            </div>

            <button
              onClick={handleConfirmOrder}
              className="w-full mt-4 md:mt-6 bg-teal-700 hover:bg-teal-800 text-white py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base"
            >
              {paymentMethod === "cod" ? "PLACE ORDER" : `PAY ₹${total}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
