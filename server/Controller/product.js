const { productModel } = require('../models/product')

const FetchAllProduct = async (req, res) => {
    try {
        const productnew = await productModel.find();
        res.status(200).json({
            success: true,
            message: "Product Fetched successfully",
            data: productnew
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "failed to fetch products"
        })
    }
}

const AddNewProduct = async (req, res) => {
    try {
        const { title, price, discount,category, thumbnail, ratings } = req.body;
        if (!title || !price || !discount ||!category || !thumbnail || !ratings) {
            return res.status(400).json({
                success: false,
                message: "Missing input field"
            })
        }
        const data = await productModel.create({
            title, price, discount,category, thumbnail, ratings,
        });
        res.status(200).json({
            success: true,
            message: "product Added Successfully",
            data: data,
        })


    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "failed to add products"
        })
    }
}

const GetSingleProduct = async (req, res) => {
    try {
        const {productid} = req.params;
        if (!productid) {
           return  res.status(400).json({
                success: false,
                message: "product ID is missing"
            })
        }
        const product = await productModel.findById(productid);
        if (!product) {
            res.status(404).json({
                success: false,
                message: "product with this id not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "product found",
            data: product

        })


    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "failed to get product"
        })
    }
}


module.exports = {
    FetchAllProduct,
    AddNewProduct,
    GetSingleProduct,
}