import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart= props.cart;
    // const totalPrice = cart.reduce((total, prdct) => total + prdct.price, 0);
    
    // let total =0;
    // for(let i =0; i<cart.length; i++){
    //     const product =cart[i];
    //     total =total +product.price;
    // }
    const total = cart.reduce((sum, product) => sum+product.price,0);

    let shipping =12.99;
    if(total> 35){
        shipping =0;
    }else if(total > 15){
        shipping = 4.99
    }else if(total > 0){
        shipping =12.99
    }
    const tax = (total /10);
    const grandTotal=total + shipping+Number(tax);
    const formatNumber= num =>{
        const percision = num.toFixed(2);
        return Number(percision);
    }
    return (
        <div>
            <h4>Order summery</h4>
            <p>Items:{cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p>Shipping cost:{shipping}</p>
            <p><small>Tax:{formatNumber(tax)}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;