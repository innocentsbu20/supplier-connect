import { jwtDecode } from 'jwt-decode';

const EXPIRED_TOKKEN = (token) => {
    if (!token) return true;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return true;
    }
};

const LOGOUT = () => {

    // Clear the persistent storage
    localStorage.removeItem('product-storage');
    localStorage.removeItem('user-storage');
};

const BASE_URL = 'http://localhost:5067';

export { LOGOUT, BASE_URL, EXPIRED_TOKKEN as VALID_TOKKEN };