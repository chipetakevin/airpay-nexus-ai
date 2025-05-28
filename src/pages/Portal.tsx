
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerRegistration from '../components/CustomerRegistration';
import OneCardDashboard from '../components/OneCardDashboard';
import AdminPortal from '../components/AdminPortal';

const Portal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-4 text-shadow">🚀 AirPay Portal</h1>
          <p className="text-xl opacity-90">Digital Airtime & Data Platform with OneCard Rewards</p>
        </div>

        <Card className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
          <Tabs defaultValue="registration" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="registration" className="text-lg">Registration</TabsTrigger>
              <TabsTrigger value="onecard" className="text-lg">OneCard Rewards</TabsTrigger>
              <TabsTrigger value="admin" className="text-lg">Admin Portal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="registration" className="p-6">
              <CustomerRegistration />
            </TabsContent>
            
            <TabsContent value="onecard" className="p-6">
              <OneCardDashboard />
            </TabsContent>
            
            <TabsContent value="admin" className="p-6">
              <AdminPortal />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Portal;
