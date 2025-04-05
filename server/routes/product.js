const express =require("express")
const {FetchAllProduct,GetSingleProduct,AddNewProduct} = require("../Controller/product")

const productRouter=express.Router()

productRouter.get("/get-singleproduct/:productid", GetSingleProduct)
productRouter.get("/fetch-allproduct",FetchAllProduct)
productRouter.post("/add-newproduct",AddNewProduct)

module.exports=productRouter;
