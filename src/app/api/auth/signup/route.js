import { supabase } from '../../../../lib/supabaseClient';
export async function POST(req) {
  const { email, password ,username} = await req.json();
 try {

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return new Response(
      JSON.stringify({ error: authError.message }),
      { status: 400 }
    );
  }

  const userId = authData.user.id;
  let userInfo = { id: userId, username, points: 0, email };

  const {  error: userError } = await supabase
    .from("users")
    .insert([userInfo]);

  if (userError) {
    console.error("User table error:", userError.message);
    return new Response(
      JSON.stringify({ error: userError.message }),
      { status: 400 }
    );
  }
  // return Response.redirect('/', 302);
  return new Response(JSON.stringify({ message: "User created successfully" , userInfo }), {
    status: 200,
  });
} catch (err) {
  console.error("Unexpected error:", err.message);
  return new Response(
    JSON.stringify({ error: "An unexpected error occurred" }),
    { status: 500 }
  );
}

}
