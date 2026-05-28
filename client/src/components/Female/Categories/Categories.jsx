import { Link } from "react-router-dom";

import categories from "../../../Data/Female/categories.js";

const Categories = () => {
  return (
    <div className="sm:px-6 md:px-10 lg:px-20 xl:px-40 my-12 md:my-16">
      {/* HEADING */}
      <h1 className="text-2xl md:text-3xl mb-3 font-bold text-center md:mb-12 tracking-wide">
        CATEGORIES
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-2 md:gap-6">
        {categories.map((category) => (
          <Link key={category.id} to={`/women/${category.slug}`}>
            <div className="group cursor-pointer overflow-hidden bg-gray-100">
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-40 sm:h-48 md:h-125 lg:h-130 object-cover group-hover:scale-105 duration-300"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
