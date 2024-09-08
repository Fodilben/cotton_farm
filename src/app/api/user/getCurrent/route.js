import { supabase } from "../../../../lib/supabaseClient";

export async function GET() {
  const {data} = await supabase.auth.getUser();
  
  console.log(data);
  return new Response(JSON.stringify({ data }), { status: 200 });
}
//  i am having a problem with the session in supabase the user is logged in but the session is empty 