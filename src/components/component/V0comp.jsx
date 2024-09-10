'use client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Dashboard from "./Dashboard";
import Productivity from "./Productivity";
import Leaderboard from "./Leaderboard";
import Settings from "./Settings";
import Sidebar from "./Sidebar"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function V0comp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      try {
        const data = JSON.parse(localStorage.getItem('authUser'));
        if (!data) {
          router.push("/login"); // Redirect if not authenticated
        } else {
          const storageData = data.data;
          const newData = storageData?.newData;
          setUsername(newData?.userInfo?.username || 'no user');
          setEmail(newData?.user?.email || 'no user');
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        router.push("/login"); // Redirect on error
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar email={email} username={username} />
      <Tabs defaultValue="dashboard" className="w-full p-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="productivity">
          <Productivity />
        </TabsContent>
        <TabsContent value="leaderboard">
          <Leaderboard />
        </TabsContent>
        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
