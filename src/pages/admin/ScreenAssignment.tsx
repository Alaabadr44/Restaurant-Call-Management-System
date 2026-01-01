
import React from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ScreenAssignment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { screens, restaurants, updateScreen } = useAdmin();

    const screen = screens.find(s => s.id === id);

    if (!screen) {
        return (
            <AdminLayout>
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold text-red-600">Screen not found</h2>
                    <Button onClick={() => navigate('/admin/screens')} className="mt-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Screens
                    </Button>
                </div>
            </AdminLayout>
        );
    }

    const assignedRestaurantIds = screen.assignedRestaurants;

    const handleToggle = (restaurantId: string) => {
        let newAssigned: string[];
        if (assignedRestaurantIds.includes(restaurantId)) {
            newAssigned = assignedRestaurantIds.filter(id => id !== restaurantId);
        } else {
            newAssigned = [...assignedRestaurantIds, restaurantId];
        }
        updateScreen(screen.id, { assignedRestaurants: newAssigned });
    };

    const moveRestaurant = (restaurantId: string, direction: 'up' | 'down') => {
        const index = assignedRestaurantIds.indexOf(restaurantId);
        if (index === -1) return;

        const newAssigned = [...assignedRestaurantIds];
        if (direction === 'up' && index > 0) {
            [newAssigned[index], newAssigned[index - 1]] = [newAssigned[index - 1], newAssigned[index]];
        } else if (direction === 'down' && index < newAssigned.length - 1) {
            [newAssigned[index], newAssigned[index + 1]] = [newAssigned[index + 1], newAssigned[index]];
        }

        updateScreen(screen.id, { assignedRestaurants: newAssigned });
    };

    const availableRestaurants = restaurants;

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/admin/screens')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Manage Content</h1>
                        <p className="text-muted-foreground">{screen.name} ({screen.gridConfig.rows}x{screen.gridConfig.columns})</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Assigned Restaurants (Orderable) */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Display Order</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {assignedRestaurantIds.length === 0 ? (
                                <p className="text-muted-foreground italic">No restaurants assigned yet.</p>
                            ) : (
                                assignedRestaurantIds.map((id, index) => {
                                    const restaurant = restaurants.find(r => r.id === id);
                                    if (!restaurant) return null;
                                    return (
                                        <div key={id} className="flex items-center justify-between p-3 bg-secondary rounded-lg border">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline">{index + 1}</Badge>
                                                <span className="font-medium">{restaurant.nameEn}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    disabled={index === 0}
                                                    onClick={() => moveRestaurant(id, 'up')}
                                                >
                                                    <ArrowUp className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    disabled={index === assignedRestaurantIds.length - 1}
                                                    onClick={() => moveRestaurant(id, 'down')}
                                                >
                                                    <ArrowDown className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500"
                                                    onClick={() => handleToggle(id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </CardContent>
                    </Card>

                    {/* Available Restaurants (Toggle) */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Available Restaurants</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {availableRestaurants.map((restaurant) => {
                                    const isAssigned = assignedRestaurantIds.includes(restaurant.id);
                                    return (
                                        <div key={restaurant.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`r-${restaurant.id}`}
                                                checked={isAssigned}
                                                onCheckedChange={() => handleToggle(restaurant.id)}
                                            />
                                            <label
                                                htmlFor={`r-${restaurant.id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                                            >
                                                {restaurant.nameEn}
                                            </label>
                                            {isAssigned && <Badge variant="secondary" className="ml-auto">Assigned</Badge>}
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ScreenAssignment;
