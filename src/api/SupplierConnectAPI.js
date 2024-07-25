import axios from 'axios';

/**
 * HIT BACKEND Endpoints from the front end
 */

const baseURL = 'http://localhost:5067';
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
}

/*
 * Products
 */
export async function getProductsAPI(tkkn) {
    const authorizedHeaders = {
        ...headers,
        'Authorization': `Bearer ${tkkn}`
    }
    const res = await axios.get(baseURL + '/products/GetProducts', { headers: authorizedHeaders });
    try {
        console.log("res", res)
        return {
            status: res.status,
            products: res.data
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            status: error.response.status
        }
    }
}
export async function createProductAPI(tokkn, product) {
    const authedHeaders = {
        ...headers,
        'Authorization': `Bearer ${tokkn}`
    };

    const res = await axios.post(baseURL + '/products/CreateProduct', product, { headers: authedHeaders });
    try {
        console.log(" req ", product)
        return {
            status: res.status,
            product: res.data.data
        }
    } catch (error) {
        console.error('Error creating a product: ', error);
        return {
            status: error.response.status
        }
    };
}

export async function createUserAPI(user) {
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
        //console.log("Auth ", res)
        return {
            status: res.status,
            user: res.data.data
        }

    } catch (error) {
        console.log('Network error:', error);
        return {
            status: error.response.status
        }
    }
}

