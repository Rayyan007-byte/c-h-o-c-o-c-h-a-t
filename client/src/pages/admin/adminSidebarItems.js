import React from 'react'
import { MdDashboard, MdGroups, MdMessage } from 'react-icons/md';
import { RiUserSettingsFill } from "react-icons/ri";

export const AdminSidebarItems = [
    {
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: MdDashboard
    },
    {
        label: "Users",
        path: "/admin/users",
        icon: RiUserSettingsFill
    },
    {
        label: "Chats",
        path: "/admin/chats",
        icon: MdGroups
    },
    {
        label: "Messages",
        path: "/admin/messages",
        icon: MdMessage
    },
]
