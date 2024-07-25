import React, { useState } from 'react';
import './../Index.scss';
import {
    Box, Paper, Typography, TextField,
    ToggleButton, ToggleButtonGroup, Button
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useUserStore } from '../../../store/Index';
import ImageLogo from '../../../components/svg-image/ImageLogo';
import { createUserAPI } from '../../../api/SupplierConnectAPI';
import _ from 'lodash';
import { encode } from 'base-64';

export default function Register() {
    const [state, setState] = useState({
        username: '',
        type: '',
        password: '',
        name: '',
        surname: '',
        idNumber: 0,
        email: '',
        contact: 0,
        confirmPassword: ''
    } /*{
        username: 'minnieT',
        type: 'Supplier',
        password: 'pass1@test',
        name: 'Thabiso',
        surname: 'Sikhahlane',
        idNumber: 1234567891011,
        email: 'minniet@test.com',
        contact: '0123456789',
    }*/);



    const { } = useUserStore((state) => state);

    const handleChange = (event, newAlignment) => {
        setState({
            ...state,
            type: newAlignment
        });
    };

    const navigate = useNavigate();

    const isValidForm = () => {
        console.log("first ", state)
        if (_.isEmpty(name)) {
            alert("Name is Required")
            return false
        } else if (_.isEmpty(surname)) {
            alert("Surname is Required")
            return false
        } else if (_.isEmpty(username)) {
            alert("Username is Required")
            return false
        } else if (_.isEmpty(idNumber)) {
            alert("Id is Required")
            return false
        } else if (_.isEmpty(email)) {
            alert("Email is Required")
            return false
        } else if (_.isEmpty(contact)) {
            alert("Contact is Required")
            return false
        } else if (_.isEmpty(type)) {
            alert("Type is Required")
            return false
        } else if (!_.isEqual(password, confirmPassword)) {
            alert("Confirm Password is not a Match")
            return false
        } else if (_.isEmpty(password)) {
            alert("Password is Required")
            return false
        } else if (_.isEmpty(confirmPassword)) {
            alert("Confirm Password is Required")
            return false
        }

        return true
    };
    const getCurrentDate = () => {
        return encode(new Date().toISOString());
    }

    const handleRegister = () => {
        if (isValidForm()) {
            createUserAPI({
                username,
                password,
                type,
                name,
                surname,
                idNumber,
                email,
                "location": "",
                "createTime": new Date().toISOString(),
                contact
            }).then(res => {
                if (res) {

                    navigate("/")
                } else {
                    // Handle Create Error
                }
            })
        }
        // if (registerResponse) {
        //     console.log(registerResponse.isSuccsess, " ---- ", registerResponse.message)
        // }
    }

    const { username, password, type, name, surname, idNumber, email, contact, confirmPassword } = state;

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
                                        // defautValue={name}
                                        onChange={(event) => setState({ ...state, name: event.target.value })}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="surname"
                                        label="Surname"
                                        // defautValue={surname}
                                        onChange={(event) => setState({ ...state, surname: event.target.value })}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        // defautValue={username}
                                        onChange={(event) => setState({ ...state, username: event.target.value })}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="id"
                                        label="ID"
                                        // defautValue={id}
                                        onChange={(event) => setState({ ...state, idNumber: event.target.value })}

                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        // defautValue={email}
                                        onChange={(event) => setState({ ...state, email: event.target.value })}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        id="contact"
                                        label="Contact"
                                        // defautValue={contact}
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
                                        <ToggleButton value="Both" disabled>Both</ToggleButton>
                                    </ToggleButtonGroup>
                                    <TextField
                                        id="outlined-password-input"
                                        label="Password"
                                        fullWidth
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={(event) => setState({ ...state, password: event.target.value })}
                                    // defautValue={password}
                                    />   <TextField
                                        id="outlined-password-input"
                                        label="Confirm Password"
                                        fullWidth
                                        // onChange={} TODO: HANDLE CONFIRM PASSWODN ENABLE REGISTER BUTTON
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={(event) => setState({ ...state, confirmPassword: event.target.value })}
                                    // defaultValue=""
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