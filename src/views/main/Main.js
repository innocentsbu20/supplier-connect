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
import { getProductsAPI, createProductAPI } from '../../api/SupplierConnectAPI';
import { getCategoriesAPI } from 'api/Category'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function Main() {
    const menuItems = ['Inventory', 'Specials Offers', 'Order History',];
    const { setProducts, getProducts, getCategories, setCategories } = useProductStore((state) => state);

    const user = useUserStore(store => store.user);
    const navigate = useNavigate();

    const [state, setState] = useState({
        products: getProducts(),
        isAddProduct: false,
        categories: getCategories(),
        picture: "",
        name: "",
        category: "",
        description: "",
        price: 0,
        categoryId: "",
        stockQuantity: 0,
    })

    const { categories, products, isAddProduct, category, categoryId } = state
    const onChangeFilter = (fl) => {

        if (fl > 0) {
            setState({
                ...state,
                products: getProducts().filter((product) => product.categoryId === _.parseInt(fl))
            })
        } else {
            setState({
                ...state,
                products: getProducts()
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
    const handleAdd = async () => {

        const product = {
            Picture: state.picture,
            Name: state.name,
            CategoryId: state.categoryId,
            Category: null,
            Description: state.description,
            IsSpecial: false,
            Price: state.price,
            StockQuantity: state.stockQuantity,
            DateAdded: new Date(),
            UserId: user.userId,
            User: {
                balance: user.balance,
                contact: user.contact,
                email: user.email,
                name: user.name,
                orders: [
                ],
                password: user.password,
                ratings: user.ratings,
                said: user.said,
                surname: user.surname,
                type: user.type,
                cart: null,
                userProducts: [
                ]
            },
            OrderItems: [],
            UserProducts: [],
            Carts: []
        }

        await createProductAPI(user.tokken, product).then(res => {
            if (res.status === 200) {
                const newProds = [
                    ...getProducts(),
                    res.product
                ];
                console.log("newProds", newProds);
                setProducts(newProds);
                setState({
                    ...state,
                    products: newProds
                });
                handleClose();
            }
        })
    }

    const isExpired = (statusCode) => {

        if (statusCode === 401) {
            navigate("/login");
        }
    }
    useEffect(() => {
        if (_.isEmpty(getCategories())) {
            getCategoriesAPI(user.tokken).then(res => {
                console.log("res--- ", res)
                if (isExpired(res.status)) {
                    return;

                }
                if (res.status === 200) {
                    setCategories(res.categories)
                    setState(({
                        ...state,
                        categories: res.categories
                    }))
                }
            })
        }

        getProductsAPI(user.tokken).then((res) => {
            if (res.status === 200) {
                res.products.map(p =>
                    p.category = {
                        categoryId: categories[p.categoryId - 1].categoryId,
                        name: categories[p.categoryId - 1].name
                    }
                )
                setProducts(res.products);
                setState(({
                    ...state,
                    products: res.products
                }))
            }
        });

    }, [categories])

    const handleChange = (cat) => {
        setState({ ...state, categoryId: cat.target.value, category: categories[cat.target.value - 1].name })
    }

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
                                    onChange={(evt) => setState({ ...state, name: evt.target.value })}
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
                                        name={category}
                                        value={categoryId}
                                        label="Category"
                                        onChange={(res) => handleChange(res)}
                                    >
                                        {
                                            categories.map(cat => <MenuItem value={cat.categoryId} key={cat.categoryId}>{cat.name}</MenuItem>)
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
                        products.slice().reverse().map((item, index) => <ProductViewCard key={item.productId} item={{ ...item, index }} />)
                    }

                </Box>
            </div>
        </div>
    )

}