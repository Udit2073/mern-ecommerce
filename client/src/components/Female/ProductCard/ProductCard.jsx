import { useNavigate } from "react-router-dom";

const WomenProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group cursor-pointer"
      onClick={() =>
        navigate(
          `/women/product/${product.category}/${product.name
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .replaceAll(" ", "-")}`,
        )
      }
    >
      {/* IMAGE */}
      <div className="overflow-hidden bg-white rounded-lg relative">
        {/* IMAGE */}
        <img
          src={product.image || product.images?.[0]}
          alt={product.name}
          className="w-full h-60 md:h-96 object-contain group-hover:scale-105 duration-300"
        />

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 duration-300" />
      </div>

      {/* DETAILS */}
      <div className="mt-3 px-1">
        {/* NAME */}
        <h2 className="font-medium text-sm md:text-base text-gray-800 line-clamp-1">
          {product.name}
        </h2>

        {/* CATEGORY */}
        <p className="text-gray-400 text-xs uppercase tracking-wide mt-1">
          {product.category}
        </p>

        {/* PRICE */}
        <div className="flex items-center gap-2 mt-2">
          <p className="font-semibold text-sm md:text-base">
            ₹ {product.price}
          </p>

          <span className="text-gray-400 text-xs line-through">
            ₹ {product.price + 500}
          </span>

          <span className="text-pink-600 text-xs font-medium">20% OFF</span>
        </div>
      </div>
    </div>
  );
};

export default WomenProductCard;
