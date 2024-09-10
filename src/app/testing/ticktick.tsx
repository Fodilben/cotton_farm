"use client";
import { useState, useEffect } from "react";

export default function ticktickapi() {
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [projectId, setProjectId] = useState<string>("");

  const clientId = process.env.NEXT_PUBLIC_TICKTICK_CLIENT_ID;
  const redirectUri = encodeURIComponent("http://localhost:3000/testing");
  const scope = "tasks:write tasks:read";
  const responseType = "code";

  useEffect(() => {
    // Check localStorage for existing token
    const storedToken = localStorage.getItem('ticktickAccessToken');
    if (storedToken) {
      setAccessToken(storedToken);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      setAuthCode(code);
    exchangeCodeForToken(code)
    }
  }, []);

  const initiateAuth = () => {
    const authUrl = `https://ticktick.com/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=${responseType}`;
    window.location.href = authUrl;
  };

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch('/api/ticktick/getToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      if (!data.access_token) {
        throw new Error('Access token not found in the response');
      }
      setAccessToken(data.access_token);
      localStorage.setItem('ticktickAccessToken', data.access_token);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to exchange code for token: ${err.message}`);
        console.error('Error details:', err);
      }
    }
  };

  const fetchProject = async () => {
    if (!accessToken) {
      setError('Access token is required to fetch project');
      return;
    }

    try {
      const response = await fetch(`/api/ticktick/getTasks?projectId=${projectId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }

      const projectData = await response.json();
      setProjects(prevProjects => [...prevProjects, projectData]);
      setProjectId(""); // Clear the input after fetching
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch project: ${err.message}`);
        console.error('Error details:', err);
      }
    }
  };

  const resetState = () => {
    setAuthCode(null);
    setAccessToken(null);
    setError(null);
    setProjects([]);
    setProjectId("");
    localStorage.removeItem('ticktickAccessToken');
    // Clear the URL parameters
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">TickTick API Testing Page</h1>
      <div className="space-x-4 mb-4">
        {!accessToken && (
          <button
            onClick={initiateAuth}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Authorize TickTick
          </button>
        )}
        <button
          onClick={resetState}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
      {accessToken && (
        <div className="mt-4">
          <input
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            placeholder="Enter Project ID"
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={fetchProject}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Fetch Project
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      {authCode && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Authorization Code:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-24">
            {authCode}
          </pre>
        </div>
      )}
      {accessToken && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Access Token:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-24">
            {accessToken}
          </pre>
        </div>
      )}
      {projects.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Fetched Projects:</h2>
          {projects.map((project, index) => (
            <pre key={index} className="bg-gray-100 p-4 rounded overflow-auto max-h-96 mt-2">
              {JSON.stringify(project, null, 2)}
            </pre>
          ))}
        </div>
      )}
    </div>
  );
}
