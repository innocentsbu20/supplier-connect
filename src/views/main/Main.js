import React from 'react';
import Header from '../../components/header/Header';
import ConnectButtonGroup from '../../components/button-group/ButtonGroup';

export default function Main() {
    const menuItems = ['Inventory', 'Specials Offers', 'Order History'];

    return (
        <div>
            <Header menuItems={menuItems} />
            <ConnectButtonGroup />
            <div className='background-image'>
                Main
            </div>
        </div>
    )

}