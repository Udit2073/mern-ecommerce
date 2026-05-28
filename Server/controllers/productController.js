import Product from "../models/ProductModel.js";

// ADD PRODUCT
export const createProduct = async (
  req,
  res
) => {
  try {

    const product =
      await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (
  req,
  res
) => {
  try {

    const products =
      await Product.find();

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct =
  async (req, res) => {
    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Product Not Found",
        });
      }

      res.status(200).json(product);

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// DELETE PRODUCT
export const deleteProduct =
  async (req, res) => {
    try {

      const product =
        await Product.findByIdAndDelete(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Product Not Found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Product Deleted Successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// UPDATE PRODUCT
export const updateProduct =
  async (req, res) => {
    try {

      const product =
        await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Product Not Found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Product Updated Successfully",
        product,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // get by name

  export const getProductByName = async (req, res) => {
  try {
    const slug = req.params.name;

    const products = await Product.find();

    const product = products.find((item) => {
      const formattedName = item.name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replaceAll(" ", "-");

      return formattedName === slug;
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};