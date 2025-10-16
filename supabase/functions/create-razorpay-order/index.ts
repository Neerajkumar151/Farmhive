// Define standard CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allows all origins for local development. IMPORTANT: Change this to your production domain(s) later.
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Use Deno.serve to handle incoming requests and the OPTIONS preflight
Deno.serve(async (req: Request) => {
  // Handle CORS Preflight (OPTIONS request)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Handle POST request (main logic)
  try {
    const payload = await req.json();
    const bookingId = payload?.bookingId ?? '';
    const amountInput = payload?.amount;

    // Validate and convert amount (rupees -> paise)
    const rupees = Number(amountInput);
    if (!Number.isFinite(rupees) || rupees <= 0) {
      console.error('Invalid amount received:', amountInput);
      return new Response(
        JSON.stringify({ error: 'Invalid amount', received: amountInput }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const amountPaise = Math.round(rupees * 100);

    // 1. Prepare Request Body (amount is in paise)
    const receipt = `bk_${Date.now().toString().slice(-8)}_${bookingId.toString().slice(0, 20)}`; // < 40 chars
    const body = JSON.stringify({
      amount: amountPaise,
      currency: 'INR',
      receipt,
      payment_capture: 1,
    });

    // 2. Authorize and Fetch Razorpay API
    const authHeader =
      'Basic ' + btoa(`${Deno.env.get('RAZORPAY_KEY_ID_TEST')}:${Deno.env.get('RAZORPAY_KEY_SECRET_TEST')}`);

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body,
    });

    const data = await response.json();

    // Forward Razorpay errors with proper status code
    if (!response.ok) {
      console.error('Razorpay order error:', data);
      return new Response(
        JSON.stringify({ error: data?.error?.description || 'Razorpay order failed', details: data }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Return the successful response with CORS headers
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    // 4. Return error response with CORS headers
    return new Response(
      JSON.stringify({ error: err.message || 'Internal Server Error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
