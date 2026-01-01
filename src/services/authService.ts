export type Role = 'SUPER_ADMIN' | 'RESTAURANT' | 'SCREEN';

export interface User {
  id: string;
  username: string;
  role: Role;
  name: string;
}

// Mock users for different roles
const MOCK_USERS: Record<string, User> = {
  admin: {
    id: '1',
    username: 'admin',
    role: 'SUPER_ADMIN',
    name: 'Super Administrator',
  },
  restaurant: {
    id: '2',
    username: 'restaurant',
    role: 'RESTAURANT',
    name: 'Restaurant Manager',
  },
  screen: {
    id: '3',
    username: 'screen',
    role: 'SCREEN',
    name: 'Kitchen Screen',
  },
};

export const authService = {
  login: async (username: string): Promise<User> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = MOCK_USERS[username];
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  },

  logout: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
  },
};
