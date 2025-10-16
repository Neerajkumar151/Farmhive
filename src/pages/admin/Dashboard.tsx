import React, { useEffect, useState } from 'react';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tractor, Warehouse, TestTube, Users, TrendingUp, Package } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { loading: authLoading } = useAdminCheck();
  const [stats, setStats] = useState({
    totalTools: 0,
    totalWarehouses: 0,
    totalSoilChecks: 0,
    totalUsers: 0,
    pendingToolBookings: 0,
    pendingWarehouseBookings: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [tools, warehouses, soilChecks, profiles, toolBookings, warehouseBookings] = await Promise.all([
          supabase.from('tools').select('*', { count: 'exact', head: true }),
          supabase.from('warehouses').select('*', { count: 'exact', head: true }),
          supabase.from('soil_checks').select('*', { count: 'exact', head: true }),
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('tool_bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('warehouse_bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending')
        ]);

        setStats({
          totalTools: tools.count || 0,
          totalWarehouses: warehouses.count || 0,
          totalSoilChecks: soilChecks.count || 0,
          totalUsers: profiles.count || 0,
          pendingToolBookings: toolBookings.count || 0,
          pendingWarehouseBookings: warehouseBookings.count || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (authLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const statsCards = [
    { title: 'Total Tools', value: stats.totalTools, icon: Tractor, color: 'text-blue-500' },
    { title: 'Total Warehouses', value: stats.totalWarehouses, icon: Warehouse, color: 'text-green-500' },
    { title: 'Soil Checks', value: stats.totalSoilChecks, icon: TestTube, color: 'text-purple-500' },
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-orange-500' },
    { title: 'Pending Tool Bookings', value: stats.pendingToolBookings, icon: Package, color: 'text-red-500' },
    { title: 'Pending Warehouse Bookings', value: stats.pendingWarehouseBookings, icon: TrendingUp, color: 'text-teal-500' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your FarmHive platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
