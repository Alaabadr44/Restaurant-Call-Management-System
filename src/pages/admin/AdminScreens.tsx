
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { useAdmin } from '@/contexts/AdminContext';
import { Screen } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminScreens = () => {
    const { screens, addScreen, updateScreen, deleteScreen } = useAdmin();
    const [isOpen, setIsOpen] = useState(false);
    const [editingScreen, setEditingScreen] = useState<Screen | null>(null);

    const [formData, setFormData] = useState<Omit<Screen, 'id' | 'assignedRestaurants'>>({
        name: '',
        gridConfig: { rows: 2, columns: 2 },
        showLanguage: 'both',
    });

    const resetForm = () => {
        setFormData({
            name: '',
            gridConfig: { rows: 2, columns: 2 },
            showLanguage: 'both',
        });
        setEditingScreen(null);
    };

    const handleOpen = (screen?: Screen) => {
        if (screen) {
            setEditingScreen(screen);
            setFormData({
                name: screen.name,
                gridConfig: screen.gridConfig,
                showLanguage: screen.showLanguage,
            });
        } else {
            resetForm();
        }
        setIsOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const screenData = {
            ...formData,
            assignedRestaurants: editingScreen ? editingScreen.assignedRestaurants : [],
        };

        if (editingScreen) {
            updateScreen(editingScreen.id, screenData);
        } else {
            addScreen(screenData as Omit<Screen, 'id'>);
        }
        setIsOpen(false);
        resetForm();
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Screens</h1>
                    <Button onClick={() => handleOpen()}>
                        <Plus className="mr-2 h-4 w-4" /> Add Screen
                    </Button>
                </div>

                <div className="bg-white rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Screen Name</TableHead>
                                <TableHead>Grid Layout</TableHead>
                                <TableHead>Language</TableHead>
                                <TableHead>Assigned Restaurants</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {screens.map((screen) => (
                                <TableRow key={screen.id}>
                                    <TableCell className="font-medium">{screen.name}</TableCell>
                                    <TableCell>{screen.gridConfig.rows} x {screen.gridConfig.columns}</TableCell>
                                    <TableCell>{screen.showLanguage}</TableCell>
                                    <TableCell>{screen.assignedRestaurants.length}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link to={`/admin/screens/${screen.id}`}>
                                                <Button variant="outline" size="sm">
                                                    <Settings className="mr-2 h-4 w-4" /> Manage Content
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" onClick={() => handleOpen(screen)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => deleteScreen(screen.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingScreen ? 'Edit Screen' : 'Add Screen'}</DialogTitle>
                            <DialogDescription>
                                Configure the screen settings below.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Screen Name</Label>
                                <Input id="name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="rows">Rows</Label>
                                    <Input
                                        id="rows"
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={formData.gridConfig.rows}
                                        onChange={e => setFormData({ ...formData, gridConfig: { ...formData.gridConfig, rows: parseInt(e.target.value) } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="columns">Columns</Label>
                                    <Input
                                        id="columns"
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={formData.gridConfig.columns}
                                        onChange={e => setFormData({ ...formData, gridConfig: { ...formData.gridConfig, columns: parseInt(e.target.value) } })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="language">Language Display</Label>
                                <select
                                    id="language"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.showLanguage}
                                    onChange={e => setFormData({ ...formData, showLanguage: e.target.value as 'en' | 'ar' | 'both' })}
                                >
                                    <option value="both">Both (Splitscreen/Toggle)</option>
                                    <option value="en">English Only</option>
                                    <option value="ar">Arabic Only</option>
                                </select>
                            </div>

                            <DialogFooter>
                                <Button type="submit">{editingScreen ? 'Update' : 'Add'} Screen</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
};

export default AdminScreens;
