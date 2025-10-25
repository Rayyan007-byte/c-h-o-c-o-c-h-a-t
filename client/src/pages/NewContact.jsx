import { IoIosArrowRoundBack, IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const NewContact = () => {
  const [AllUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const fetchAllUsers = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/get-users",
        { withCredentials: true }
      );
      console.log("userssss", res.data.allUsers);
      setAllUsers(res.data.allUsers);
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
          className="w-full mb-2 p-1 border border-gray-300 rounded"
        />

        {/* Scrollable User List */}
        <div className="flex-1 overflow-y-auto border p-1 space-y-2">
          {AllUsers?.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center h-10 bg-white/10 rounded px-2"
            >
              {user.name}
              <IoMdAdd
                className="text-2xl hover:bg-amber-950 rounded-lg"
                onClick={() => sendRequest(user._id)}
              />
            </div>
          ))}
        </div>

        <button
          className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 mt-4 w-full"
          onClick={() => setShowGroupForm(false)}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default MainLayout()(NewContact);
