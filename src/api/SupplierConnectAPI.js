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

export async function getProductsAPI() {
    const products = axios.get(baseURL + '/products', { headers }).then(res => res.data)
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    return products
}
