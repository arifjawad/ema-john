import React, {useEffect, useState} from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useHistory } from 'react-router-dom';

const Shop = () => {
  
   const [products, setProducts] = useState([]);
   const [cart, setCart] = useState([]);
   const history =useHistory();

   const handleAddProduct =(product) =>{
      // console.log('pd added',product);
      const newCart =[...cart, product];
      setCart(newCart);
      const sameProduct = newCart.filter(pd => pd.key === product.key);
      addToDatabaseCart(product.key,sameProduct);
   }
  
    
    
   const handleOrderReview =() =>{
       history.push('/review');

   }
 
   //fetch from mongoDB API 
   useEffect(()=>{
       fetch('http://localhost:4000/products')
       .then(res => res.json())
       .then(data=> setProducts(data))
   },[])


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
        <div className="shop-container">
            <div className="product-container">
            <ul>
               {
                    products.map(pd => <Product 
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct ={handleAddProduct}
                        product={pd}></Product>)
               }
           </ul>
        
            </div>
         <div className="cart-container">
               <Cart cart={cart}>
              
                  <button className="main-btn" onClick={handleOrderReview}>Review Order</button>
          
               </Cart>
               {/* <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
               </Cart> */}
         </div>
        </div>
    );
};

export default Shop;