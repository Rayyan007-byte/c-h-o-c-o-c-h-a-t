import axios from "axios";
import { useEffect, useState } from "react";
// import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import MessageInput from "./MessageInput";
import { useRef } from "react";
import ChatListItem from "./ChatHeader";

const ChatItem = () => {
  const socket = useSocket();
  const senderId = useSelector((state) => state.userid.senderId);
  const [OldMessages, setOldMessages] = useState([]);
  const [InputMessage, setInputMessage] = useState("");
  const params = useParams();
  const chatId = params.id;
  useEffect(() => {
    // console.log(chatId);
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



  useEffect(() => {
    if (!socket) return;

    const handleReceive = (msg) => {
      // console.log("new message:", msg);
      setOldMessages((prev) => [...prev, msg]);
    };

    socket.on("RECEIVE-MESSAGE", handleReceive);

    return () => {
      socket.off("RECEIVE-MESSAGE", handleReceive);
    };
  }, [socket]);

  const onSend = (messageText)=>{
 
        socket.emit("SEND-MESSAGE", {
          chatId,
          InputMessage: messageText,
          
        })
        // console.log("sendt", messageText, chatId);
        
      }
      const chatContainerRef = useRef(null);

useEffect(() => {
  
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
}, [OldMessages]); // scroll bottom whenever OldMessages changes

  return (
    <>
    <div className="">
      <div className="b-2 pb-2 mb-2 h-12 bg-black">
        <ChatListItem />
      </div>
      <div 
      ref={chatContainerRef}
      className="h-[73vh] overflow-y-scroll flex flex-col">
      {OldMessages && OldMessages.length > 0 ? (
        OldMessages.map((oldMessage, i) => {
          // console.log("oldmessage",oldMessage);
          // console.log("senderid",senderId);
          const groupChat = oldMessage.chat.groupChat;
          // console.log("groupcht", groupChat);
          
          
          const sameSender = 
          oldMessage.sender?._id === senderId ||
          oldMessage.senderId === senderId ||
          oldMessage.sender === senderId;
          // oldMessage.sender._id === senderId;
          // const sameSender = 0 == 0;
          // console.log("samesender", sameSender);

          return (
            <div
              key={i}
              className={`flex ${sameSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`${
                  sameSender ? "items-end text-end" : "items-start text-start"
                }max-w-[50%] w-fit pl-3 pr-3 py-2 rounded-lg my-0.5 bg-white/5 flex flex-col`}
              >
                <small className="font-semibold text-yellow-300">
                  { sameSender ? "" : oldMessage.sender?.name}
                  {/* { groupChat == true && !sameSender ? "" : oldMessage.sender?.name} */}
                </small>
                <div className="text-xl">{oldMessage.message}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No message yet</div>
      )}
      {/* <form action="">
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
      </form> */}
      </div>
      <div className="mt-2">
        <MessageInput onSend={onSend} />
        </div>
      </div>
    </>
  );
};

export default ChatItem;
