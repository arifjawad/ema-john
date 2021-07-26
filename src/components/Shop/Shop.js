import React, {useState} from 'react';
import './Shop.css'
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import { useHistory } from 'react-router-dom';

const Shop = () => {
   const first10 = fakeData.slice(0,10);
   const [products, setProducts] = useState(first10);
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