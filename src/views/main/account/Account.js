import React, { useState, useEffect } from 'react';
import Header from '../../../components/header/Header';
import './../Index.scss';
import {
    Box, Paper, Typography, TextField,
    ToggleButton, ToggleButtonGroup, Button
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import ImageLogo from '../../../components/svg-image/ImageLogo';
import { updateUserAPI, getUserDetailsAPI } from '../../../api/SupplierConnectAPI';
import _ from 'lodash';

export default function Account() {
    const [state, setState] = useState({
        username: '',
        type: '',
        password: '',
        email: '',
        contact: ''
    });

    const { username, password, type, email, contact } = state;

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details on component mount
        getUserDetailsAPI().then(res => {
            if (res) {
                setState({
                    username: res.username,
                    type: res.type,
                    password: '',
                    email: res.email,
                    contact: res.contact
                });
            }
        });
    }, []);

    const handleChange = (event, newAlignment) => {
        setState({
            ...state,
            type: newAlignment
        });
    };

    const isValidForm = () => {
        if (_.isEmpty(username)) {
            alert("Username is Required");
            return false;
        } else if (_.isEmpty(email)) {
            alert("Email is Required");
            return false;
        } else if (_.isEmpty(contact)) {
            alert("Contact is Required");
            return false;
        } else if (_.isEmpty(type)) {
            alert("Type is Required");
            return false;
        } else if (_.isEmpty(password)) {
            alert("Password is Required");
            return false;
        }

        return true;
    };

    const handleUpdate = () => {
        if (isValidForm()) {
            updateUserAPI({
                username,
                password,
                type,
                email,
                contact
            }).then(res => {
                if (res) {
                    alert("Update Successful");
                } else {
                    alert("Update Failed");
                }
            });
        }
    };

    return (
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
                >
                    <Paper elevation={9} className='content'>
                        <Box justifyContent='center' alignItems='center'>
                            <ImageLogo />
                            <Typography variant='h3' ml={1} fontFamily='sans-serif' fontWeight='bold' component='h2'>
                                Account Details
                            </Typography>
                        </Box>
                        <Box my={2}>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '80%' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <div>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        value={username}
                                        onChange={(event) => setState({ ...state, username: event.target.value })}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        value={email}
                                        onChange={(event) => setState({ ...state, email: event.target.value })}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="contact"
                                        label="Contact"
                                        value={contact}
                                        onChange={(event) => setState({ ...state, contact: event.target.value })}
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
                                    </ToggleButtonGroup>
                                    <TextField
                                        id="outlined-password-input"
                                        label="Password"
                                        fullWidth
                                        type="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(event) => setState({ ...state, password: event.target.value })}
                                    />
                                </div>
                            </Box>
                            <Box display='flex' px={6} py={1} justifyContent='flex-end' alignItems='center'>
                                <Button onClick={handleUpdate} variant="outlined" color={'inherit'}>Update</Button>
                            </Box>
                            <Box display='flex' className='pointer' justifyContent='center' alignItems='center'>
                                <Typography onClick={() => navigate("/dashboard")} variant='button' component='h2'>
                                    Back to Dashboard
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </div>
        </div>
    );
}
