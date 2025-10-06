import { useState } from "react";
import UserProfile from "../userProfile/UserProfile";
import SendMessage from "./SendMessage";
import Messages from "./Messages";

const UserMessage = () => {
  const [Message, setMessage] = useState(null);

  if (Message) {
    console.log("Message", Message);
  }

  return (
    <>
      <div className="w-full h-full relative">
        <div className="border h-[8%] w-full">
          <UserProfile />
        </div>
        <div className=" h-[83%] w-full overflow-y-auto">
          <Messages Message={Message} />
        </div>
        <div className=" max-h-[8%] w-full absolute bottom-2">
          <SendMessage setMessage={setMessage} />
        </div>
      </div>
    </>
  );
};

export default UserMessage;
