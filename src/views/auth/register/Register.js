import React, { useState } from 'react';
import './../Index.scss';
import {
    Box, Paper, Typography, TextField,
    ToggleButton, ToggleButtonGroup, Button
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useUserStore } from '../../../store/Index';
import ImageLogo from '../../../components/svg-image/ImageLogo';

export default function Register() {
    const [state, setState] = useState({
        username: 'minnieT',
        type: 'Supplier',
        password: 'pass1@test',
        name: 'Thabiso',
        surname: 'Sikhahlane',
        id: 1234567891011,
        email: 'minniet@test.com',
        contact: '0123456789',
    });

    const { register, registerResponse } = useUserStore((state) => state);

    const handleChange = (event, newAlignment) => {
        setState({
            ...state,
            type: newAlignment
        });
    };

    const navigate = useNavigate();
    const handleRegister = () => {
        register(state)
        if (registerResponse) {
            navigate("/")
            console.log(registerResponse.isSuccsess, " ---- ", registerResponse.message)
        }
    }

    const { username, password, type, name, surname, id, email, contact } = state;

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
                >          <Paper elevation={9} className='content'  >
                        <Box justifyContent='center' alignItems='center'>
                            <ImageLogo />
                            <Typography variant='h3' ml={1} fontFamily='sans-serif' fontWeight='bold' component='h2'>
                                Register
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
                                <div style={{}}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        defaultValue={name}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="surname"
                                        label="Surname"
                                        defaultValue={surname}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        defaultValue={username}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="id"
                                        label="ID"
                                        defaultValue={id}

                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        defaultValue={email}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="contact"
                                        label="Contact"
                                        defaultValue={contact}


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
                                        type="password"
                                        autoComplete="current-password"
                                        defaultValue={password}
                                    />   <TextField
                                        id="outlined-password-input"
                                        label="Confirm Password"
                                        fullWidth
                                        // onChange={} TODO: HANDLE CONFIRM PASSWODN ENABLE REGISTER BUTTON
                                        type="password"
                                        autoComplete="current-password"
                                        defaultValue=""
                                    />
                                </div>
                            </Box>
                            <Box display='flex' px={6} py={1} justifyContent='flex-end' alignItems='center'>
                                <Button onClick={handleRegister} variant="outlined" color={'inherit'}>Register</Button>
                            </Box>
                            <Box display='flex' className='pointer' justifyContent='center' alignItems='center'>
                                <Typography onClick={() => navigate("/login")} variant='button' component='h2'>
                                    Sign into existing account
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </div >

        </div >

    )

}