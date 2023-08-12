import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Header from '../../components/header/Header';
import ConnectButtonGroup from '../../components/button-group/ButtonGroup';
import ProductViewCard from '../../components/product-card/ProductCard';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import data from './../../constants/Index';
import IconButton from '@mui/material/IconButton';

export default function Main() {
    const menuItems = ['Inventory', 'Specials Offers', 'Order History'];
    const [state, setState] = useState({
        filter: "All Inventory",
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
            <Box sx={{
                mb: 3,
                display: 'flex',
                justifyContent: 'flex-end',
                paddingX: 25,
            }}>
                <Box sx={{ display: 'grid' }}>
                    <IconButton className="pointer" aria-label="add business">
                        <AddBusinessIcon sx={{ fontSize: 60 }} />
                    </IconButton>
                    Add Business
                </Box>
            </Box>
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