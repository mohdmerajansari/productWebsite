const express = require('express');
const userRouter = express.Router();
const homeController = require('../controller/homeController')


userRouter.get("/", homeController.getHomes);
userRouter.get("/add-products", homeController.getAddProducts);
userRouter.post("/add-products", homeController.postAddProducts)
userRouter.get("/vendor-list", homeController.getVendorList);
userRouter.get("/edit-products/:proId", homeController.getEditProducts);
userRouter.post("/edit-products", homeController.postEditProducts)
userRouter.post("/delete-product/:proId",homeController.postDeleteProduct)
userRouter.get("/wishlist", homeController.getWishlist);
userRouter.post("/wishlist/:proId", homeController.postWishlist);
userRouter.post("/remove-wishlist/:proId", homeController.postRemoveFromWishlist)
userRouter.get("/cart",homeController.getCart);
userRouter.post("/cart/:proId",homeController.postCart);
userRouter.post("/remove-from-cart/:proId",homeController.postRemoveFromCart)

module.exports = userRouter;



