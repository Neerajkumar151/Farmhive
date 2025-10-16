import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Download, Receipt } from 'lucide-react';

interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  payment_status: string;
  payment_date: string;
  transaction_id: string;
  type: string;
  razorpay_payment_id: string;
  razorpay_order_id: string;
}

const PaymentHistory: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPayments();
    }
  }, [user]);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_history')
        .select('*')
        .eq('user_id', user?.id)
        .order('payment_date', { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = (payment: Payment) => {
    // Create a simple invoice HTML
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${payment.transaction_id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .invoice-box { max-width: 800px; margin: auto; border: 1px solid #eee; padding: 30px; }
            .header { text-align: center; margin-bottom: 30px; }
            .details { margin: 20px 0; }
            .details p { margin: 10px 0; }
            .total { font-size: 24px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <div class="header">
              <h1>Payment Invoice</h1>
              <p>Farmers App</p>
            </div>
            <div class="details">
              <p><strong>Transaction ID:</strong> ${payment.transaction_id}</p>
              <p><strong>Razorpay Payment ID:</strong> ${payment.razorpay_payment_id}</p>
              <p><strong>Razorpay Order ID:</strong> ${payment.razorpay_order_id}</p>
              <p><strong>Type:</strong> ${payment.type}</p>
              <p><strong>Date:</strong> ${format(new Date(payment.payment_date), 'PPP')}</p>
              <p><strong>Status:</strong> ${payment.payment_status}</p>
            </div>
            <div class="total">
              <p>Total Amount Paid: ₹${payment.amount.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Create a blob and download
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${payment.transaction_id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <Receipt className="w-8 h-8" />
          <h1 className="text-4xl font-bold">Payment History</h1>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading payment history...</div>
        ) : payments.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No payment history found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <Card key={payment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {payment.type}
                    </CardTitle>
                    <Badge variant="default">{payment.payment_status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Transaction ID</p>
                      <p className="font-mono text-sm">{payment.transaction_id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="text-2xl font-bold">₹{payment.amount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Date</p>
                      <p className="text-sm">{format(new Date(payment.payment_date), 'PPP')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Razorpay Order ID</p>
                      <p className="font-mono text-sm">{payment.razorpay_order_id}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadInvoice(payment)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PaymentHistory;
