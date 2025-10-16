// import React, { useEffect, useState } from 'react';
// import { useAdminCheck } from '@/hooks/useAdminCheck';
// import { supabase } from '@/integrations/supabase/client';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { useToast } from '@/hooks/use-toast';
// import { Plus, Trash2, Search, Edit, Filter } from 'lucide-react';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useAuth } from '@/contexts/AuthContext';

// interface Warehouse {
//   id: string;
//   name: string;
//   location: string;
//   description: string | null;
//   total_space_sqft: number;
//   available_space_sqft: number;
//   image_url: string | null;
//   features: string[] | null;
// }

// interface WarehouseWithStorage extends Warehouse {
//   storage_options?: {
//     storage_type: 'normal' | 'cold' | 'hot';
//   }[];
// }

// export const AdminWarehouses: React.FC = () => {
//   const { loading: authLoading } = useAdminCheck();
//   const { user } = useAuth();
//   const [warehouses, setWarehouses] = useState<WarehouseWithStorage[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [storageTypeFilter, setStorageTypeFilter] = useState<string>('all');
//   const [locationFilter, setLocationFilter] = useState<string>('all');
//   const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
//   const { toast } = useToast();

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     location: '',
//     total_space_sqft: '',
//     available_space_sqft: '',
//     image_url: '',
//     features: ''
//   });

//   useEffect(() => {
//     fetchWarehouses();
//   }, []);

//   const fetchWarehouses = async () => {
//     const { data, error } = await supabase
//       .from('warehouses')
//       .select(`
//         *,
//         storage_options:warehouse_storage_options(storage_type)
//       `)
//       .order('created_at', { ascending: false });

//     if (error) {
//       console.error('Error fetching warehouses:', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch warehouses',
//         variant: 'destructive'
//       });
//       return;
//     }

//     setWarehouses(data || []);
//   };

//   const handleAddWarehouse = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!user) {
//       toast({
//         title: 'Error',
//         description: 'You must be logged in to add warehouses',
//         variant: 'destructive'
//       });
//       return;
//     }

//     const totalSpace = parseInt(formData.total_space_sqft);
//     const availableSpace = parseInt(formData.available_space_sqft);

//     if (availableSpace > totalSpace) {
//       toast({
//         title: 'Error',
//         description: 'Available space cannot exceed total space',
//         variant: 'destructive'
//       });
//       return;
//     }

//     const features = formData.features
//       ? formData.features.split(',').map(f => f.trim()).filter(f => f)
//       : null;

//     const { error } = await supabase
//       .from('warehouses')
//       .insert({
//         name: formData.name,
//         description: formData.description || null,
//         location: formData.location,
//         total_space_sqft: totalSpace,
//         available_space_sqft: availableSpace,
//         image_url: formData.image_url || null,
//         features: features,
//         owner_id: user.id
//       });

//     if (error) {
//       console.error('Error adding warehouse:', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to add warehouse: ' + error.message,
//         variant: 'destructive'
//       });
//       return;
//     }

//     toast({
//       title: 'Success',
//       description: 'Warehouse added successfully'
//     });

//     setFormData({
//       name: '',
//       description: '',
//       location: '',
//       total_space_sqft: '',
//       available_space_sqft: '',
//       image_url: '',
//       features: ''
//     });
//     setIsAddDialogOpen(false);
//     fetchWarehouses();
//   };

//   const handleEditWarehouse = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!editingWarehouse) return;

//     const totalSpace = parseInt(formData.total_space_sqft);
//     const availableSpace = parseInt(formData.available_space_sqft);

//     if (availableSpace > totalSpace) {
//       toast({
//         title: 'Error',
//         description: 'Available space cannot exceed total space',
//         variant: 'destructive'
//       });
//       return;
//     }

//     const features = formData.features
//       ? formData.features.split(',').map(f => f.trim()).filter(f => f)
//       : null;

//     const { error } = await supabase
//       .from('warehouses')
//       .update({
//         name: formData.name,
//         description: formData.description || null,
//         location: formData.location,
//         total_space_sqft: totalSpace,
//         available_space_sqft: availableSpace,
//         image_url: formData.image_url || null,
//         features: features
//       })
//       .eq('id', editingWarehouse.id);

//     if (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to update warehouse: ' + error.message,
//         variant: 'destructive'
//       });
//       return;
//     }

//     toast({
//       title: 'Success',
//       description: 'Warehouse updated successfully'
//     });

