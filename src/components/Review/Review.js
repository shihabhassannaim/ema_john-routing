import React, { useEffect, useState } from 'react';
import { deleteShoppingCart, getStoredCart, removeFromDb } from '../../utilities/fakedb';
import data from './products.json';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import lastImage from '../../images/giphy.gif';


const Review = () => {
    const [cart , setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleRemovePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        deleteShoppingCart();
    }
    const removeProduct = (id)=>{
        const nerCart = cart.filter(cart => cart.id !== id)
        setCart(nerCart);
        removeFromDb(id);
    }

    useEffect(() => {
        const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = data.find(product => product.id === key);
            product.quantity = savedCart[key];
            return product;
        }, [1]);
        setCart(cartProducts);
    } , [])
    let thankYou ;
    if(orderPlaced) {
        thankYou = <img src={lastImage} alt="" />
    }
    
    return (
        <div className='shop-container'>
            <div className='products-container'>
            {
                cart.map(pd => <ReviewItem
                    removeProduct={removeProduct}
                    product={pd}></ReviewItem>)
            }
            {
                thankYou
            }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handleRemovePlaceOrder} className=''>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;