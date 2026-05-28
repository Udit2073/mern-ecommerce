import { FaTruck, FaUndoAlt } from "react-icons/fa";

import { MdOutlinePayments } from "react-icons/md";

const InfoBar = () => {
  return (
    <div className="bg-[#e6f4f4] mx-0 lg:mx-4 my-4">
      <div className="w-full px-2 sm:px-4 py-4">
        {/* GRID */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {/* CASHBACK */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 bg-white rounded-lg p-2 sm:p-3 shadow-sm">
            <MdOutlinePayments className="text-2xl sm:text-4xl" />

            <div className="text-center sm:text-left">
              <h2 className="text-[10px] sm:text-base font-semibold">
                10% Cashback
              </h2>

              <p className="text-[8px] sm:text-sm text-gray-600">App Orders</p>
            </div>
          </div>

          {/* RETURNS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 bg-white rounded-lg p-2 sm:p-3 shadow-sm">
            <FaUndoAlt className="text-2xl sm:text-4xl" />

            <div className="text-center sm:text-left">
              <h2 className="text-[10px] sm:text-base font-semibold">
                30 Days Return
              </h2>

              <p className="text-[8px] sm:text-sm text-gray-600">
                Easy Exchange
              </p>
            </div>
          </div>

          {/* SHIPPING */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 bg-white rounded-lg p-2 sm:p-3 shadow-sm">
            <FaTruck className="text-2xl sm:text-4xl" />

            <div className="text-center sm:text-left">
              <h2 className="text-[10px] sm:text-base font-semibold">
                Free Shipping
              </h2>

              <p className="text-[8px] sm:text-sm text-gray-600">All Orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
