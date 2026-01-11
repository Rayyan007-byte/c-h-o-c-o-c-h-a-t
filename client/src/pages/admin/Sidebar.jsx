import React from 'react'
import { AdminSidebarItems } from './adminSidebarItems'
import { Link, useLocation } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";


const Sidebar = () => {
const location = useLocation();
const handleLogout = () => {
    alert("logout")
}
  return (
    <aside className='flex flex-col gap-8 items-center text-white'>
        <div className='uppercase py-4 text-3xl'>Admin Panel</div>
        {AdminSidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return ( 
                <Link key={item.path} to={item.path} className={`rounded-full px-4 py-2 ${isActive ? 'bg-black' : 'hover:bg-gray-800'}`}>
                    <div className='flex flex-row gap-2'>
                <Icon className='text-2xl' />
                <span>{item.label}</span>
                    </div>
                </Link>    
            )
            
        })}
                <Link onClick={handleLogout}>
                <div className='flex flex-row gap-2'>
                <IoLogOutOutline className='text-2xl font-bold'/>
                <span>Logout</span>
                </div>
                </Link>  
      
    </aside>
  )
}

export default Sidebar
