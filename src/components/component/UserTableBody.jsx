import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const UserTableBody = ({data}) => {
return (
    <>
    {data && data.map((user, index)=> {
              return (
                <TableRow key={index}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.points}</TableCell>
                </TableRow>
              );
    })}
    </>)
}
export default UserTableBody ;