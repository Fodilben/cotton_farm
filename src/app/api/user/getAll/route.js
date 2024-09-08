import { supabase } from '../../../../lib/supabaseClient';

export const GET = async () =>{
  
let { data: users, error } = await supabase
  .from('users')
  .select('*')

if(error){
  return new Response(JSON.stringify({ error: error.message }), {
    status: 400,
  });
}
return new Response(
      JSON.stringify({ users }),
      { status: 200 }
    );
}
