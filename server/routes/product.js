const express =require("express")
const {FetchAllProduct,GetSingleProduct,AddNewProduct, SearchProduct, GetProductByCategory} = require("../Controller/product")

const productRouter=express.Router()

productRouter.get("/get-singleproduct/:productid", GetSingleProduct)
productRouter.get("/fetch-allproduct",FetchAllProduct)
productRouter.post("/add-newproduct",AddNewProduct)
productRouter.get('/search', SearchProduct);
// ✅ Route to get products by category (bat, ball, etc.)
productRouter.get('/category/:category', GetProductByCategory);

module.exports=productRouter;
