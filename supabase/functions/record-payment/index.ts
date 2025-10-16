const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { 
      bookingId, 
      amount, 
      type, 
      razorpayPaymentId, 
      razorpayOrderId,
      userId 
    } = await req.json();

    // Import Supabase client
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store payment history
    const { data, error } = await supabase
      .from('payment_history')
      .insert({
        user_id: userId,
        booking_id: bookingId,
        amount: amount,
        payment_status: 'Success',
        transaction_id: razorpayPaymentId,
        razorpay_payment_id: razorpayPaymentId,
        razorpay_order_id: razorpayOrderId,
        type: type,
        payment_date: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error storing payment:', error);
      throw error;
    }

    // Update booking status to 'paid'
    const bookingTable = type === 'Tool Booking' ? 'tool_bookings' : 'warehouse_bookings';
    const { error: updateError } = await supabase
      .from(bookingTable)
      .update({ status: 'paid' })
      .eq('id', bookingId);

    if (updateError) {
      console.error('Error updating booking:', updateError);
    }

    return new Response(
      JSON.stringify({ success: true, payment: data }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('Error in record-payment:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Internal Server Error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
