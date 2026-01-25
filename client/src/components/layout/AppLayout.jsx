import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import ChatList from "../../pages/ChatList";
import DraggableBox from "./DraggableBox";

const AppLayout = () => {
  return (
    <div className="h-screen bg-orange-950 flex items-center justify-center p-4">
      <div className="backdrop-blur-md bg-white/10 rounded-lg shadow-xl max-w-4xl w-full text-white flex h-[90%] divide-x divide-white/10">

        {/* LEFT PANEL */}
        <div className="w-[40%] relative">
          <DraggableBox />
          <ChatList />

          <div className="absolute bottom-0 h-10 w-full flex gap-0.5">
            <Link
              to="/me"
              className="w-[70%] bg-white/30 hover:bg-white/10 flex items-center justify-center text-2xl text-orange-950 rounded"
            >
              <IoSettingsOutline />
            </Link>

            <button
              className="w-[30%] bg-white/30 hover:bg-white/10 flex items-center justify-center text-2xl text-orange-950 rounded"
            >
              <MdLogout />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL (DYNAMIC) */}
        <div className="w-[60%]">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AppLayout;
