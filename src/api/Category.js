import axios from 'axios';
import { BASE_URL } from 'utils/Index';

/**
 * HIT BACKEND Endpoints from the front end
 */

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
}

/*
 *  Category 
 */
export async function getCategoriesAPI(tkkn) {
    const authedHeaders = {
        ...headers,
        'Authorization': `Bearer ${tkkn}`
    };

    try {
        const res = await axios.get(BASE_URL + '/category/getCategories', { headers: authedHeaders });
        console.log("res", res)
        if (res.status === 200) {
            return {
                status: res.status,
                categories: res.data.data
            }
        }
        return {
            categories: []
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        return {
            status: error.response.status
        }
    }
}

