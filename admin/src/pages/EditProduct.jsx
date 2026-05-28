import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    images: ["", "", "", ""],
    category: "",
    gender: "",
    description: "",
  });

  // FETCH SINGLE PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");

        const product = response.data.find((item) => item._id === id);

        setFormData({
          ...product,
          images:
            product.images?.length > 0 ? product.images : ["", "", "", ""],
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/api/products/${id}`, formData);

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-5 md:px-8 lg:px-10 py-5 md:py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NAME */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border rounded-lg px-4 py-3 text-sm md:text-base outline-none"
          />

          {/* PRICE */}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border rounded-lg px-4 py-3 text-sm md:text-base outline-none"
          />

          {/* MAIN IMAGE */}
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Main Image URL"
            className="w-full border rounded-lg px-4 py-3 text-sm md:text-base outline-none"
          />

          {/* EXTRA IMAGES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.images.map((img, index) => (
              <input
                key={index}
                type="text"
                value={img}
                placeholder={`Extra Image ${index + 1}`}
                onChange={(e) => {
                  const updatedImages = [...formData.images];

                  updatedImages[index] = e.target.value;

                  setFormData({
                    ...formData,
                    images: updatedImages,
                  });
                }}
                className="w-full border rounded-lg px-4 py-3 text-sm md:text-base outline-none"
              />
            ))}
          </div>

          {/* CATEGORY + GENDER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border rounded-lg px-4 py-3 text-sm md:text-base outline-none"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 text-sm md:text-base outline-none"
            >
              <option value="">Select Gender</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded-lg px-4 py-3 text-sm md:text-base h-32 md:h-40 resize-none outline-none"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
