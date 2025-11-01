import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    // GET /thumbnails - Get public thumbnails or user's thumbnails
    if (req.method === 'GET' && path === 'thumbnails') {
      const userId = url.searchParams.get('user_id');
      const isPublic = url.searchParams.get('public') === 'true';
      
      let query = supabase
        .from('haley_thumbnails')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      } else if (isPublic) {
        query = query.eq('is_public', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching thumbnails:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify(data),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // POST /thumbnails - Create new thumbnail
    if (req.method === 'POST' && path === 'thumbnails') {
      const body = await req.json();
      const { user_id, video_title, prompt, model_used, thumbnail_url, language, tags, is_public } = body;

      if (!user_id) {
        return new Response(
          JSON.stringify({ error: 'user_id is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data, error } = await supabase
        .from('haley_thumbnails')
        .insert([{
          user_id,
          video_title,
          prompt,
          model_used,
          thumbnail_url,
          language: language || 'en',
          tags: tags || [],
          is_public: is_public || false,
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating thumbnail:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify(data),
        { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // POST /thumbnails/signed-url - Create signed upload URL
    if (req.method === 'POST' && url.pathname.includes('signed-url')) {
      const body = await req.json();
      const { filename, user_id } = body;

      if (!filename || !user_id) {
        return new Response(
          JSON.stringify({ error: 'filename and user_id are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const filePath = `${user_id}/${Date.now()}-${filename}`;

      const { data, error } = await supabase.storage
        .from('haley-thumbnails')
        .createSignedUploadUrl(filePath);

      if (error) {
        console.error('Error creating signed URL:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get public URL
      const { data: publicData } = supabase.storage
        .from('haley-thumbnails')
        .getPublicUrl(filePath);

      return new Response(
        JSON.stringify({ 
          ...data, 
          publicUrl: publicData.publicUrl,
          filePath 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // PUT /thumbnails/:uuid - Update thumbnail
    if (req.method === 'PUT' && path !== 'thumbnails') {
      const uuid = path;
      const body = await req.json();
      
      const { data, error } = await supabase
        .from('haley_thumbnails')
        .update(body)
        .eq('uuid', uuid)
        .select()
        .single();

      if (error) {
        console.error('Error updating thumbnail:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify(data),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
