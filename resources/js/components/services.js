import axios from 'axios';

export const login = async (email = '', pass = '') => {
    try {
        const response = await axios.post('http://localhost:8888/api/auth', {
            email,
            pass,
        });
        if(response.data.auth) return true;
        return false;
    } catch (error) {
        return error;
    }
}

export const isAuthenticated = () => login;