import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Header from '../../components/header/Header';
import ConnectButtonGroup from '../../components/button-group/ButtonGroup';
import ProductViewCard from '../../components/product-card/ProductCard';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import IconButton from '@mui/material/IconButton';
import { useProductStore, useUserStore } from '../../store/Index';
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const menuItems = ['Inventory', 'Specials Offers', 'Order History'];
    const products = useProductStore((state) => state.products);
    const { loginResponse } = useUserStore(store => store);

    const [state, setState] = useState({
        filter: "All Inventory",
        products
    })
    const { filter } = state;
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
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Authorization': 'Windows Athentication'
    }
    const navigate = useNavigate();

    useEffect(() => {
        // console.log("log");
        // getUsers()
    }, [])

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