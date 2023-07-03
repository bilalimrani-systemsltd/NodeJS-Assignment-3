const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controller");
const product_controller = require("../controllers/product_controller");
const category_controller = require("../controllers/category_controller");
const cart_controller = require("../controllers/cart_controller");
const checkout_controller = require("../controllers/checkout_controller");

router.post("/create_user", user_controller.createNewUser);
router.post("/update_user", user_controller.updateUser);
router.post("/delete_user", user_controller.deleteUser);
router.post("/login_user", user_controller.loginUser);

// Categories
router.post("/create_category", category_controller.createNewCategory);
router.post("/update_category", category_controller.updateCategory);
router.post("/delete_category", category_controller.deleteCategory);
router.get("/get_all_categories", category_controller.getAllCategories);

// Products
router.post("/create_product", product_controller.createNewProduct);
router.post("/update_product", product_controller.updateProduct);
router.post("/delete_product", product_controller.deleteProduct);
router.get("/get_all_products", product_controller.getAllProducts);

//Cart
router.post("/create_cart", cart_controller.createNewCart);
router.post("/update_cart", cart_controller.updateCart);
router.post("/delete_cart", cart_controller.deleteCart);

//Checkout
router.post("/create_order", checkout_controller.createNewOrder);
router.post("/update_order", checkout_controller.updateOrder);
router.post("/delete_order", checkout_controller.deleteOrder);

module.exports = router;
