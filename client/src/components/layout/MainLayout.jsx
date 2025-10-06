import axios from "axios";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ChatList from "../../pages/ChatList";
import DraggableBox from "./DraggableBox";
import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";

const MainLayout = () => (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    const socket = useSocket();
    // console.log("socket", socket);

    useEffect(() => {
      if (!socket) return;
      socket.on("connect", () => {
        console.log("new user connected", socket.id);
      });
      return () => {
        socket.off("connect");
      };
    }, [socket]);
    const logoutHandler = async () => {
      await axios.get("http://localhost:3000/api/v1/user/log-out", {
        withCredentials: true,
      });
      navigate("/");
    };

    return (
      <>
        <div>
          <h1>Header</h1>

          <h1>Footer</h1>
        </div>

        <div className="h-screen bg-orange-950 flex items-center justify-center p-4 relative">
          <div className=" backdrop-blur-md bg-white/10 border rounded-lg shadow-xl max-w-4xl w-full text-white flex h-[90%] divide-x divide-white/10">
            <div className="w-[40%] ">
              <div className=" bottom-20 right-0 ">
                <DraggableBox />
              </div>

              <ChatList />
              {/* my profile temprorry */}
              <div className="mt-50">{/* <MyProfile /> */}</div>
              <div className="absolute bottom-0 h-10 w-[40%] flex gap-0.5 ">
                <Link
                  to="/me"
                  className="w-[70%] bg-white/30 hover:bg-white/10 flex items-center justify-center text-2xl font-semibold text-orange-950 rounded"
                >
                  <IoSettingsOutline />
                </Link>
                <div className="w-[30%] bg-white/30 hover:bg-white/10 flex items-center justify-center text-2xl font-semibold text-orange-950 rounded">
                  <MdLogout onClick={logoutHandler} />
                </div>
              </div>
            </div>
            <div className="w-[60%]">
              <WrappedComponent {...props} />
            </div>
          </div>
        </div>
      </>
    );
  };
};

export default MainLayout;