//     setIsEditDialogOpen(false);
//     setEditingWarehouse(null);
//     fetchWarehouses();
//   };

//   const openEditDialog = (warehouse: Warehouse) => {
//     setEditingWarehouse(warehouse);
//     setFormData({
//       name: warehouse.name,
//       description: warehouse.description || '',
//       location: warehouse.location,
//       total_space_sqft: warehouse.total_space_sqft.toString(),
//       available_space_sqft: warehouse.available_space_sqft.toString(),
//       image_url: warehouse.image_url || '',
//       features: warehouse.features?.join(', ') || ''
//     });
//     setIsEditDialogOpen(true);
//   };

//   const deleteWarehouse = async (warehouseId: string) => {
//     if (!confirm('Are you sure you want to delete this warehouse?')) return;

//     const { error } = await supabase
//       .from('warehouses')
//       .delete()
//       .eq('id', warehouseId);

//     if (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to delete warehouse',
//         variant: 'destructive'
//       });
//       return;
//     }

//     toast({
//       title: 'Success',
//       description: 'Warehouse deleted successfully'
//     });

//     fetchWarehouses();
//   };

//   const getStorageType = (warehouse: WarehouseWithStorage): string => {
//     if (!warehouse.storage_options || warehouse.storage_options.length === 0) return 'N/A';
//     const types = [...new Set(warehouse.storage_options.map(opt => opt.storage_type))];
//     return types.join(', ');
//   };

//   const locations = [...new Set(warehouses.map(w => w.location))];

//   const filteredWarehouses = warehouses.filter(warehouse => {
//     const matchesSearch = 
//       warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       warehouse.location.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStorageType = storageTypeFilter === 'all' || 
//       (warehouse.storage_options && warehouse.storage_options.some(opt => opt.storage_type === storageTypeFilter));
    
//     const matchesLocation = locationFilter === 'all' || warehouse.location === locationFilter;
    
//     const matchesAvailability = availabilityFilter === 'all' ||
//       (availabilityFilter === 'available' && warehouse.available_space_sqft > 0) ||
//       (availabilityFilter === 'full' && warehouse.available_space_sqft === 0);
    
//     return matchesSearch && matchesStorageType && matchesLocation && matchesAvailability;
//   });

//   if (authLoading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-4xl font-bold mb-2">Manage Warehouses</h1>
//           <p className="text-muted-foreground">View and manage all warehouses ({warehouses.length} total)</p>
//         </div>
        
//         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Add Warehouse
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>Add New Warehouse</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleAddWarehouse} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Warehouse Name *</Label>
//                   <Input
//                     id="name"
//                     required
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="e.g., Cold Storage Facility"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="location">Location *</Label>
//                   <Input
//                     id="location"
//                     required
//                     value={formData.location}
//                     onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                     placeholder="e.g., Punjab, Ludhiana"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   placeholder="Detailed description of the warehouse"
//                   rows={3}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="total_space">Total Space (sqft) *</Label>
//                   <Input
//                     id="total_space"
//                     type="number"
//                     required
//                     min="0"
//                     value={formData.total_space_sqft}
//                     onChange={(e) => setFormData({ ...formData, total_space_sqft: e.target.value })}
//                     placeholder="10000"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="available_space">Available Space (sqft) *</Label>
//                   <Input
//                     id="available_space"
//                     type="number"
//                     required
//                     min="0"
//                     value={formData.available_space_sqft}
//                     onChange={(e) => setFormData({ ...formData, available_space_sqft: e.target.value })}
//                     placeholder="10000"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="image_url">Image URL</Label>
//                 <Input
//                   id="image_url"
//                   type="url"
//                   value={formData.image_url}
//                   onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
//                   placeholder="https://example.com/warehouse.jpg"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="features">Features (comma-separated)</Label>
//                 <Input
//                   id="features"
//                   value={formData.features}
//                   onChange={(e) => setFormData({ ...formData, features: e.target.value })}
//                   placeholder="e.g., Temperature Control, 24/7 Security, CCTV"
//                 />
//               </div>

//               <div className="flex gap-3 pt-4">
//                 <Button type="submit" className="flex-1">Add Warehouse</Button>
//                 <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>

