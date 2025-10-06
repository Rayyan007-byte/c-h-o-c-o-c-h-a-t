import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import ChatList from "../../pages/ChatList";
import MyProfile from "../../pages/MyProfile";
import UserMessage from "../../pages/UserMessage";
import DraggableBox from "./DraggableBox";
import { sampleChats } from "../constants/SampleData";

const AppLayout = () => {
  return (
    <div className="h-screen bg-orange-950 flex items-center justify-center p-4 relative">
      <div className=" backdrop-blur-md bg-white/10 border rounded-lg shadow-xl max-w-4xl w-full text-white flex h-[90%] divide-x divide-white/10">
        <div className="w-[40%]">
          <div className=" bottom-20 right-0 ">
            <DraggableBox />
          </div>

          <ChatList chats={sampleChats} />
          {/* my profile temprorry */}
          <div className="mt-50">
            <MyProfile />
          </div>
          <div className="absolute bottom-0 h-10 w-[40%] flex gap-0.5 ">
            <div className="w-[70%] bg-white/30 hover:bg-white/10 flex items-center justify-center text-2xl font-semibold text-orange-950 rounded">
              <IoSettingsOutline />
            </div>
            <div className="w-[30%] bg-white/30 hover:bg-white/10 flex items-center justify-center text-2xl font-semibold text-orange-950 rounded">
              <MdLogout />
            </div>
          </div>
        </div>
        <div className="w-[60%] ">
          <UserMessage />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
