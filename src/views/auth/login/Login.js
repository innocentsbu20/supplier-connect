import React, { useState } from 'react';
import './../Index.scss';
import {
    Box, Paper, Typography, TextField,
    ToggleButton, ToggleButtonGroup, Button
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import ImageLogo from '../../../components/svg-image/ImageLogo';
import Header from '../../../components/header/Header';
import { useUserStore, useProductStore } from '../../../store/Index';
import { Authenticate, getProductsAPI } from '../../../api/SupplierConnectAPI';

export default function Login() {
    const [state, setState] = useState({
        email: 'john.doe@example.com',
        type: 'Supplier',
        password: 'password1',
        loginResponse: {
            error: false,
            message: ""
        }
    });
    const { login } = useUserStore((state) => state);
    const { setProducts } = useProductStore((state) => state);

    const handleChange = (event) => {
        setState({
            ...state,
            type: event.target.value
        });
    };
    const navigate = useNavigate();

    const { email, password, type, loginResponse } = state;
    const menuItems = ['Products', 'About Us', 'Contact/Support', 'Blog/News'];
    const handleLogin = async () => {

        await Authenticate({ email, password }).then(res => {

            if (res.status === 200) {
                const { user, tokken } = res.user;

                login({
                    ...user,
                    tokken,
                })

                setState({
                    ...state,
                    loginResponse: {
                        error: false,
                        message: ""
                    }
                })
                navigate("/")
            } else {
                console.log(" June ", res)
                setState({
                    ...state,
                    loginResponse: {
                        error: true,
                        message: res.status + ": Confirm if provided details are correct"
                    }
                })
            }
        })
    }

    return (
        <>
            <Header isLogin menuItems={menuItems} />
            <div className='auth'>
                <div className='login-form'>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 500,
                            },
                        }}
                    >          <Paper elevation={9} className='content'  >
                            <Box justifyContent='center' alignItems='center'>
                                <ImageLogo />
                                <Typography variant='h3' ml={1} fontFamily='sans-serif' fontWeight='bold' component='h2'>
                                    {
                                        "Login"
                                    }
                                </Typography>
                                {loginResponse.error && <Typography variant='h6' ml={1} color="red" fontFamily='sans-serif' fontWeight='bold' component='h2'>
                                    {
                                        loginResponse.message
                                    }
                                </Typography>}
                            </Box>
                            <Box my={3}>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '80%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div style={{}}>
                                        <TextField
                                            required
                                            fullWidth
                                            onChange={(event) => setState({
                                                ...state,
                                                email: event.target.value
                                            })}
                                            id="email"
                                            label="email"
                                            defaultValue={email}
                                        />
                                        <ToggleButtonGroup
                                            color="standard"
                                            value={type}
                                            exclusive
                                            onChange={handleChange}
                                            aria-label="Platform"
                                        >
                                            <ToggleButton value="Buyer">Buyer</ToggleButton>
                                            <ToggleButton value="Supplier">Supplier</ToggleButton>
                                            <ToggleButton value="Both" disabled>Both</ToggleButton>
                                        </ToggleButtonGroup>
                                        <TextField
                                            id="outlined-password-input"
                                            label="Password"
                                            fullWidth
                                            onChange={(event) => setState({
                                                ...state,
                                                password: event.target.value
                                            })}
                                            type="password"
                                            autoComplete="current-password"
                                            defaultValue={password}
                                        />
                                    </div>
                                </Box>
                                <Box display='flex' py={1} px={6} justifyContent='flex-end' alignItems='center'>
                                    <Typography onClick={() => navigate("/forgot")} className='pointer' variant='h6' component='h6'>
                                        forgot password?
                                    </Typography>
                                </Box>
                                <Box display='flex' px={6} justifyContent='flex-end' alignItems='center'>
                                    <Button onClick={() => handleLogin()} variant="outlined" color={'inherit'}>Login</Button>
                                </Box>
                                <Box display='flex' className='pointer' justifyContent='center' alignItems='center'>
                                    <Typography onClick={() => navigate("/register")} variant='button' component='h2'>
                                        create account
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </div >
            </div >
        </>
    )

}