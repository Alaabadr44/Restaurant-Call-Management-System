
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { useAdmin } from '@/contexts/AdminContext';
import { Restaurant } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const AdminRestaurants = () => {
    const { restaurants, addRestaurant, updateRestaurant, deleteRestaurant, isLoading } = useAdmin();
    const [isOpen, setIsOpen] = useState(false);
    const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<Partial<Restaurant>>({
        nameEn: '', nameAr: '', descriptionEn: '', descriptionAr: '',
        addressEn: '', addressAr: '', phone: '', hoursEn: '', hoursAr: '', status: 'available',
        logo: '', coverImage: '', menuImage: '',
        email: '', password: '', contactPhone: '', sipExtension: ''
    });

    const resetForm = () => {
        setFormData({
            nameEn: '', nameAr: '', descriptionEn: '', descriptionAr: '',
            addressEn: '', addressAr: '', phone: '', hoursEn: '', hoursAr: '', status: 'available',
            logo: '', coverImage: '', menuImage: '',
            email: '', password: '', contactPhone: '', sipExtension: ''
        });
        setEditingRestaurant(null);
    };

    const handleOpen = (restaurant?: Restaurant) => {
        if (restaurant) {
            setEditingRestaurant(restaurant);
            setFormData(restaurant);
        } else {
            resetForm();
        }
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingRestaurant) {
                await updateRestaurant(editingRestaurant.id, formData);
            } else {
                await addRestaurant(formData as Omit<Restaurant, 'id'>);
            }
            setIsOpen(false);
            resetForm();
        } catch (error) {
            // Error handled in context
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Restaurants</h1>
                    <Button onClick={() => handleOpen()} disabled={isLoading}>
                        <Plus className="mr-2 h-4 w-4" /> Add Restaurant
                    </Button>
                </div>

                <div className="bg-white rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>English Name</TableHead>
                                <TableHead>Arabic Name</TableHead>
                                <TableHead>Contact Phone</TableHead>
                                <TableHead>SIP Ext</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4">Loading...</TableCell>
                                </TableRow>
                            ) : restaurants.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">No restaurants found.</TableCell>
                                </TableRow>
                            ) : (
                                restaurants.map((restaurant) => (
                                    <TableRow key={restaurant.id}>
                                        <TableCell className="font-medium">{restaurant.nameEn}</TableCell>
                                        <TableCell className="font-medium text-right direction-rtl">{restaurant.nameAr}</TableCell>
                                        <TableCell>{restaurant.contactPhone || restaurant.phone}</TableCell>
                                        <TableCell>{restaurant.sipExtension}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${restaurant.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {restaurant.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleOpen(restaurant)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => deleteRestaurant(restaurant.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}</DialogTitle>
                            <DialogDescription>
                                Fill in the details for the restaurant below.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nameEn">English Name *</Label>
                                    <Input id="nameEn" required value={formData.nameEn} onChange={e => setFormData({ ...formData, nameEn: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nameAr">Arabic Name *</Label>
                                    <Input id="nameAr" required className="text-right" value={formData.nameAr} onChange={e => setFormData({ ...formData, nameAr: e.target.value })} />
                                </div>
                            </div>

                            {/* Login Credentials - Only for new restaurants or allowed to edit? Assuming edit allowed for now */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email (Login) *</Label>
                                    <Input id="email" type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password {editingRestaurant && '(Leave blank to keep)'}</Label>
                                    <Input id="password" type="password" required={!editingRestaurant} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contactPhone">Contact Phone *</Label>
                                    <Input id="contactPhone" required value={formData.contactPhone} onChange={e => setFormData({ ...formData, contactPhone: e.target.value })} placeholder="+966..." />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sipExtension">SIP Extension</Label>
                                    <Input id="sipExtension" value={formData.sipExtension} onChange={e => setFormData({ ...formData, sipExtension: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select
                                        id="status"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value as 'available' | 'busy' })}
                                    >
                                        <option value="available">Available</option>
                                        <option value="busy">Busy</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Display Phone</Label>
                                    <Input id="phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="descriptionEn">English Description</Label>
                                    <Input id="descriptionEn" value={formData.descriptionEn} onChange={e => setFormData({ ...formData, descriptionEn: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="descriptionAr">Arabic Description</Label>
                                    <Input id="descriptionAr" className="text-right" value={formData.descriptionAr} onChange={e => setFormData({ ...formData, descriptionAr: e.target.value })} />
                                </div>
                            </div>


                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="addressEn">English Address</Label>
                                    <Input id="addressEn" value={formData.addressEn} onChange={e => setFormData({ ...formData, addressEn: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="addressAr">Arabic Address</Label>
                                    <Input id="addressAr" className="text-right" value={formData.addressAr} onChange={e => setFormData({ ...formData, addressAr: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Images (URLs)</Label>
                                <Input placeholder="Logo URL" value={formData.logo} onChange={e => setFormData({ ...formData, logo: e.target.value })} className="mb-2" />
                                <Input placeholder="Cover Image URL" value={formData.coverImage} onChange={e => setFormData({ ...formData, coverImage: e.target.value })} className="mb-2" />
                                <Input placeholder="Menu Image URL" value={formData.menuImage} onChange={e => setFormData({ ...formData, menuImage: e.target.value })} />
                            </div>

                            <DialogFooter>
                                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : (editingRestaurant ? 'Update' : 'Add')} Restaurant</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
};

export default AdminRestaurants;
