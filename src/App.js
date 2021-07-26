import React from 'react';
import './App.css';
import  Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
 import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
 } from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { useState,createContext } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';



export const UserContext =createContext();

function App() {
  library.add(fab, faCheckSquare, faCoffee);
  const [loggedInUser,  setLoggedInUser]= useState({});
 
  return (
    <UserContext.Provider value ={[loggedInUser, setLoggedInUser]}>
   <h3>login email: {loggedInUser.email}</h3>
    <Header></Header>
    
    <Router>
      <Switch>
        <Route exact path="/">
          <Shop></Shop>
        </Route>
        <Route path="/shop">
          <Shop></Shop>
        </Route>
        <Route path="/review">
        <Review></Review>
        </Route>
        <PrivateRoute path="/inventory">
          <Inventory></Inventory>
        </PrivateRoute>
        <Route path="/login">
          <Login></Login>
        </Route>

        <PrivateRoute path="/shipment">
          <Shipment></Shipment>
        </PrivateRoute>

        <Route path="/product/:productKey">
          <ProductDetail></ProductDetail>
        </Route>
        <Route path="*">
          <Notfound></Notfound>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
