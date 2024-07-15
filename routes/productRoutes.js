const express = require("express");
const {
    addProduct,
    allProducts,
} = require("../controllers/productController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// Post /add
router.post("/add", isAuthenticated, addProduct);

// Get /allproductlist
router.get("/all-products", isAuthenticated, allProducts);




module.exports = router;