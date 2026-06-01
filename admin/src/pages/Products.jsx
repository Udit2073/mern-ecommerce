import API from "../../../client/src/services/api.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = ({ gender, category }) => {
  const [products, setProducts] = useState([]);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");

        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter((item) => item._id !== id));

      alert("Product Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // FILTER PRODUCTS
  const filteredProducts = products.filter(
    (item) =>
      (!gender || item.gender === gender) &&
      (!category || item.category === category),
  );

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-5 md:px-8 py-5 md:py-8">
      {/* TOP */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold capitalize">
            {gender ? `${gender}'s` : "All"} {category ? category : "Products"}
          </h1>

          <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-base">
            {filteredProducts.length} Products
          </p>
        </div>

        {/* ADD PRODUCT */}
        <Link
          to="/add-product"
          className="w-full sm:w-auto text-center bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 duration-300"
        >
          Add Product
        </Link>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl duration-300"
          >
            {/* IMAGE */}
            <img
              src={product.image || product.images?.[0]}
              alt={product.name}
              className="w-full h-44 sm:h-64 md:h-72 lg:h-80 object-cover"
            />

            {/* DETAILS */}
            <div className="p-3 md:p-4">
              <h2 className="text-sm md:text-lg font-bold line-clamp-1">
                {product.name}
              </h2>

              <p className="text-gray-500 mt-1 capitalize text-xs md:text-sm">
                {product.category}
              </p>

              <p className="font-bold mt-2 text-sm md:text-lg">
                ₹ {product.price}
              </p>

              <p className="text-xs md:text-sm text-gray-400 mt-1 capitalize">
                {product.gender}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2 md:gap-3 mt-4">
                {/* EDIT */}
                <Link
                  to={`/admin/edit/${product._id}`}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-center text-sm md:text-base duration-300"
                >
                  Edit
                </Link>

                {/* DELETE */}
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm md:text-base duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NO PRODUCTS */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 md:py-20">
          <h2 className="text-xl md:text-3xl font-bold text-gray-400">
            No Products Found
          </h2>
        </div>
      )}
    </div>
  );
};

export default Products;
