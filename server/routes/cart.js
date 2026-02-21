const express = require('express')
const { addtocart, fectchcartproducts, toggleWishlist, fetchwishlistproducts, Removecartproduct, increaseQuantity, decreaseQuantity} = require('../Controller/cart')
const cartRouter = express.Router()

cartRouter.get('/addtocart/:productId', addtocart)
cartRouter.get('/fetch-cartproducts', fectchcartproducts)
cartRouter.patch('/togglewishlist/:productId', toggleWishlist)
cartRouter.get('/fetch-wishlistproducts', fetchwishlistproducts)
cartRouter.delete('/remove-productfrom-cart/:productId',Removecartproduct)
cartRouter.put('/increase-quantity/:productId',increaseQuantity)
cartRouter.put('/decrease-quantity/:productId',decreaseQuantity)

module.exports = cartRouter;