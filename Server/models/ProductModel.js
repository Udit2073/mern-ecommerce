import mongoose from "mongoose";

const productSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      // MAIN IMAGE
      image: {
        type: String,
        required: true,
      },

      // EXTRA IMAGES
      images: [
        {
          type: String,
        },
      ],

      category: {
        type: String,
        required: true,
      },

      gender: {
        type: String,
        required: true,
      },

      description: {
        type: String,
      },
    },
    { timestamps: true }
  );

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;