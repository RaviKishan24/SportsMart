import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductAction } from '../../redux/actions/product';
import { addtocartAction } from "../../redux/actions/cart"
import Navbar from '../Navbar';
import Footer from '../Footer';
import './Pmain.css'
function Football() {
    const dispatch = useDispatch();
    const Data = useSelector((store) => store.productGS.data)
    const footballproduct = Data.filter((product) => product.category == 'football')
    console.log(footballproduct)
    useEffect(() => {
        dispatch(fetchProductAction())
    }, [dispatch])

    const addtocart = (productId) => {
        try {
            dispatch(addtocartAction(productId))
            console.log(" added product id is", productId)
        } catch (error) {
            console.log("error occur during adding product into cart")
        }
    }

    return (

        <div>
            <Navbar></Navbar>

            <div className='row gap-3  pmain'>
                {footballproduct.map((product) => {
                    return (
                        <div className="card" key={product._id}>

                            <img src={product.thumbnail}
                                className="card-img-top imgs" alt="..." />
                            <div className="card-body">
                                <p className="title">{product.title}</p>
                                <div className="prices">
                                    <span className='dis'>₹ {product.price}</span>
                                    <span >₹ {product.price - product.discount}</span>
                                </div>
                                <div onClick={() => addtocart(product._id)} className="card-button  ">
                                    <span className='cart-button-icon'>
                                        <i className=" fa-solid fa-cart-shopping " > </i>
                                    </span>
                                    <p className='mb-1'>Add to cart</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>



            <Footer></Footer>
        </div>
    )
}

export default Football
