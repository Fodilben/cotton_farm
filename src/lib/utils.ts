import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {supabase} from "../lib/supabaseClient"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchUsers(): Promise<any> {
  try {
    const response = await fetch("/api/user/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    
    return data;
  } catch (error) {
    throw new Error(`Fetch failed: ${(error as Error).message}`);
  }
}
export async function fetchCurrentUser() {
  const response = await fetch("/api/user/getCurrent", {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();
  return data;
}
