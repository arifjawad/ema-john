import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getDatabaseCart, removeFromDatabaseCart,processOrder} from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] =useState([]);
    const history =useHistory();
    
    const handleProceedCheckout =() =>{
        history.push('/shipment');

    }
    const removeProduct = (productKey)=>{
        const newCart =cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }

    useEffect(()=>{
      const savedCart= getDatabaseCart();
      const productKeys = Object.keys(savedCart);

      fetch('http://localhost:4000/productKeys',{
          method: 'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(productKeys)
      })
      .then(res => res.json())
      .then(data=>setCart(data))

    },[])
    
    return (
        <div className="twin-container">
            <div className="product-container">
            {/* <h1>Cart Items : {cart.length}</h1> */}
            {
                cart.map(pd => <ReviewItem 
                key={pd.key}
                removeProduct={removeProduct}
                product={pd}></ReviewItem>)
            }
           

        </div>
        <div className="cart-container">
            <Cart cart={cart}>
                <button onClick={handleProceedCheckout} className="main-btn">Proceed Checkout</button>
            </Cart>
        </div>
        </div>
    );
};
 
export default Review;