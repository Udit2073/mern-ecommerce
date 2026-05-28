import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg text-center max-w-lg w-full">
        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-4" />

        <h1 className="text-3xl font-bold mb-3">Order Placed Successfully!</h1>

        <p className="text-gray-600 mb-6">
          Thank you for shopping with us. Your order has been confirmed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-teal-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-800"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="border border-teal-700 text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-teal-50"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
