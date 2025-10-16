import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { 
  Calendar, 
  Package, 
  Warehouse, 
  ClipboardList,
  AlertTriangle, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

// --- Interfaces ---
interface ToolBooking {
  id: string;
  tool_id: string;
  start_date: string;
  end_date: string;
  total_cost: number;
  status: string;
  rejection_reason?: string;
  rental_type: string;
  tools: { name: string; category: string; };
}

interface WarehouseBooking {
  id: string;
  warehouse_storage_option_id: string;
  start_date: string;
  end_date: string;
  total_cost: number;
  status: string;
  rejection_reason?: string;
  space_sqft: number;
  warehouse_storage_options: { storage_type: string; warehouses: { name: string; location: string; } };
}

interface UserSoilCheck {
  id: string;
  location: string | null;
  primary_crop: string | null;
  status: string;
  created_at: string;
  recommendations: string | null;
}

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const [toolBookings, setToolBookings] = useState<ToolBooking[]>([]);
  const [warehouseBookings, setWarehouseBookings] = useState<WarehouseBooking[]>([]);
  const [soilCheckApplications, setSoilCheckApplications] = useState<UserSoilCheck[]>([]);
  const [loading, setLoading] = useState(true);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const [toolsRes, warehousesRes] = await Promise.all([
        supabase.from('tool_bookings')
          .select(`*, tools(name, category)`)
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false }),
        supabase.from('warehouse_bookings')
          .select(`*, warehouse_storage_options(storage_type, warehouses(name, location))`)
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false })
      ]);

      if (toolsRes.error) throw toolsRes.error;
      if (warehousesRes.error) throw warehousesRes.error;

      setToolBookings(toolsRes.data || []);
      setWarehouseBookings(warehousesRes.data || []);
    } catch (error: any) {
      toast({ title: 'Error fetching bookings', description: error.message, variant: 'destructive' });
    }
  };
  

  const fetchUserApplications = async () => {
    try {
      if (!user) return;
      const { data, error } = await supabase
        .from('soil_checks')
        .select('id, location, primary_crop, status, created_at, recommendations')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSoilCheckApplications(data || []);
    } catch (error: any) {
      toast({ title: 'Error fetching applications', description: error.message, variant: 'destructive' });
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([fetchBookings(), fetchUserApplications()]).finally(() => setLoading(false));
    }
  }, [user]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      accepted: 'default',
      rejected: 'destructive',
      confirmed: 'default',
      completed: 'outline'
    };
    return <Badge variant={variants[status] || 'outline'}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending': return { icon: AlertTriangle, color: 'bg-yellow-500', text: t('status.pending', { defaultValue: 'Pending' }) };
      case 'accepted': return { icon: CheckCircle, color: 'bg-blue-500', text: t('status.accepted', { defaultValue: 'Accepted' }) };
      case 'completed': return { icon: CheckCircle, color: 'bg-green-500', text: t('status.completed', { defaultValue: 'Completed' }) };
      case 'rejected': return { icon: XCircle, color: 'bg-red-500', text: t('status.rejected', { defaultValue: 'Rejected' }) };
      default: return { icon: ClipboardList, color: 'bg-gray-500', text: t('status.unknown', { defaultValue: 'Unknown' }) };
    }
  };

  const handlePayment = async (bookingId: string, amount: number, type: 'Tool Booking' | 'Warehouse Booking') => {
    try {
      // Get the current session to retrieve the access token
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;

      if (!accessToken) throw new Error('User not authenticated');

      // Call Supabase Edge Function with Authorization
      const res = await fetch(
        'https://xfeeizryotmnopvgevmf.functions.supabase.co/create-razorpay-order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({ bookingId, amount }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create order');

      // Razorpay Checkout
      const options = {
        key: 'rzp_test_RU7Ssjpxs3pyhT',
        // amount not needed when order_id is provided
        currency: data.currency,
        name: 'Farmers App',
        description: 'Booking Payment',
        order_id: data.id,
        handler: async function (response: any) {
          try {
            // Record payment in database
            const recordRes = await fetch(
              'https://xfeeizryotmnopvgevmf.functions.supabase.co/record-payment',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                  bookingId,
                  amount: amount,
                  type: type,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  userId: user?.id
                }),
              }
            );

            if (recordRes.ok) {
              toast({ 
                title: 'Payment Successful!', 
                description: 'Your payment has been recorded successfully.' 
              });
              fetchBookings(); // Refresh bookings
            } else {
              toast({ 
                title: 'Payment recorded but update failed', 
                description: 'Please contact support with Payment ID: ' + response.razorpay_payment_id,
                variant: 'destructive' 
              });
            }
          } catch (err) {
            console.error('Error recording payment:', err);
          }
        },
        prefill: { email: user?.email },
        theme: { color: '#3399cc' },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast({ title: 'Payment Error', description: error.message, variant: 'destructive' });
    }
  };


  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold mb-2">{t('nav.profile')}</h1>
        <p className="text-muted-foreground mb-8">
          {t('profile.welcome_message', { name: profile?.full_name || user?.email || 'User', defaultValue: `Welcome back, ${profile?.full_name || user?.email || 'User'}!` })}
        </p>

        <Tabs defaultValue="tool-bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tool-bookings"><Package className="w-4 h-4 mr-2" />{t('tabs.tool_bookings', { defaultValue: 'Tool Bookings' })}</TabsTrigger>
            <TabsTrigger value="warehouse-bookings"><Warehouse className="w-4 h-4 mr-2" />{t('tabs.warehouse_bookings', { defaultValue: 'Warehouse Bookings' })}</TabsTrigger>
            <TabsTrigger value="soil-checks"><ClipboardList className="w-4 h-4 mr-2" />{t('tabs.soil_checks', { defaultValue: 'Soil Checks' })}</TabsTrigger>
          </TabsList>

          {/* Tool Bookings */}
          <TabsContent value="tool-bookings" className="space-y-4 mt-6">
            {loading ? <p className="text-center py-12">{t('loading_bookings', { defaultValue: 'Loading bookings...' })}</p> :
              toolBookings.length === 0 ? <Card><CardContent className="pt-6 text-center">{t('tool_bookings.no_bookings', { defaultValue: 'No tool bookings yet' })}</CardContent></Card> :
              toolBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div><CardTitle>{booking.tools?.name}</CardTitle><CardDescription>{booking.tools?.category}</CardDescription></div>
                      {getStatusBadge(booking.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4" /><span>{format(new Date(booking.start_date), 'MMM dd, yyyy')} - {format(new Date(booking.end_date), 'MMM dd, yyyy')}</span></div>
                    <p className="text-sm"><span className="font-medium">{t('tool_bookings.rental_type', { defaultValue: 'Rental Type' })}:</span> {booking.rental_type}</p>
                    <p className="text-sm"><span className="font-medium">{t('total_cost', { defaultValue: 'Total Cost' })}:</span> ₹{booking.total_cost}</p>
                    {booking.rejection_reason && <div className="mt-4 p-3 bg-destructive/10 rounded-md"><p className="text-sm font-medium text-destructive">{t('rejection_reason', { defaultValue: 'Rejection Reason' })}:</p><p className="text-sm text-destructive">{booking.rejection_reason}</p></div>}
                    {booking.status === 'accepted' && <Button className="mt-4 w-full" onClick={() => handlePayment(booking.id, booking.total_cost, 'Tool Booking')}>Pay Now - ₹{booking.total_cost}</Button>}
                  </CardContent>
                </Card>
              ))
            }
          </TabsContent>

          {/* Warehouse Bookings */}
          <TabsContent value="warehouse-bookings" className="space-y-4 mt-6">
            {loading ? <p className="text-center py-12">{t('loading_bookings', { defaultValue: 'Loading bookings...' })}</p> :
              warehouseBookings.length === 0 ? <Card><CardContent className="pt-6 text-center">{t('warehouse_bookings.no_bookings', { defaultValue: 'No warehouse bookings yet' })}</CardContent></Card> :
              warehouseBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div><CardTitle>{booking.warehouse_storage_options?.warehouses?.name}</CardTitle><CardDescription>{booking.warehouse_storage_options?.warehouses?.location}</CardDescription></div>
                      {getStatusBadge(booking.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4" /><span>{format(new Date(booking.start_date), 'MMM dd, yyyy')} - {format(new Date(booking.end_date), 'MMM dd, yyyy')}</span></div>
                    <p className="text-sm"><span className="font-medium">{t('warehouse_bookings.storage_type', { defaultValue: 'Storage Type' })}:</span> {booking.warehouse_storage_options?.storage_type}</p>
                    <p className="text-sm"><span className="font-medium">{t('warehouse_bookings.space', { defaultValue: 'Space' })}:</span> {booking.space_sqft} sq ft</p>
                    <p className="text-sm"><span className="font-medium">{t('total_cost', { defaultValue: 'Total Cost' })}:</span> ₹{booking.total_cost}</p>
                    {booking.rejection_reason && <div className="mt-4 p-3 bg-destructive/10 rounded-md"><p className="text-sm font-medium text-destructive">{t('rejection_reason', { defaultValue: 'Rejection Reason' })}:</p><p className="text-sm text-destructive">{booking.rejection_reason}</p></div>}
                    {booking.status === 'accepted' && <Button className="mt-4 w-full" onClick={() => handlePayment(booking.id, booking.total_cost, 'Warehouse Booking')}>Pay Now - ₹{booking.total_cost}</Button>}
                  </CardContent>
                </Card>
              ))
            }
          </TabsContent>

          {/* Soil Checks */}
          <TabsContent value="soil-checks" className="space-y-4 mt-6">
            {loading ? <div className="text-center py-12">{t('profile.loading_history', { defaultValue: 'Loading history...' })}</div> :
              soilCheckApplications.length === 0 ? <div className="text-center py-12 border rounded-lg bg-gray-50"><p className="text-muted-foreground text-lg">{t('profile.no_applications', { defaultValue: 'No soil check applications yet.' })}</p></div> :
              <div className="space-y-4">
                {soilCheckApplications.map((app) => {
                  const statusInfo = getStatusInfo(app.status);
                  const rejectionFeedback = app.status === 'rejected' && app.recommendations;
                  return (
                    <Card key={app.id} className={`hover:shadow-lg transition-shadow duration-300 ${rejectionFeedback ? 'border-red-400' : 'border-gray-200'}`}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-semibold">{app.location} ({app.primary_crop})</CardTitle>
                        <Badge className={`${statusInfo.color} text-white`}>{statusInfo.text}</Badge>
                      </CardHeader>
                      <CardContent className="pt-2 text-sm text-muted-foreground">
                        <p className="mb-2">{t('profile.submitted_on', { defaultValue: 'Submitted on' })}: {new Date(app.created_at).toLocaleDateString()}</p>
                        {rejectionFeedback && <div className="p-3 mt-3 border border-red-500 bg-red-50 rounded-lg"><div className="flex items-center gap-2 text-red-700 font-medium"><XCircle className="h-5 w-5" />{t('profile.rejection_feedback_label', { defaultValue: 'Rejection Feedback' })}:</div><p className="mt-1 pl-7 whitespace-pre-wrap text-xs text-red-800 italic">{app.recommendations}</p></div>}
                        {app.status === 'completed' && app.recommendations && <div className="p-3 mt-3 border border-green-500 bg-green-50 rounded-lg"><div className="font-medium text-green-700">{t('profile.final_recommendations_label', { defaultValue: 'Final Recommendations' })}:</div><p className="mt-1 text-sm whitespace-pre-wrap text-green-800">{app.recommendations}</p></div>}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            }
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
