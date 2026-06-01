import API from "../../services/api.js";
import { useEffect, useState } from "react";
import ProductCard from "../../components/Male/ProductCard/ProductCard";
import SidebarFilters from "../../components/Filters/SidebarFilters";

const MenShirts = () => {
  const [products, setProducts] = useState([]);

  const [sort, setSort] = useState("");

  // DEFAULT CATEGORY
  const [selectedCategories, setSelectedCategories] = useState(["shirts"]);

  // MOBILE FILTER
  const [showFilters, setShowFilters] = useState(false);

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

  // FILTER MEN PRODUCTS
  let filteredProducts = products.filter(
    (item) => item.gender?.toLowerCase() === "men",
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
    "polos",
    "sneakers",
    "joggers",
    "jeans",
    "pants",
    "backpacks",
    "perfumes",
  ];

  return (
    <div className="px-3 sm:px-5 md:px-8 py-6 md:py-8">
      {/* TOP BAR */}
      <div className="flex items-start justify-between gap-5 mb-8 md:mb-10">
        {/* LEFT */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Men's Shirts
          </h1>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            {filteredProducts.length} Products
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* FILTER */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden border border-gray-300 bg-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 duration-300"
          >
            Filter
          </button>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 bg-white px-3 py-2 rounded-md text-sm outline-none w-40"
          >
            <option value="">Sort</option>

            <option value="low">Low to High</option>

            <option value="high">High to Low</option>
          </select>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        
        {/* SIDEBAR */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block w-full lg:w-65 shrink-0 lg:sticky top-24 h-fit`}
        >
          <SidebarFilters
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            basePath="/men"
          />
        </div>

        {/* PRODUCTS */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center text-xl md:text-2xl font-semibold text-gray-500 mt-16">
              No Products Found
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
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

export default MenShirts;
