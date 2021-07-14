import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <h1>this is header</h1>
            <img src={logo} alt="ema-john-logo" />
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Review</a>
                <a href="/manage">Manage Inventory</a>
             </nav>
        </div>
    );
};

export default Header;