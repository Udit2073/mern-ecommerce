import API from "../../services/api.js";
import { useEffect, useState } from "react";
import ProductCard from "../../components/Female/ProductCard/ProductCard";
import SidebarFilters from "../../components/Filters/SidebarFilters";

const WomenTshirts = () => {
  const [products, setProducts] = useState([]);

  const [sort, setSort] = useState("");

  const [selectedCategories, setSelectedCategories] = useState(["tshirts"]);

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

  // FILTER WOMEN PRODUCTS

  let filteredProducts = products.filter(
    (item) => item.gender?.toLowerCase() === "women",
  );

  // CATEGORY FILTER

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((item) =>
      selectedCategories.includes(item.category?.toLowerCase()),
    );
  }

  // SORTING

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // CATEGORIES

  const categories = [
    "tshirts",
    "shirts",
    "tops",
    "pants",
    "joggers",
    "denims",
    "dresses",
    "sneakers",
    "perfumes",
  ];

  return (
    <div className="px-4 md:px-8 py-4">
      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Women's T-Shirts</h1>

          <p className="text-gray-500 mt-2">
            {filteredProducts.length} Products
          </p>
        </div>

        {/* SORT */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-4 py-3 rounded-md w-full md:w-62"
        >
          <option value="">Select Sorting</option>

          <option value="low">Price Low to High</option>

          <option value="high">Price High to Low</option>
        </select>
      </div>

      {/* MAIN */}

      <div className="flex gap-10">
        {/* SIDEBAR */}

        <div className="hidden lg:block w-65 shrink-0 sticky top-24 h-fit">
          <SidebarFilters
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            basePath="/women"
          />
        </div>

        {/* PRODUCTS */}

        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center text-2xl font-semibold text-gray-500 mt-20">
              No Products Found
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WomenTshirts;
