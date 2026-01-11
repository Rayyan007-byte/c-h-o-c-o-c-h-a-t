import AdminLayout from '../../components/layout/AdminLayout';
import Table from '../../components/shared/Table';


const Users = () => {
const columns = [
  { field: "id", headerName: "ID" },
  { field: "avatar", headerName: "Avatar" },
  { field: "name", headerName: "Name" },
  { field: "username", headerName: "Username" },
  { field: "friends", headerName: "Friends" },
  { field: "groups", headerName: "Groups" },
];

const rows = [
  { id: 1, name: "Rayyan", email: "rayyan@mail.com" },
  { id: 2, name: "Admin", email: "admin@mail.com" },
];

  return (
    <div>
      <AdminLayout>
        <Table columns={columns} rows={rows} />
      </AdminLayout>
    </div>
  )
}

export default Users
