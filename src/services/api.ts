
const API_URL = 'http://localhost:3010/api';

export const api = {
    get: async (endpoint: string, token?: string) => {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers,
        });
        if (!response.ok) throw new Error('API Error');
        return response.json();
    },

    post: async (endpoint: string, data: any, token?: string) => {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'API Error');
        }
        return response.json();
    },

    put: async (endpoint: string, data: any, token?: string) => {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('API Error');
        return response.json();
    },

    delete: async (endpoint: string, token?: string) => {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers,
        });
        if (!response.ok) throw new Error('API Error');
        return response.json(); // Some delete endpoints might not return JSON, but assuming standard REST
    },
};
