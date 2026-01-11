import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { dashboardData } from '../../components/constants/SampleData';
import moment from 'moment'

 const columns = [
    {
      field: "id",
      headerName: "ID",
      w: 100
    },
    {
      field: "attachments",
      headerName: "ATTACHMENTS",
      w: 200
    },
    
    {
      field: "content",
      headerName: "Content",
      w: 400
    },
    {
      field: "sender",
      headerName: "Sent by",
      w: 200
    },
    {
      field: "chat",
      headerName: "Chat",
      w: 220
    },
    {
      field: "groupChat",
      headerName: "Group Chat",
      w: 100
    },
    {
      field: "created_at",
      headerName: "Time",
      w: 250
    },
  ]
  
const Messages = () => {
  
  
   const [rows, setRows] = useState();
   useEffect(()=>{
    setRows(dashboardData.messages.map((i)=>({...i, id: i._id, sender: i.sender.name, attachments: i.attachments.length, created_at: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"), groupChat: i.groupChat ? "Group" : "Direct"})))
   },[])
   
   
  return (
    <div>
      <AdminLayout>
        <Table heading={'all messages'} columns={columns} rows={rows} />
      </AdminLayout>
    </div>
  )
}


export default Messages
