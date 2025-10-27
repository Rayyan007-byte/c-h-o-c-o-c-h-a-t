import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const ChatList = () => {
  const [ChatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/chat/get-my-chat",
        { withCredentials: true }
      );

      setChatList(res.data.transformedChats);
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    if(!ChatList) return;
    
    
  }, [])
  

  return (
    <div className="flex flex-col">
      {ChatList &&
        ChatList.map((chatlist, i) => {
          return (
            <NavLink
              to={`/chat/${chatlist._id}`}
              key={i}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-black" : "bg-[#1e1e1e]"
                } w-full h-10 rounded-lg hover:bg-black flex items-center px-2 py-7 text-lg `
              }
            >
              {chatlist.name}
              
            </NavLink>
          );
        })}
    </div>
  );
};

export default ChatList;
