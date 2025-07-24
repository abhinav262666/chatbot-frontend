import axios from 'axios';

const API_URL = 'http://localhost:5001';

export interface LoginCredentials {
    username: string;
    password: string;
}

export const authService = {
    login: async (credentials: LoginCredentials) => {
        const formData = new URLSearchParams();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);

        try {
            console.log('Attempting login with credentials:', credentials);
            console.log('Request URL:', `${API_URL}/auth/login`);
            console.log('Request payload:', formData.toString());
            
            const response = await axios.post(`${API_URL}/auth/login`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            
            console.log('Response received:', response.data.access_token);
            return response.data;
        } catch (error) {
            console.error('Detailed error information:');
            if (axios.isAxiosError(error)) {
                console.error('Request config:', error.config);
                console.error('Response status:', error.response?.status);
                console.error('Response headers:', error.response?.headers);
                console.error('Response data:', error.response?.data);
                console.error('Error message:', error.message);
            } else {
                console.error('Non-Axios error:', error);
            }
            throw error;
        }
    },
}; 