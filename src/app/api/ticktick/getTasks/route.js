import { NextResponse } from 'next/server';

export async function GET(request) {
  const accessToken = request.headers.get('Authorization')?.split('Bearer ')[1];

  if (!accessToken) {
    return NextResponse.json({ message: 'Access token is required' }, { status: 401 });
  }
const projectId = "662f65c38f082fa0289a5f0f";
  try {
    const response = await fetch(
      `https:/api.ticktick.com/open/v1/project/${projectId}/data`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const tasks = await response.json();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ message: 'Failed to fetch tasks', error: error.message }, { status: 500 });
  }
}