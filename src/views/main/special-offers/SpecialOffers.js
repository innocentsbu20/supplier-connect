import React, { useEffect, useState } from 'react'
import Header from '../../../components/header/Header';
// import data from '../../../constants/Index';
import ConnectButtonGroup from '../../../components/button-group/ButtonGroup'
import { Box } from '@mui/material';
import ProductViewCard from '../../../components/product-card/ProductCard';
import { useProductStore } from '../../../store/Index';

export default function SpecialOffers() {

    const menuItems = ['Inventory', 'Specials Offers', 'Order History'];
    const { getItemsOnPromo } = useProductStore((state) => state);
    const promotionProducts = getItemsOnPromo();
    const [state, setState] = useState({
        filter: "All Inventory",
        products: promotionProducts
    })
    const { filter, products } = state;
    const onChangeFilter = (fl) => {
        if (fl !== filter) {

            setState({
                ...state,
                products: products.filter((product) => product.type === fl.toLowerCase())
            })
        } else {

            setState({
                filter,
                products
            })
        }
    }
    useEffect(() => {
        setState({
            ...state,
            products: promotionProducts
        })
    }, [promotionProducts, state])

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
