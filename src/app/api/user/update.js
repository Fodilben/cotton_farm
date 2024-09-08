import { supabase } from '../../../lib/supabaseClient';

export async function POST(req) {
  const { email, tasks, pomosForTheDay, completedPomos, points } = await req.json();

  const { error } = await supabase
    .from('users')
    .update({ tasks, pomosForTheDay, completedPomos, points })
    .eq('email', email);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ message: 'User data updated successfully' }), { status: 200 });
}
