// import axios from "axios";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useSocket } from "../components/context/SocketContext";
import { useEffect } from "react";

const SendMessage = () => {
  const senderId = useSelector((state) => state.userid.senderId);
  const receiverId = useSelector((state) => state.userid.receiverId);
  const [MessageInput, setMessageInput] = useState("");
  const socket = useSocketSocket();
  const messageSend = async () => {
    const newMessage = {
      senderId: senderId,
      receiverId: receiverId,
      message: MessageInput,
    };
    console.log(MessageInput);
    // const res = await axios.post(
    //   `http://localhost:3000/api/v1/chat/send-message/${receiverId}`,
    //   { message: MessageInput },
    //   { withCredrentials: true }

    // );
    // console.log(res.data);
    socket.emit("send-message", newMessage);

    console.log("newMessage", newMessage);
  };

  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on("ret-message", (data) => {
  //     console.log("ret-message", data);
  //   });
  // }, [socket]);

  return (
    <>
      <div className="flex items-center justify-between w-full border border-white/10 rounded-lg">
        <input
          value={MessageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          type="text"
          placeholder="Type..."
          className="w-full px-2 py-4 border-none outline-none"
        />
        <button onClick={messageSend} className="px-4 py-4">
          <IoSend className="text-2xl hover:text-white/80" />
        </button>
      </div>
    </>
  );
};

export default SendMessage;
