require('dotenv').config();
const { User } = require('../models/user')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const SECREAT_KEY = process.env.SECREAT_KEY
const { productModel } = require('../models/product')

const addtocart = async (req, res) => {
    try {

        const { productId } = req.params;
        console.log(productId)
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product Id is missing"
            })
        }
        const userToken = req.cookies.userToken;
        if (!userToken) {
            return res.status(400).json({
                success: false,
                message: "unauthorized access.Token is not found."
            })
        }
        const decoded = await jwt.verify(userToken, SECREAT_KEY);
        console.log(decoded)
        if (!decoded) {
            return res.status(400).json({
                success: false,
                message: "unauthorized access.Token verification failed."
            })
        }
        const user = await User.findById(decoded.userid)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "unauthorized acces .User is not found"
            })
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(200).json({
                success: false,
                message: "Product not found"
            })
        }
        // Check if the product already exists in the cart
        const existingProductIndex = user.cart.findIndex((item) => item.productId.toString() === productId);
        if (existingProductIndex > -1) {
            // // If product exists, just update the quantity
            user.cart[existingProductIndex].quantity += 1;
            user.cart[existingProductIndex].updatedAt = Date.now()
        } else {
            // If product doesn't exist, push it to the cart
            user.cart.push({
                productId: product._id,
                title: product.title,
                quantity: 1,
                price: product.price,
                discount: product.discount,
                thumbnail: product.thumbnail,
                category: product.category,
                addedAt: Date.now(),
                updatedAt: Date.now(),
            })
        }
        const updateduser = await user.save();



        res.status(200).json({
            success: true,
            message: " Authorized User  .Product added to cart successfully",
            data: updateduser.cart

        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occured while adding the product in cart ",
            error: error.message
        })
    }


}

const fectchcartproducts = async (req, res) => {
    try {
        const usertoken = req.cookies.userToken;
        if (!usertoken) {
            return res.status(400).json({
                success: false,
                message: "unauthorized access . User token not found"
            })
        }
        const decoded = await jwt.verify(usertoken, SECREAT_KEY);
        if (!decoded) {
            return res.status(400).json({
                success: false,
                message: "unauthozied access.token verifiation failed"
            })
        }
        const user = await User.findById(decoded.userid)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        const updateduser = await user.cart;

        res.status(200).json({
            success: true,
            message: "authorized user.Cart product get fetched successfully",
            data: updateduser

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to get fetch cartproduct"
        })
    }

}

const increaseQuantity = async (req, res) => {
    try {
        const productId = req.params.productId;
        console.log("product id for increase quantity", productId)
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product id is Required"
            })
        }
        const userToken = req.cookies.userToken;
        if (!userToken) {
            return res.status(401).json({
                success: false,
                message: "User Token not found"
            })
        }
        const decoded = await jwt.verify(userToken, SECREAT_KEY)
        if (!decoded) {
            return res.status(400).json({
                success: false,
                message: "User Token verification failed"
            })
        }
        const user = await User.findById(decoded.userid)
        console.log(user)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        // Step 5: Check if the product exists in the database
        const ProductExists = await productModel.findById(productId)
        console.log("product exits", ProductExists)
        if (!ProductExists) {
            return res.status(404).json({
                success: true,
                message: "Product not found"
            })
        }
        // Step 6: Find the product in the user's cart
        const cartproduct = user.cart.find((item) => item.productId.toString() === productId)
        console.log("cart product is ", cartproduct)
        if (!cartproduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found in  cart"
            })
        }
        // Step 7: Increase the quantity by 1
        cartproduct.quantity += 1;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Product quantity increased successfull",
            producutd: productId,
            quantity: cartproduct.quantity,


        })

    } catch (error) {

        console.log(error)
        return res.status(400).json({
            success: false,
            message: "An error occurred while increasing the product quantity"
        })
    }

}
const decreaseQuantity = async (req, res) => {
    try {
        const productId = req.params.productId;
        console.log("product id for increase quantity", productId)
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product id is Required"
            })
        }
        const userToken = req.cookies.userToken;
        if (!userToken) {
            return res.status(401).json({
                success: false,
                message: "User Token not found"
            })
        }
        const decoded = await jwt.verify(userToken, SECREAT_KEY)
        if (!decoded) {
            return res.status(400).json({
                success: false,
                message: "User Token verification failed"
            })
        }
        const user = await User.findById(decoded.userid)
        console.log(user)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        // Step 5: Check if the product exists in the database
        const ProductExists = await productModel.findById(productId)
        console.log("product exits", ProductExists)
        if (!ProductExists) {
            return res.status(404).json({
                success: true,
                message: "Product not found"
            })
        }
        // Step 6: Find the product in the user's cart
        const cartproduct = user.cart.find((item) => item.productId.toString() === productId)
        console.log("cart product is ", cartproduct)
        if (!cartproduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found in  cart"
            })
        }
        // Step 7: Increase the quantity by 1
        cartproduct.quantity -= 1;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Product quantity decreased successfull",
            producutd: productId,
            quantity: cartproduct.quantity,


        })

    } catch (error) {

        console.log(error)
        return res.status(400).json({
            success: false,
            message: "An error occurred while decreasing the product quantity"
        })
    }

}

