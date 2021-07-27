import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit,formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [loggedInUser, setLoggedInUser]=useContext(UserContext);
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