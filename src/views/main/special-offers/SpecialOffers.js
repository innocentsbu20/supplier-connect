import React, { useState } from 'react'
import Header from '../../../components/header/Header';
import data from '../../../constants/Index';
import ConnectButtonGroup from '../../../components/button-group/ButtonGroup'
import { Box } from '@mui/material';
import ProductViewCard from '../../../components/product-card/ProductCard';
export default function SpecialOffers() {
    
    const menuItems = ['Inventory', 'Specials Offers', 'Order History'];
       const [state, setState] = useState({
        filter: "All Offers",
        products: data
    })
    const { filter, products } = state;
    const onChangeFilter = (fl) => {
        if (fl !== filter) {

            setState({
                ...state,
                products: data.filter((product) => product.type === fl.toLowerCase())
            })
        } else {

            setState({
                filter,
                products: data
            })
        }
    }

    return (
        <div>
            
            <Header menuItems={menuItems} />
             <ConnectButtonGroup onChange={onChangeFilter} />
            Special Offers
                <div className='main background-image' >
                <Box sx={{
                    opacity: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 500,
                    },
                }}>
                    {
                        products.map((item) => <ProductViewCard key={item._id} item={item} />)
                    }

                </Box>
            </div>
                    
                
            </div>
        
    )
}
