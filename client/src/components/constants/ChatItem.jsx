import axios from "axios";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const ChatItem = () => {
  const socket = useSocket();
  const senderId = useSelector((state) => state.userid.senderId);
  const [OldMessages, setOldMessages] = useState([]);
  const [InputMessage, setInputMessage] = useState("");
  const params = useParams();
  const chatId = params.id;
  useEffect(() => {
    console.log(chatId);
    const fetchMessageFromDB = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/chat/get-message/${chatId}`,
          { withCredentials: true }
        );
        console.log("chat res", res.data.message);
        setOldMessages(res.data.message);
      } catch (err) {
        console.error(
          " Error fetching messages:",
          err.response?.data || err.message
        );
      }
    };

    if (chatId) fetchMessageFromDB();
  }, [chatId]);

  const sendHandler = () => {
    if (!InputMessage.trim()) return;

    socket.emit("SEND-MESSAGE", {
      chatId,
      InputMessage,
    });

    console.log("sent:", InputMessage);
    setInputMessage(""); // input clear
  };

  useEffect(() => {
    if (!socket) return;

    const handleReceive = (msg) => {
      console.log("new message:", msg);
      setOldMessages((prev) => [...prev, msg]);
    };

    socket.on("RECEIVE-MESSAGE", handleReceive);

    return () => {
      socket.off("RECEIVE-MESSAGE", handleReceive);
    };
  }, [socket]);

  return (
    <>
      {OldMessages && OldMessages.length > 0 ? (
        OldMessages.map((oldMessage, i) => {
          const sameSender = oldMessage.sender === senderId;
          // const sameSender = 0 == 0;
          console.log("samesender", sameSender);

          return (
            <div
              key={i}
              className={`flex ${sameSender ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`${
                  sameSender ? "text-start" : "text-end"
                }max-w-[50%] w-fit pl-2 pr-12 rounded-lg m-2 bg-white/5 flex flex-col items-center`}
              >
                <small className="font-semibold text-yellow-300 ">
                  {oldMessage.sender?.name}
                </small>
                <div className="text-xl">{oldMessage.message}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No message yet</div>
      )}
      <div className="w-full flex items-center border rounded-lg p-2 bg-gray-800">
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-white px-2"
          placeholder="Type a message..."
          value={InputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          className="text-blue-400 hover:text-blue-600"
          onClick={sendHandler}
        >
          <IoSend size={24} />
        </button>
      </div>
    </>
  );
};

export default ChatItem;
