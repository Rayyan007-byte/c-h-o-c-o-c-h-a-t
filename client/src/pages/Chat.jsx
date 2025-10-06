import React from "react";
import MainLayout from "../components/layout/MainLayout";
import ChatItem from "../components/constants/ChatItem";

const Chat = () => {
  return (
    <>
      <div className="">
        <ChatItem />
      </div>
    </>
  );
};

export default MainLayout()(Chat);
