import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ message: 'Authorization code is required' }, { status: 400 });
    }

    const clientId = process.env.NEXT_PUBLIC_TICKTICK_CLIENT_ID;
    const clientSecret = process.env.TICKTICK_CLIENT_SECRET;
    const redirectUri = "http://localhost:3000/testing"; // Make sure this matches your client-side redirect URI

    const response = await fetch('https://ticktick.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
      },
      body: new URLSearchParams({
        code: code,
        grant_type: 'authorization_code',
        scope: 'tasks:write tasks:read',
        redirect_uri: redirectUri
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return NextResponse.json({ message: 'Failed to exchange code for token', error: error.message }, { status: 500 });
  }
}

