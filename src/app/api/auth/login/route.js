import { supabase } from '../../../../lib/supabaseClient'

export async function POST(req) {
  const { email, password } = await req.json();


 
 const { data, error } = await supabase.auth.signInWithPassword({
   email,
   password,
 });
  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );
  }


 const { data :userNewData, error:userNameError } = await supabase
   .from("users")
   .select("username,points")
   .eq("id", data.user.id)
   .single();
if(userNameError){
   return new Response(JSON.stringify({ userNameError: error.message }), {
     status: 400,
   });
}
  const newData ={userInfo:{points:userNewData.points,username:userNewData.username}, ...data}
console.log(newData);
  return new Response(
    JSON.stringify({ message: "user login succufilly ", newData }),
    {
      status: 200,
    }
  );

}
