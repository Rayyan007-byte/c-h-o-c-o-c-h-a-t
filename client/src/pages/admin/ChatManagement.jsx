import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { dashboardData } from '../../components/constants/SampleData'

 const columns = [
    {
      field: "id",
      headerName: "ID",
      w: 200
    },
    {
      field: "avatar",
      headerName: "AVATAR",
      w: 150
    },
     {
      field: "name",
      headerName: "Name",
      w: 300
    },
     {
      field: "groupChat",
      headerName: "Group Chat",
      w: 100
    },
    {
      field: "totalMembers",
      headerName: "Total Members",
      w: 200
    },
    
    {
      field: "members",
      headerName: "Members",
      w: 400
    },
      {
      field: "totalMessages",
      headerName: "Total Messages",
      w: 120
    },
    {
      field: "creator",
      headerName: "Created By",
      w: 250
    },
  ]
  
const ChatManagement = () => {
    console.log("chats",dashboardData.chats);
    
   const [rows, setRows] = useState();
   useEffect(()=>{
    setRows(dashboardData.chats.map((i)=>({
        ...i, 
        id: i._id,
        avatar: "avatar",
        creator: i.name,
        members: i.members.length
    })))
   },[])
  return (
    <div>
      <AdminLayout>
        <Table heading={'all chats'} columns={columns} rows={rows} />
      </AdminLayout>
    </div>
  )
}




export default ChatManagement
