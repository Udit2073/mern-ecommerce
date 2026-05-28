import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group cursor-pointer"
      onClick={() =>
        navigate(
          `/${product.gender}/product/${product.category}/${product.name
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .replaceAll(" ", "-")}`,
        )
      }
    >
      {/* IMAGE */}
      <div className="overflow-hidden bg-gray-100 rounded-lg relative">
        <img
          src={product.image || product.images?.[0]}
          alt={product.name}
          className="w-full h-65 sm:h-85 md:h-105 lg:h-92.5 xl:h-95 object-cover group-hover:scale-105 duration-300"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 duration-300"></div>
      </div>

      {/* DETAILS */}
      <div className="mt-3 px-1">
        {/* NAME */}
        <h2 className="font-semibold text-sm sm:text-base md:text-lg line-clamp-1">
          {product.name}
        </h2>

        {/* CATEGORY */}
        <p className="text-gray-500 text-xs sm:text-sm capitalize mt-1">
          {product.category}
        </p>

        {/* PRICE */}
        <div className="flex items-center gap-2 mt-2">
          <p className="font-bold text-sm sm:text-base md:text-lg">
            ₹ {product.price}
          </p>
          <span className="text-gray-400 text-xs sm:text-sm line-through">
            ₹ {product.price + 700}
          </span>
          <span className="text-green-600 text-xs sm:text-sm font-medium">
            20% OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
