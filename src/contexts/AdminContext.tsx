import React, { createContext, useContext, useState, useEffect } from 'react';
import { Restaurant, Screen, mockRestaurants, mockScreens } from '../data/mockData';
import { toast } from 'sonner';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

interface AdminContextType {
    restaurants: Restaurant[];
    screens: Screen[];
    isLoading: boolean;
    addRestaurant: (restaurant: Omit<Restaurant, 'id'>) => Promise<void>;
    updateRestaurant: (id: string, updates: Partial<Restaurant>) => Promise<void>;
    deleteRestaurant: (id: string) => Promise<void>;
    addScreen: (screen: Omit<Screen, 'id'>) => void;
    updateScreen: (id: string, updates: Partial<Screen>) => void;
    deleteScreen: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [screens, setScreens] = useState<Screen[]>(() => {
        const saved = localStorage.getItem('screens');
        return saved ? JSON.parse(saved) : mockScreens;
    });
    const [isLoading, setIsLoading] = useState(false);

    // Fetch Restaurants from API
    const fetchRestaurants = async () => {
        if (!user?.token) return;
        setIsLoading(true);
        try {
            const data = await api.get('/restaurants', user.token);
            setRestaurants(data);
        } catch (error) {
            console.error("Failed to fetch restaurants", error);
            // Fallback to mock data if API fails (dev mode)
            setRestaurants(mockRestaurants);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user?.token) {
            fetchRestaurants();
        }
    }, [user?.token]);

    // Sync Screens to localStorage
    useEffect(() => {
        localStorage.setItem('screens', JSON.stringify(screens));
    }, [screens]);

    const addRestaurant = async (restaurant: Omit<Restaurant, 'id'>) => {
        try {
            if (user?.token) {
                const newRest = await api.post('/restaurants', restaurant, user.token);
                setRestaurants((prev) => [...prev, newRest]);
            } else {
                // Dev fallback
                const newRestaurant = { ...restaurant, id: Math.random().toString(36).substr(2, 9) };
                setRestaurants((prev) => [...prev, newRestaurant as Restaurant]);
            }
            toast.success('Restaurant added successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add restaurant');
        }
    };

    const updateRestaurant = async (id: string, updates: Partial<Restaurant>) => {
        try {
            if (user?.token) {
                const updated = await api.put(`/restaurants/${id}`, updates, user.token);
                setRestaurants((prev) =>
                    prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
                );
            } else {
                setRestaurants((prev) =>
                    prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
                );
            }
            toast.success('Restaurant updated successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update restaurant');
        }
    };

    const deleteRestaurant = async (id: string) => {
        try {
            if (user?.token) {
                await api.delete(`/restaurants/${id}`, user.token);
            }
            setRestaurants((prev) => prev.filter((r) => r.id !== id));
            toast.success('Restaurant deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete restaurant');
        }
    };

    const addScreen = (screen: Omit<Screen, 'id'>) => {
        const newScreen = { ...screen, id: Math.random().toString(36).substr(2, 9) };
        setScreens((prev) => [...prev, newScreen]);
        toast.success('Screen added successfully');
    };

    const updateScreen = (id: string, updates: Partial<Screen>) => {
        setScreens((prev) =>
            prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
        );
        toast.success('Screen updated successfully');
    };

    const deleteScreen = (id: string) => {
        setScreens((prev) => prev.filter((s) => s.id !== id));
        toast.success('Screen deleted successfully');
    };

    return (
        <AdminContext.Provider
            value={{
                restaurants,
                screens,
                isLoading,
                addRestaurant,
                updateRestaurant,
                deleteRestaurant,
                addScreen,
                updateScreen,
                deleteScreen,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};
