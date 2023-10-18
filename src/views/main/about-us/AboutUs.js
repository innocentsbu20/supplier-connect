import React from 'react'
import Header from '../../../components/header/Header';

export default function AboutUs() {

    const menuItems = ['Inventory', 'Specials Offers', 'Order History',];

    return (
        <div >
            <Header menuItems={menuItems} />

            <h1>About Us</h1>
            <p>Welcome to Supplier Connect! We are a platform that connects suppliers and buyers.</p>
            <p>Learn more about us and our services here.</p>
        </div>
    )
}
