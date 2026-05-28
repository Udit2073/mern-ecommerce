import { useParams, Link } from "react-router-dom";
import products from "../../Data/Male/products";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase(),
  );
  return (
    <div className="mx-4 md:mx-10 my-10">
      {/* Heading */}
      <h1 className="text-3xl md:text-5xl font-bold text-center uppercase mb-12 tracking-wide">
        {categoryName}
      </h1>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className="group cursor-pointer">
              {/* Image */}
              <div className="overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-112.5 object-cover group-hover:scale-105 duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-500 mt-1">Premium Collection</p>
                <p className="text-lg font-bold mt-2">₹{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
