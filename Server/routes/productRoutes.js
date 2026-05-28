import express from "express";

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getProductByName,
} from "../controllers/productController.js";

const router = express.Router();

// ADD PRODUCT
router.post("/", createProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET PRODUCT BY NAME
router.get("/name/:name", getProductByName);

// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct);

// UPDATE PRODUCT
router.put("/:id", updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;