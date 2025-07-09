import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  MapPin, Home, Mail, Edit, Plus, Clock, User, Check, X,
  Building, Navigation, Phone, Globe, Calendar, History
} from 'lucide-react';

interface Address {
  id: string;
  type: 'Physical' | 'Postal';
  streetNo: string;
  streetName: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  delivery: string;
  activeFrom: string;
  activeTo?: string;
  modifiedBy: string;
  modifiedOn: string;
  isActive: boolean;
  isPrimary: boolean;
}

export const AddressManagementSystem: React.FC = () => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState('+27821234567');
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'ADDR001',
      type: 'Physical',
      streetNo: '123',
      streetName: 'Main Street',
      suburb: 'Sandton',
      city: 'Johannesburg',
      province: 'Gauteng',
      postalCode: '2196',
      delivery: 'Standard',
      activeFrom: '2024-01-15',
      modifiedBy: 'Thabo Mthembu',
      modifiedOn: '2024-01-15 10:30:00',
      isActive: true,
      isPrimary: true
    },
    {
      id: 'ADDR002',
      type: 'Postal',
      streetNo: 'PO Box 456',
      streetName: 'Central Post Office',
      suburb: 'Rosebank',
      city: 'Johannesburg',
      province: 'Gauteng',
      postalCode: '2132',
      delivery: 'Express',
      activeFrom: '2024-02-01',
      activeTo: '2024-12-31',
      modifiedBy: 'System',
      modifiedOn: '2024-02-01 14:20:00',
      isActive: true,
      isPrimary: false
    },
    {
      id: 'ADDR003',
      type: 'Physical',
      streetNo: '789',
      streetName: 'Oak Avenue',
      suburb: 'Midrand',
      city: 'Johannesburg',
      province: 'Gauteng',
      postalCode: '1685',
      delivery: 'Standard',
      activeFrom: '2023-06-15',
      activeTo: '2024-01-14',
      modifiedBy: 'Admin User',
      modifiedOn: '2023-06-15 09:15:00',
      isActive: false,
      isPrimary: false
    }
  ]);

  const [addressHistory] = useState([
    {
      id: 'HIST001',
      action: 'Created',
      addressId: 'ADDR001',
      details: 'Physical address created',
      modifiedBy: 'Thabo Mthembu',
      timestamp: '2024-01-15 10:30:00'
    },
    {
      id: 'HIST002',
      action: 'Updated',
      addressId: 'ADDR001',
      details: 'Postal code changed from 2195 to 2196',
      modifiedBy: 'System Admin',
      timestamp: '2024-03-20 15:45:00'
    },
    {
      id: 'HIST003',
      action: 'Deactivated',
      addressId: 'ADDR003',
      details: 'Address marked as inactive',
      modifiedBy: 'Admin User',
      timestamp: '2024-01-14 16:00:00'
    }
  ]);

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  const deliveryOptions = ['Standard', 'Express', 'Registered', 'Priority'];

  const handleSaveAddress = (addressData: Partial<Address>) => {
    if (editingAddress) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id 
          ? { ...addr, ...addressData, modifiedOn: new Date().toISOString() }
          : addr
      ));
      toast({
        title: "Address Updated",
        description: "Address has been successfully updated.",
      });
    } else {
      // Create new address
      const newAddress: Address = {
        id: `ADDR${String(addresses.length + 1).padStart(3, '0')}`,
        type: addressData.type || 'Physical',
        streetNo: addressData.streetNo || '',
        streetName: addressData.streetName || '',
        suburb: addressData.suburb || '',
        city: addressData.city || '',
        province: addressData.province || '',
        postalCode: addressData.postalCode || '',
        delivery: addressData.delivery || 'Standard',
        activeFrom: new Date().toISOString().split('T')[0],
        modifiedBy: 'Current User',
        modifiedOn: new Date().toISOString(),
        isActive: true,
        isPrimary: addresses.filter(a => a.isActive).length === 0
      };
      
      setAddresses(prev => [...prev, newAddress]);
      toast({
        title: "Address Created",
        description: "New address has been successfully created.",
      });
    }

    setEditingAddress(null);
    setShowAddForm(false);
  };

  const handleSetPrimary = (addressId: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isPrimary: addr.id === addressId
    })));
    
    toast({
      title: "Primary Address Updated",
      description: "Primary address has been successfully updated.",
    });
  };

  const handleDeactivateAddress = (addressId: string) => {
    setAddresses(prev => prev.map(addr => 
      addr.id === addressId 
        ? { ...addr, isActive: false, activeTo: new Date().toISOString().split('T')[0] }
        : addr
    ));
    
    toast({
      title: "Address Deactivated",
      description: "Address has been deactivated.",
    });
  };

  const AddressForm: React.FC<{ address?: Address; onSave: (data: Partial<Address>) => void; onCancel: () => void }> = ({ 
    address, onSave, onCancel 
  }) => {
    const [formData, setFormData] = useState<Partial<Address>>(address || {
      type: 'Physical',
      delivery: 'Standard'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {address ? 'Edit Address' : 'Create New Address'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Address Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value as 'Physical' | 'Postal'})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Physical">Physical</SelectItem>
                    <SelectItem value="Postal">Postal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="delivery">Delivery Method</Label>
                <Select value={formData.delivery} onValueChange={(value) => setFormData({...formData, delivery: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {deliveryOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="streetNo">Street No/Unit</Label>
                <Input
                  id="streetNo"
                  value={formData.streetNo || ''}
                  onChange={(e) => setFormData({...formData, streetNo: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="streetName">Street Name</Label>
                <Input
                  id="streetName"
                  value={formData.streetName || ''}
                  onChange={(e) => setFormData({...formData, streetName: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="suburb">Suburb</Label>
                <Input
                  id="suburb"
                  value={formData.suburb || ''}
                  onChange={(e) => setFormData({...formData, suburb: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city || ''}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="province">Province</Label>
                <Select value={formData.province} onValueChange={(value) => setFormData({...formData, province: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map(province => (
                      <SelectItem key={province} value={province}>{province}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode || ''}
                  onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {address ? 'Update' : 'Create'} Address
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Customer Selection - Updated to match the image layout */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-2xl shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 sm:p-4 bg-primary/10 rounded-2xl shrink-0">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                  Address Management
                </h2>
                <p className="text-primary/80 text-lg font-medium">
                  Customer:
                </p>
                <p className="text-primary text-xl font-semibold">
                  {selectedCustomer}
                </p>
              </div>
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 shrink-0"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Address
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Address Form */}
      {showAddForm && (
        <AddressForm
          onSave={handleSaveAddress}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingAddress && (
        <AddressForm
          address={editingAddress}
          onSave={handleSaveAddress}
          onCancel={() => setEditingAddress(null)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Addresses */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                Customer Addresses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {addresses.filter(addr => addr.isActive).map((address) => (
                  <div key={address.id} className={`p-4 border rounded-lg ${address.isPrimary ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {address.type === 'Physical' ? 
                          <Home className="w-5 h-5 text-blue-600" /> : 
                          <Mail className="w-5 h-5 text-green-600" />
                        }
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            {address.type} Address
                            {address.isPrimary && <Badge className="bg-blue-500">Primary</Badge>}
                          </h4>
                          <p className="text-sm text-gray-600">ID: {address.id}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingAddress(address)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                        {!address.isPrimary && (
                          <Button size="sm" variant="outline" onClick={() => handleSetPrimary(address.id)}>
                            Set Primary
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleDeactivateAddress(address.id)}>
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Street:</span>
                        <p>{address.streetNo} {address.streetName}</p>
                      </div>
                      <div>
                        <span className="font-medium">Suburb:</span>
                        <p>{address.suburb}</p>
                      </div>
                      <div>
                        <span className="font-medium">City:</span>
                        <p>{address.city}</p>
                      </div>
                      <div>
                        <span className="font-medium">Province:</span>
                        <p>{address.province}</p>
                      </div>
                      <div>
                        <span className="font-medium">Postal Code:</span>
                        <p>{address.postalCode}</p>
                      </div>
                      <div>
                        <span className="font-medium">Delivery:</span>
                        <Badge variant="outline">{address.delivery}</Badge>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                      <div className="flex justify-between">
                        <span>Active from: {address.activeFrom}</span>
                        <span>Modified by: {address.modifiedBy}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Address History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-6 h-6 text-green-600" />
                Address History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {addressHistory.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Clock className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{entry.action}</span>
                        <span className="text-xs text-gray-500">{entry.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600">{entry.details}</p>
                      <p className="text-xs text-gray-500">Address ID: {entry.addressId} • By: {entry.modifiedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inactive Addresses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-6 h-6 text-gray-600" />
              Inactive Addresses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {addresses.filter(addr => !addr.isActive).map((address) => (
                <div key={address.id} className="p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    {address.type === 'Physical' ? 
                      <Home className="w-4 h-4 text-gray-500" /> : 
                      <Mail className="w-4 h-4 text-gray-500" />
                    }
                    <span className="font-semibold text-gray-700">{address.type}</span>
                    <Badge variant="outline" className="text-gray-500">Inactive</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {address.streetNo} {address.streetName}, {address.suburb}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Active: {address.activeFrom} - {address.activeTo}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};