
import React, { useState } from 'react';
import './../Index.scss';
import {
    Box, Paper, Typography, TextField,
    ToggleButton, ToggleButtonGroup, Button
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useUserStore } from '../../../store/Index';
import ImageLogo from '../../../components/svg-image/ImageLogo';

const ForgotPassword = () => {
    const [state, setState] = useState({
        contact: '0123456789',
        newPassword: 'pass1@test',
        confirmPassword: 'pass1@test',

    });
    const { resetPassword, resetResponse } = useUserStore((state) => state);

    const handleChange = (event, newAlignment) => {
        setState({
            ...state,
            type: newAlignment
        });
    };

    const navigate = useNavigate();
    const handleForgotPassword = () => {
        /*resetPassword(state)
        if (resetResponse) {
            navigate("/")
            console.log(state)
        }*/
        navigate("/")
        console.log(state)
    }

    const { contact, newPassword, confirmPassword } = state;

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
                                Forgot Password
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
                                        id="contact"
                                        label="Contact"
                                        defaultValue={contact}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="newPassword"
                                        label="New Password"
                                        defaultValue={newPassword}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="confirmPassword"
                                        label="Confirm Password"
                                        defaultValue={confirmPassword}
                                    />
                                </div>
                            </Box>
                            <Box display='flex' px={6} py={1} justifyContent='flex-end' alignItems='center'>
                                <Button onClick={handleForgotPassword} variant="outlined" color={'inherit'}>Confirm</Button>
                            </Box>
                            <Box display='flex' className='pointer' justifyContent='center' alignItems='center'>
                                <Typography onClick={() => navigate("/login")} variant='button' component='h2'>
                                    Sign into existing account
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </div>
        </div>
    )
}

export default ForgotPassword;
