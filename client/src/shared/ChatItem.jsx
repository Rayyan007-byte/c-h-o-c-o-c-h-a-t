import React from "react";
import { Link } from "react-router-dom";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessagesAlert,
  index = 0,
  handleDeleteChatOpen,
}) => {
  return (
    <>
      <Link
        to={`/chat/${_id}`}
        onContextMenu={(e) => handleDeleteChatOpen(e, _id, groupChat)}
        className="text-black p-1 hover:bg-fuchsia-600"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: sameSender ? "red" : "unset",
          }}
        >
          {/* Avatart card */}
          <div>
            <div>{name}</div>
            {newMessagesAlert && <div>{newMessagesAlert.count}New Message</div>}
          </div>
          {isOnline && <div className="w-10 h-10 bg-green-600"></div>}
        </div>
      </Link>
    </>
  );
};

export default ChatItem;