//         {/* Edit Warehouse Dialog */}
//         <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//           <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>Edit Warehouse</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleEditWarehouse} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-name">Warehouse Name *</Label>
//                   <Input
//                     id="edit-name"
//                     required
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="e.g., Cold Storage Facility"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-location">Location *</Label>
//                   <Input
//                     id="edit-location"
//                     required
//                     value={formData.location}
//                     onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                     placeholder="e.g., Punjab, Ludhiana"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="edit-description">Description</Label>
//                 <Textarea
//                   id="edit-description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   placeholder="Detailed description of the warehouse"
//                   rows={3}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-total_space">Total Space (sqft) *</Label>
//                   <Input
//                     id="edit-total_space"
//                     type="number"
//                     required
//                     min="0"
//                     value={formData.total_space_sqft}
//                     onChange={(e) => setFormData({ ...formData, total_space_sqft: e.target.value })}
//                     placeholder="10000"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-available_space">Available Space (sqft) *</Label>
//                   <Input
//                     id="edit-available_space"
//                     type="number"
//                     required
//                     min="0"
//                     value={formData.available_space_sqft}
//                     onChange={(e) => setFormData({ ...formData, available_space_sqft: e.target.value })}
//                     placeholder="10000"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="edit-image_url">Image URL</Label>
//                 <Input
//                   id="edit-image_url"
//                   type="url"
//                   value={formData.image_url}
//                   onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
//                   placeholder="https://example.com/warehouse.jpg"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="edit-features">Features (comma-separated)</Label>
//                 <Input
//                   id="edit-features"
//                   value={formData.features}
//                   onChange={(e) => setFormData({ ...formData, features: e.target.value })}
//                   placeholder="e.g., Temperature Control, 24/7 Security, CCTV"
//                 />
//               </div>

//               <div className="flex gap-3 pt-4">
//                 <Button type="submit" className="flex-1">Update Warehouse</Button>
//                 <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="space-y-4">
//         <div className="flex items-center gap-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search warehouses..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4">
//           <div className="w-48">
//             <Select value={storageTypeFilter} onValueChange={setStorageTypeFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Storage Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Storage Types</SelectItem>
//                 <SelectItem value="normal">Normal</SelectItem>
//                 <SelectItem value="cold">Cold</SelectItem>
//                 <SelectItem value="hot">Hot</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="w-48">
//             <Select value={locationFilter} onValueChange={setLocationFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Location" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Locations</SelectItem>
//                 {locations.map(location => (
//                   <SelectItem key={location} value={location}>{location}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="w-48">
//             <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Availability" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All</SelectItem>
//                 <SelectItem value="available">Available Space</SelectItem>
//                 <SelectItem value="full">Full</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {filteredWarehouses.length === 0 ? (
//         <div className="text-center py-12 border rounded-lg">
//           <p className="text-muted-foreground text-lg">No warehouses found. Add your first warehouse!</p>
//         </div>
//       ) : (
//         <div className="border rounded-lg">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Image</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Location</TableHead>
//                 <TableHead>Total Space (sqft)</TableHead>
//                 <TableHead>Available Space (sqft)</TableHead>
//                 <TableHead>Storage Type</TableHead>
//                 <TableHead>Features</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredWarehouses.map((warehouse) => (
//                 <TableRow key={warehouse.id}>
//                   <TableCell>
//                     <img
//                       src={warehouse.image_url || '/placeholder.svg'}
//                       alt={warehouse.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   </TableCell>
//                   <TableCell className="font-medium">{warehouse.name}</TableCell>
//                   <TableCell>{warehouse.location}</TableCell>
//                   <TableCell>{warehouse.total_space_sqft.toLocaleString('en-IN')}</TableCell>
//                   <TableCell>{warehouse.available_space_sqft.toLocaleString('en-IN')}</TableCell>
//                   <TableCell>
//                     <span className="text-sm capitalize">{getStorageType(warehouse)}</span>
//                   </TableCell>
//                   <TableCell>
//                     <div className="text-sm">
//                       {warehouse.features && warehouse.features.length > 0
//                         ? warehouse.features.slice(0, 2).join(', ')
//                         : 'N/A'}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex gap-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => openEditDialog(warehouse)}
//                       >
//                         <Edit className="h-4 w-4 text-primary" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => deleteWarehouse(warehouse.id)}
//                       >
//                         <Trash2 className="h-4 w-4 text-red-500" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       )}
//     </div>
//   );
// };
































import React, { useEffect, useState } from 'react';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch'; // <--- Import Switch
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Search, Edit, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';

interface Warehouse {
  id: string;
  name: string;
  location: string;
  description: string | null;
  total_space_sqft: number;
  available_space_sqft: number;
  image_url: string | null;
  features: string[] | null;
  availability: boolean; // <--- ADDED: availability field
}

