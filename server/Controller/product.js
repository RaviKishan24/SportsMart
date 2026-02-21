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
const GetProductByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category is missing"
            });
        }

        const products = await productModel.find({ category: category.toLowerCase() });
        if (!products.length) {
            return res.status(404).json({
                success: false,
                message: `No products found in ${category} category`
            });
        }

        res.status(200).json({
            success: true,
            message: `Products fetched for category: ${category}`,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch products by category"
        });
    }
};


const SearchProduct = async (req, res) => {
    try {
        const { keyword } = req.body;

        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: "Search keyword is required"
            });
        }
 console.log(keyword)
        const products = await productModel.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } }
            ]
        });
console.log(products)
        res.status(200).json({
            success: true,
            message: "Search results",
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to search products"
        });
    }
};



module.exports = {
    FetchAllProduct,
    AddNewProduct,
    GetSingleProduct,
    GetProductByCategory,
    SearchProduct,
    
}