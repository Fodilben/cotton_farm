'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import UserTableBody from "./UserTableBody"
import { fetchUsers } from "@/lib/utils";
import { useEffect, useState } from "react";

export default  function Leaderboard() {
  const [data, setData] = useState([]); // State to hold users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchUsers();
        setData(data); // Update state with fetched data
      } catch (err) {
        setError("Failed to fetch users");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };
    getData();
  }, []); // Only run once when component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>Top performers in productivity</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data ? (
              <UserTableBody data={data.users} />
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