interface WarehouseWithStorage extends Warehouse {
  storage_options?: {
    storage_type: 'normal' | 'cold' | 'hot';
  }[];
}

export const AdminWarehouses: React.FC = () => {
  const { loading: authLoading } = useAdminCheck();
  const { user } = useAuth();
  const [warehouses, setWarehouses] = useState<WarehouseWithStorage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [storageTypeFilter, setStorageTypeFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    total_space_sqft: '',
    available_space_sqft: '',
    image_url: '',
    features: ''
  });

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    const { data, error } = await supabase
      .from('warehouses')
      .select(`
        *,
        storage_options:warehouse_storage_options(storage_type)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching warehouses:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch warehouses',
        variant: 'destructive'
      });
      return;
    }

    setWarehouses(data || []);
  };

  const handleAddWarehouse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to add warehouses',
        variant: 'destructive'
      });
      return;
    }

    const totalSpace = parseInt(formData.total_space_sqft);
    const availableSpace = parseInt(formData.available_space_sqft);

    if (availableSpace > totalSpace) {
      toast({
        title: 'Error',
        description: 'Available space cannot exceed total space',
        variant: 'destructive'
      });
      return;
    }

    const features = formData.features
      ? formData.features.split(',').map(f => f.trim()).filter(f => f)
      : null;

    const { error } = await supabase
      .from('warehouses')
      .insert({
        name: formData.name,
        description: formData.description || null,
        location: formData.location,
        total_space_sqft: totalSpace,
        available_space_sqft: availableSpace,
        image_url: formData.image_url || null,
        features: features,
        owner_id: user.id
      });

    if (error) {
      console.error('Error adding warehouse:', error);
      toast({
        title: 'Error',
        description: 'Failed to add warehouse: ' + error.message,
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Warehouse added successfully'
    });

    setFormData({
      name: '',
      description: '',
      location: '',
      total_space_sqft: '',
      available_space_sqft: '',
      image_url: '',
      features: ''
    });
    setIsAddDialogOpen(false);
    fetchWarehouses();
  };

  const handleEditWarehouse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingWarehouse) return;

    const totalSpace = parseInt(formData.total_space_sqft);
    const availableSpace = parseInt(formData.available_space_sqft);

    if (availableSpace > totalSpace) {
      toast({
        title: 'Error',
        description: 'Available space cannot exceed total space',
        variant: 'destructive'
      });
      return;
    }

    const features = formData.features
      ? formData.features.split(',').map(f => f.trim()).filter(f => f)
      : null;

    const { error } = await supabase
      .from('warehouses')
      .update({
        name: formData.name,
        description: formData.description || null,
        location: formData.location,
        total_space_sqft: totalSpace,
        available_space_sqft: availableSpace,
        image_url: formData.image_url || null,
        features: features
      })
      .eq('id', editingWarehouse.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update warehouse: ' + error.message,
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Warehouse updated successfully'
    });

    setIsEditDialogOpen(false);
    setEditingWarehouse(null);
    fetchWarehouses();
  };

  const openEditDialog = (warehouse: Warehouse) => {
    setEditingWarehouse(warehouse);
    setFormData({
      name: warehouse.name,
      description: warehouse.description || '',
      location: warehouse.location,
      total_space_sqft: warehouse.total_space_sqft.toString(),
      available_space_sqft: warehouse.available_space_sqft.toString(),
      image_url: warehouse.image_url || '',
      features: warehouse.features?.join(', ') || ''
    });
    setIsEditDialogOpen(true);
  };

  // <--- ADDED: toggleAvailability function
  const toggleAvailability = async (warehouseId: string, currentAvailability: boolean) => {
    const { error } = await supabase
      .from('warehouses')
      .update({ availability: !currentAvailability })
      .eq('id', warehouseId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update availability',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Warehouse availability updated'
    });

    fetchWarehouses();
  };
  // ADDED: toggleAvailability function --->

  const deleteWarehouse = async (warehouseId: string) => {
    if (!confirm('Are you sure you want to delete this warehouse?')) return;

    const { error } = await supabase
      .from('warehouses')
      .delete()
      .eq('id', warehouseId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete warehouse',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Warehouse deleted successfully'
    });

    fetchWarehouses();
  };

  const getStorageType = (warehouse: WarehouseWithStorage): string => {
    if (!warehouse.storage_options || warehouse.storage_options.length === 0) return 'N/A';
    const types = [...new Set(warehouse.storage_options.map(opt => opt.storage_type))];
    return types.join(', ');
  };

  const locations = [...new Set(warehouses.map(w => w.location))];

  const filteredWarehouses = warehouses.filter(warehouse => {
    const matchesSearch = 
      warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStorageType = storageTypeFilter === 'all' || 
      (warehouse.storage_options && warehouse.storage_options.some(opt => opt.storage_type === storageTypeFilter));
    
    const matchesLocation = locationFilter === 'all' || warehouse.location === locationFilter;
    
    const matchesAvailability = availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && warehouse.available_space_sqft > 0) ||
      (availabilityFilter === 'full' && warehouse.available_space_sqft === 0);
    
    return matchesSearch && matchesStorageType && matchesLocation && matchesAvailability;
  });

  if (authLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Manage Warehouses</h1>
          <p className="text-muted-foreground">View and manage all warehouses ({warehouses.length} total)</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Warehouse
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Warehouse</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddWarehouse} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Warehouse Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Cold Storage Facility"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Punjab, Ludhiana"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the warehouse"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total_space">Total Space (sqft) *</Label>
                  <Input
                    id="total_space"
                    type="number"
                    required
                    min="0"
                    value={formData.total_space_sqft}
                    onChange={(e) => setFormData({ ...formData, total_space_sqft: e.target.value })}
                    placeholder="10000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="available_space">Available Space (sqft) *</Label>
                  <Input
                    id="available_space"
                    type="number"
                    required
                    min="0"
                    value={formData.available_space_sqft}
                    onChange={(e) => setFormData({ ...formData, available_space_sqft: e.target.value })}
                    placeholder="10000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/warehouse.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Input
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="e.g., Temperature Control, 24/7 Security, CCTV"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">Add Warehouse</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Warehouse Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Warehouse</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditWarehouse} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Warehouse Name *</Label>
                  <Input
                    id="edit-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Cold Storage Facility"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location *</Label>
                  <Input
                    id="edit-location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Punjab, Ludhiana"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the warehouse"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-total_space">Total Space (sqft) *</Label>
                  <Input
                    id="edit-total_space"
                    type="number"
                    required
                    min="0"
                    value={formData.total_space_sqft}
                    onChange={(e) => setFormData({ ...formData, total_space_sqft: e.target.value })}
                    placeholder="10000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-available_space">Available Space (sqft) *</Label>
                  <Input
                    id="edit-available_space"
                    type="number"
                    required
                    min="0"
                    value={formData.available_space_sqft}
                    onChange={(e) => setFormData({ ...formData, available_space_sqft: e.target.value })}
                    placeholder="10000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-image_url">Image URL</Label>
                <Input
                  id="edit-image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/warehouse.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-features">Features (comma-separated)</Label>
                <Input
                  id="edit-features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="e.g., Temperature Control, 24/7 Security, CCTV"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">Update Warehouse</Button>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search warehouses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="w-48">
            <Select value={storageTypeFilter} onValueChange={setStorageTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Storage Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Storage Types</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="cold">Cold</SelectItem>
                <SelectItem value="hot">Hot</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-48">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-48">
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available Space</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredWarehouses.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground text-lg">No warehouses found. Add your first warehouse!</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Total Space (sqft)</TableHead>
                <TableHead>Available Space (sqft)</TableHead>
                <TableHead>Storage Type</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Available</TableHead> {/* <--- ADDED Table Head */}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWarehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell>
                    <img
                      src={warehouse.image_url || '/placeholder.svg'}
                      alt={warehouse.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{warehouse.name}</TableCell>
                  <TableCell>{warehouse.location}</TableCell>
                  <TableCell>{warehouse.total_space_sqft.toLocaleString('en-IN')}</TableCell>
                  <TableCell>{warehouse.available_space_sqft.toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <span className="text-sm capitalize">{getStorageType(warehouse)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {warehouse.features && warehouse.features.length > 0
                        ? warehouse.features.slice(0, 2).join(', ')
                        : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={warehouse.availability}
                      onCheckedChange={() => toggleAvailability(warehouse.id, warehouse.availability)}
                    />
                  </TableCell> {/* <--- ADDED Table Cell with Switch */}
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(warehouse)}
                      >
                        <Edit className="h-4 w-4 text-primary" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteWarehouse(warehouse.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};