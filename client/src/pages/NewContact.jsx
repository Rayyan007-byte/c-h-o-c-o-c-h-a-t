import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiCheckMark } from "react-icons/gi";
import { IoIosArrowRoundBack, IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

const NewContact = () => {
  const [AllUsers, setAllUsers] = useState([]);
  const [requestMap, setRequestMap] = useState({});

  useEffect(() => {
    const fetchAllUsers = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/get-users",
        { withCredentials: true },
      );
      console.log("userssss", res.data.newMember);
      setAllUsers(res.data.newMember);
    };
    fetchAllUsers();
  }, []);

  const sendRequest = async (userId) => {
    try {
      await axios.put(
        "http://localhost:3000/api/v1/user/send-request",
        { userId },
        { withCredentials: true },
      );
      setRequestMap((prev) => ({
        ...prev,
        [userId]: "pending",
      }));
      toast.success("Request sent successfully!");
    } catch (error) {
      toast.error("Failed to send request");
      console.error(error);
    }
  };
  useEffect(() => {
    const getMyRequest = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/get-my-request",
        { withCredentials: true },
      );

      const map = {};

      res.data.myrequest.forEach((req) => {
        const otherUser =
          req.sender === res.data.userId ? req.receiver : req.sender;

        map[otherUser] = req.status;
      });

      setRequestMap(map);
    };

    getMyRequest();
  }, []);

  return (
    <>
      <Link
        to="/main"
        className="h-10 w-10 hover:bg-orange-950 flex items-center justify-center m-2 rounded-full"
      >
        <IoIosArrowRoundBack className="text-3xl" />
      </Link>
      <div className="absolute bg-white/5 rounded-lg p-4 shadow-lg w-full max-w-[28rem] sm:max-w-[24rem] h-[32rem] z-50 flex flex-col left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-lg font-semibold mb-2 text-gray-200">New Contact</h2>

        {/* Scrollable User List */}
        <div className="flex-1 overflow-y-auto p-1 space-y-2">
          {AllUsers?.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center h-10 bg-white/10 rounded px-2"
            >
              {user.name}
              {requestMap[user._id] === "pending" ? (
                <GiCheckMark className="text-2xl text-blue-500" />
              ) : (
                <IoMdAdd
                  className="text-2xl hover:bg-amber-950 rounded-lg"
                  onClick={() => sendRequest(user._id)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainLayout()(NewContact);
