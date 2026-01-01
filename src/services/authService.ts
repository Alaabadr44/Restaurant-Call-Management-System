import { api } from './api';

export type Role = 'SUPER_ADMIN' | 'RESTAURANT' | 'SCREEN';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
  token?: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Try API login first
    try {
      const response = await api.post('/auth/login', { email, password });
      return {
        id: response.user?.id || 'id',
        email: response.user?.email || email,
        name: response.user?.name || 'User',
        role: response.user?.role || 'SUPER_ADMIN', // Defaulting for now if API structure varies
        token: response.token,
      };
    } catch (error) {
      console.log("API Login failed, trying mock fallback for dev...");
      // Fallback for development if API is unreachable (optional, but good for stability during dev)
      if (email === 'admin@example.com' && password === 'admin') {
        return {
          id: '1',
          email: 'admin@example.com',
          name: 'Super Admin',
          role: 'SUPER_ADMIN',
          token: 'mock-token-admin'
        };
      }
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    // Invalidate token if needed, or just clear client side
    return Promise.resolve();
  },
};
