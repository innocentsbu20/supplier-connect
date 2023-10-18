import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Header from '../../components/header/Header';
import ConnectButtonGroup from '../../components/button-group/ButtonGroup';
import ProductViewCard from '../../components/product-card/ProductCard';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import IconButton from '@mui/material/IconButton';
import { useProductStore, useUserStore } from '../../store/Index';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GetCategories, createProductAPI, getProductsAPI } from '../../api/SupplierConnectAPI';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function Main() {
    const menuItems = ['Inventory', 'Specials Offers', 'Order History',];
    const { products, setProducts } = useProductStore((state) => state);

    const { user } = useUserStore(store => store);
    const navigate = useNavigate();

    const [state, setState] = useState({
        filter: "All Inventory",
        products,
        isAddProduct: false,
        categories: [],
        picture: "",
        pName: "",
        category: "",
        description: "",
        price: 0,
        categoryId: "",
        stockQuantity: 0,
    })
    const { filter, isAddProduct } = state;
    const onChangeFilter = (fl) => {
        if (fl !== filter) {
            console.log("2", products[1].category)
            console.log("3", products[2].category)
            console.log("first4", products[3].category)
            console.log("5", products[0].category)
            setState({
                ...state,
                products: products.filter((product) => product.category === fl.toLowerCase())
            })
        } else {

            setState({
                filter,
                products
            })
        }
    }
    const handleOnAddProduct = () => {
        setState({
            ...state,
            isAddProduct: !state.isAddProduct
        })
    }
    const handleClose = () => setState({
        ...state,
        isAddProduct: false
    })
    const handleAdd = () => {
        const product = {
            userId: user.user.userId,
            categoryId: state.categoryId,
            picture: state.picture,
            pName: state.pName,
            category: state.category,
            description: state.description,
            price: state.price,
            stockQuantity: state.stockQuantity,
            isSpecial: false,
            user: user.user
        }
        console.log("first", product)
        createProductAPI(product)
    }
    useEffect(() => {
        getProductsAPI().then((res) => {

            setState(({
                ...state,
                products
            }))
            setProducts(res)
        })
        GetCategories().then(res => setState({ ...state, categories: res }))
    }, [])
    const handleChange = (cat) => {
        setState({ ...state, categoryId: cat.categoryId, category: cat.name })
    }
    const { categories } = state
    return (
        <div>
            <Header menuItems={menuItems} />
            <ConnectButtonGroup onChange={(flt) => onChangeFilter(flt)} />
            <Box sx={{
                mb: 3,
                display: 'flex',
                justifyContent: 'flex-end',
                paddingX: 25,
            }}>
                <Box sx={{ display: 'grid' }}>
                    <IconButton onClick={handleOnAddProduct} className="pointer" aria-label="add business">
                        <AddBusinessIcon sx={{ fontSize: 60 }} />
                    </IconButton>
                    Add Business
                </Box>
                <Box>
                    <Dialog open={isAddProduct} onClose={handleClose}>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please provide all required information
                            </DialogContentText>
                            <Box display={'flex'}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    onChange={(evt) => setState({ ...state, pName: evt.target.value })}
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box mx={1} />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="price"
                                    label="Price"
                                    onChange={(evt) => setState({ ...state, price: evt.target.value })}
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box mx={1} />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="stockQuantity"
                                    label="Quantity"
                                    onChange={(evt) => setState({ ...state, stockQuantity: evt.target.value })}
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <Box mx={1} />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="description"
                                label="Description"
                                onChange={(evt) => setState({ ...state, description: evt.target.value })}
                                type="text"
                                fullWidth
                                variant="outlined"
                            />
                            <Box display={'flex'}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="picture"
                                    label="Picture"
                                    onChange={(evt) => setState({ ...state, picture: evt.target.value })}
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                />

                                <Box mx={1} />
                                <FormControl style={{ marginTop: 7 }} fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Product Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={state.category}
                                        label="Category"
                                        onChange={(res) => handleChange(res.target.value)}
                                    >
                                        {
                                            categories.map(cat => <MenuItem value={cat} key={cat.categoryId}>{cat.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleAdd}>Add</Button>
                        </DialogActions>
                    </Dialog>
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
                        products.map((item) => <ProductViewCard key={item.productId} item={item} />)
                    }

                </Box>
            </div>
        </div>
    )

}