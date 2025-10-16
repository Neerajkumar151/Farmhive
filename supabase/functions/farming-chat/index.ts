

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, sessionId, conversationId } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not set");

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Get or create conversation
    let convId = conversationId;
    if (!convId) {
      const { data: conv, error: convError } = await supabase
        .from('chat_conversations')
        .insert({ session_id: sessionId })
        .select()
        .single();
      if (convError) throw convError;
      convId = conv.id;
    }

    // Fetch dynamic tools and warehouses
    const { data: tools } = await supabase
      .from('tools')
      .select('*')
      .eq('availability', true);

    const { data: warehouses } = await supabase
      .from('warehouses')
      .select('*, warehouse_storage_options(*)');

    // Store user message
    const userMessage = messages[messages.length - 1];
    await supabase
      .from('chat_messages')
      .insert({
        conversation_id: convId,
        role: 'user',
        content: userMessage.content
      });

    // Call Gemini API
    const response = await fetch("https://api.generativeai.google/v1beta2/models/google/gemini-2.5-flash:generateMessage", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            author: "system",
            content: [
              {
                type: "text",
                text: `
You are FarmHive's AI assistant. Provide helpful answers about farming tools, warehouses, and farming questions.

IMPORTANT:
- Format all lists as bullet points
- Include short descriptions, locations, and prices
- Each item must be on its own line
- Use short paragraphs, not one big paragraph
- Support multiple languages if asked

Available Tools:
${tools?.map(t => `- ${t.name} (${t.category}): ${t.description || 'No description'} | Location: ${t.location || 'Not specified'} | Price: ₹${t.price_per_day}/day, ₹${t.price_per_month}/month, ₹t.price_per_season/season`).join("\n")}

Available Warehouses:
${warehouses?.map((w: any) => `- ${w.name} at ${w.location}: ${w.description || 'No description'} | Total Space: ${w.total_space_sqft} sqft, Available: ${w.available_space_sqft} sqft | Storage Options: ${w.warehouse_storage_options?.map((o: any) => `${o.storage_type} (${o.size_category})`).join(", ") || "None"}`).join("\n")}

Always respond in readable bullet points and short paragraphs.
`
              }
            ]
          },
          ...messages.map((msg: any) => ({
            author: msg.role === 'user' ? 'user' : 'assistant',
            content: [{ type: "text", text: msg.content }]
          }))
        ],
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      throw new Error(`Gemini API error: ${errorText}`);
    }

    const data = await response.json();
    const assistantMessage = data?.candidates?.[0]?.content?.[0]?.text || "Sorry, I couldn't generate a response.";

    // Store assistant response
    await supabase
      .from('chat_messages')
      .insert({
        conversation_id: convId,
        role: 'assistant',
        content: assistantMessage
      });

    return new Response(
      JSON.stringify({ message: assistantMessage, conversationId: convId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in farming-chat:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
