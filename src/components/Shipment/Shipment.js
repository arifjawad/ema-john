import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit,formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser]=useContext(UserContext);
    const onSubmit = data => {
      const savedCart =getDatabaseCart();
      const orderDetails ={...loggedInUser, products: savedCart,shipment:data,orderTime: new Date()}
      
      fetch('http://localhost:7000/addOrder',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(orderDetails)
      })
        .then(res => res.json())
        .then(data => {
          if(data){
            processOrder();
            alert('order placed successfully');
          }
        });
    }
    
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
       
        <input name="name" defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="your name" />
        {errors.name && <span className="error">name is required</span>}  
        
        <input name="email" defaultValue={loggedInUser.email} {...register("email", { required: true })}  placeholder="your email" />
        {errors.email && <span className="error">email is required</span>} 
        
        <input name="address" {...register("address", { required: true })}  placeholder="your address"/>
        {errors.address && <span className="error">address is required</span>} 
        
        <input name="phone" {...register("phone", { required: true })}  placeholder="your phone no"/>
        {errors.phone && <span className="error">phone no is required</span>} 

        <input type="submit" />
      </form>
    );
};

export default Shipment;