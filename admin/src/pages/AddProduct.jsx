import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    images: ["", "", "", ""],
    category: "",
    gender: "",
    description: "",
  });

  // HANDLE INPUT

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT FORM

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/products",
        formData,
      );

      console.log(response.data);

      alert("Product Added Successfully");

      // RESET FORM

      setFormData({
        name: "",
        price: "",
        image: "",
        images: ["", "", "", ""],
        category: "",
        gender: "",
        description: "",
      });
    } catch (error) {
      console.log(error);

      alert("Error Adding Product");
    }
  };

  // MEN CATEGORIES

  const menCategories = [
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

  // WOMEN CATEGORIES

  const womenCategories = [
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
    <div className="min-h-screen bg-gray-100 px-3 sm:px-5 md:px-10 py-5 md:py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8">
          Add Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          {/* PRODUCT NAME */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-sm md:text-base outline-none"
            required
          />

          {/* PRICE */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-sm md:text-base outline-none"
            required
          />

          {/* IMAGE */}
          <input
            type="text"
            name="image"
            placeholder="Main Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-sm md:text-base outline-none"
            required
          />

          {/* EXTRA IMAGES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Extra Image 1"
              value={formData.images[0]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  images: [
                    e.target.value,
                    formData.images[1],
                    formData.images[2],
                    formData.images[3],
                  ],
                })
              }
              className="w-full border rounded-lg px-4 py-3 text-sm md:text-base"
            />

            <input
              type="text"
              placeholder="Extra Image 2"
              value={formData.images[1]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  images: [
                    formData.images[0],
                    e.target.value,
                    formData.images[2],
                    formData.images[3],
                  ],
                })
              }
              className="w-full border rounded-lg px-4 py-3 text-sm md:text-base"
            />

            <input
              type="text"
              placeholder="Extra Image 3"
              value={formData.images[2]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  images: [
                    formData.images[0],
                    formData.images[1],
                    e.target.value,
                    formData.images[3],
                  ],
                })
              }
              className="w-full border rounded-lg px-4 py-3 text-sm md:text-base"
            />

            <input
              type="text"
              placeholder="Extra Image 4"
              value={formData.images[3]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  images: [
                    formData.images[0],
                    formData.images[1],
                    formData.images[2],
                    e.target.value,
                  ],
                })
              }
              className="w-full border rounded-lg px-4 py-3 text-sm md:text-base"
            />
          </div>

          {/* GENDER */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-sm md:text-base"
            required
          >
            <option value="">Select Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>

          {/* CATEGORY */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-sm md:text-base"
            required
          >
            <option value="">Select Category</option>

            {formData.gender === "men" &&
              menCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}

            {formData.gender === "women" &&
              womenCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-sm md:text-base h-32 md:h-40 resize-none"
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
