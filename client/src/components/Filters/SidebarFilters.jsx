import { useNavigate } from "react-router-dom";

const SidebarFilters = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  basePath,
}) => {
  // NAVIGATE

  const navigate = useNavigate();

  // HANDLE CATEGORY

  const handleCategory = (category) => {
    // UPDATE CATEGORY

    setSelectedCategories([category]);

    // CHANGE ROUTE

    navigate(`${basePath}/${category}`);
  };

  return (
    <div className="space-y-10">
      {/* CATEGORY */}

      <div>
        <h2 className="text-xl font-bold mb-5">Categories</h2>

        <div className="space-y-4">
          {categories.map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(item)}
                onChange={() => handleCategory(item)}
                className="w-4 h-4 cursor-pointer accent-black"
              />

              <span className="capitalize text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;