const Removecartproduct = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log("product id for remove from Cart", productId)

        if (!productId) {
            return res.status(400).json({
                success: false,
                messsage: "productId is Missing and productId is required"

            })
        }
        const userToken = req.cookies.userToken;

        if (!userToken) {
            return res.status(404).json({
                success: false,
                message: "usertoken not found"
            })
        }
        const decoded = await jwt.verify(userToken, SECREAT_KEY)
        console.log(decoded)
        if (!decoded) {
            return res.status(500).json({
                success: false,
                message: "usertoken verification failed"
            })
        }
        const user = await User.findById(decoded.userid)
        console.log("user is", user)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        if (user.cart.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products in the cart",
            });
        }

        const ProductIncart = user.cart.find((item) => item.productId.toString() === productId)
        console.log("product in cart", ProductIncart)
        if (!ProductIncart) {
            return res.status(404).json({
                success: false,
                message: "Produt not found in cart"
            })
        }
        const updateduser = await User.findByIdAndUpdate(
            user._id,
            { $pull: { cart: { productId } } },
            { new: true }
        )


        res.status(200).json({
            success: true,
            message: "Product removed from Cart successfully.",
            data: updateduser.cart
        });


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "can not remove Cart product due to error",

        })

    }


}


const toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log("prdouct id is for adding or removing wishlist", productId)

        if (!productId) {
            return res.status(400).json({
                success: false,
                messsage: "product id is not found or missing"

            })
        }
        const userToken = req.cookies.userToken;

        if (!userToken) {
            return res.status(401).json({
                success: false,
                message: "usertoken not found"
            })
        }
        const decoded = await jwt.verify(userToken, SECREAT_KEY)

        if (!decoded) {
            return res.status(400).json({
                success: false,
                message: "usertoken verification failed"
            })
        }

        const user = await User.findById(decoded.userid)
        console.log("user is", user)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "unauthorized user. user not found"
            })
        }

        //check if product is exist in user wishlist
        const productIndex = user.wishlist.findIndex((item) => item.productId.toString() === productId)
        if (productIndex === -1) {
            //product not in wishlist -> ADD it
            const product = await productModel.findById(productId)
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product is not Found"
                });
            }
            user.wishlist.push({
                productId: product._id,
                title: product.title,
                quantity: 1,
                price: product.price,
                discount: product.discount,
                thumbnail: product.thumbnail,
                category: product.category,
                addedAt: Date.now(),
                updatedAt: Date.now(),
            });

        } else {
            // Product exists → Remove it (toggle off)
            user.wishlist.splice(productIndex, 1)
        }
        await user.save();
        return res.status(200).json({
            success: true,
            message: productIndex === -1 ? "Prouduct added to wishlist " : "Product removed from wishlist",
            data: user.wishlist
        })


    } catch (error) {
        console.error("Error while adding product to wishlist:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the product to the wishlist.",
            error: error.message,
        });


    }


}


const fetchwishlistproducts = async (req, res) => {
    try {
        const usertoken = req.cookies.userToken;
        if (!usertoken) {
            return res.status(401).json({
                success: false,
                message: " User token not found"
            })
        }
        const decoded = await jwt.verify(usertoken, SECREAT_KEY);
        if (!decoded) {
            return res.status(404).json({
                success: false,
                message: "user token verifiation failed"
            })
        }
        const user = await User.findById(decoded.userid)
        if (!user) {
            return res.status(401).json({
                status: "user not found"
            })
        }
        await user.wishlist;

        res.status(200).json({
            success: true,
            message: "wishlist products is successfully fetched",
            data: user.wishlist
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to get fetch wishlistproduct"
        })
    }

};


module.exports = {
    addtocart,
    fectchcartproducts,
    toggleWishlist,
    fetchwishlistproducts,
    Removecartproduct,
    increaseQuantity,
    decreaseQuantity,

}