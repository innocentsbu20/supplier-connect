import React from 'react';
import Header from '../../components/header/Header';

export default function Main() {
    const menuItems = ['Inventory', 'Specials Offers', 'Order History'];

    return (
        <div>
            <Header menuItems={menuItems} />
            Main
        </div>
    )

}