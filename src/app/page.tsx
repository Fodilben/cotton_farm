import Image from "next/image";
import { supabase } from "../lib/supabaseClient";
import { V0comp } from './../components/component/V0comp';
import { redirect } from 'next/navigation';
import { useEffect } from "react";
export default async  function Home() {
  
  return (
    <main>
      <V0comp />
    </main>
  );
}
