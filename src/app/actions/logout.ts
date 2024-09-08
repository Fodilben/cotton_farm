'use server';

import { supabase } from "../../lib/supabaseClient"

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log('Error logging out:', error);
    return { error: 'Error logging out' };
  }

  return { success: true };
}
