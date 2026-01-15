import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiCheckMark } from "react-icons/gi";
import { IoIosArrowRoundBack, IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

const NewContact = () => {
  const [AllUsers, setAllUsers] = useState([]);
  const [Request, setRequest] = useState();
  useEffect(() => {
    const fetchAllUsers = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/get-users",
        { withCredentials: true }
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
        { withCredentials: true }
      );

      toast.success("Request sent successfully!");
    } catch (error) {
      toast.error("Failed to send request");
      console.error(error);
    }
  };
  useEffect(() => {
    const getMyRequest = async () => {
      const res = await axios(
        "http://localhost:3000/api/v1/user/get-my-request",
        { withCredentials: true }
      );
      
      const status = res.data.myrequest;
      console.log("stat", status);
      
      status.forEach((e) => {
        console.log("e",e.status);
        setRequest(e);
      });
    };
    getMyRequest();
  }, []);
console.log("Request",Request);

  return (
    <>
      <Link
        to="/main"
        className="h-10 w-10 hover:bg-orange-950 flex items-center justify-center m-2 rounded-full"
      >
        <IoIosArrowRoundBack className="text-3xl" />
      </Link>
      <div className="absolute ml-15 bg-white/5 border border-amber-400 rounded-lg p-4 shadow-lg w-100 h-[32rem] z-50 flex flex-col">
        <h2 className="text-lg font-semibold mb-2">New Contact</h2>

        <input
          type="text"
          placeholder="Group Name"
          className="w-full mb-3 p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        />

        {/* Scrollable User List */}
        <div className="flex-1 overflow-y-auto p-1 space-y-2">
          {AllUsers?.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center h-10 bg-white/10 rounded px-2"
            >
              {user.name}
              {Request == "pending" ? (
                <GiCheckMark className="text-2xl hover:bg-amber-950 rounded-lg" />
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
