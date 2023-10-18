import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * HIT BACKEND Endpoints from the front end
 */

const baseURL = 'http://localhost:5067';
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Authorization': 'Windows Athentication'
}

/*
 * Products
 */
export async function getProductsAPI() {
    const products = await axios.get(baseURL + '/products', { headers }).then(res => res.data)
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    return products
}
export async function createProductAPI(product) {
    const products = await axios.get(baseURL + '/products/CreateProduct', product, { headers }).then(res => res.data)
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    return products
}

export async function createUserAPI(user) {
    console.log("Mnsn ", user)
    try {
        const response = await axios.post(baseURL + '/users/CreateUser', user, {
            headers
        });

        if (response.status === 200) {
            console.log('User created:', response.data);
            return response.data
        } else {
            console.error('User creation failed:', response.status, response.data);
            return response.status
        }

    } catch (error) {
        console.error('Network error:', error);
    }
}

/*
 *  Authenticate
 */
export async function Authenticate(userCredentials) {
    try {
        const res = await axios.post(baseURL + '/auth/authenticate', userCredentials, {
            headers
        });

        return res.data

    } catch (error) {
        console.error('Network error:', error);
    }
}

/*
 *  Category 
 */
export async function GetCategories() {
    const res = await axios.get(baseURL + '/categories', { headers }).then(res => res.data)
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    return res
}

