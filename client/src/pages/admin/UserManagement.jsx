import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { dashboardData } from '../../components/constants/SampleData'

 const columns = [
    {
      field: "id",
      headerName: "ID",
      w: 100
    },
    {
      field: "avatar",
      headerName: "AVATAR",
      w: 150
    },
    {
      field: "name",
      headerName: "NAME",
      w: 200
    },
    {
      field: "username",
      headerName: "USERNAME",
      w: 200
    },
    {
      field: "friends",
      headerName: "FRIENDS",
      w: 200
    },
    {
      field: "groups",
      headerName: "GROUPS",
      w: 200
    },
  ]
  
const UserManagement = () => {
   const [rows, setRows] = useState();
   useEffect(()=>{
    setRows(dashboardData.users.map((i)=>({...i, id: i._id})))
   },[])
  return (
    <div>
      <AdminLayout>
        <Table heading={"all chats"} columns={columns} rows={rows} />
      </AdminLayout>
    </div>
  )
}

export default UserManagement
