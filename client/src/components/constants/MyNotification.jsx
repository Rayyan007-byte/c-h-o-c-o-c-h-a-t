import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import ShowNotification from "./ShowNotification";

const MyNotification = ({ message = "You have a new notifications!" }) => {
  const [Count, setCount] = useState();
  const [NotificationToggle, setNotificationToggle] = useState(false);

  useEffect(() => {
    const requestCount = async () => {
      const res = await axios(
        "http://localhost:3000/api/v1/user/get-count-request",
        { withCredentials: true }
      );
      console.log("count", res.data.pendingRequset);
      setCount(res.data.pendingRequset);
    };
    requestCount();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3 shadow-sm relative">
        <div
          className="relative cursor-pointer"
          onClick={() => setNotificationToggle((prev) => !prev)}
        >
          <MdNotifications className="text-blue-600 text-3xl hover:text-blue-700 transition-colors duration-200 transform hover:scale-110 cursor-pointer" />

          {Count > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
              {Count}
            </span>
          )}
        </div>
        <span className="text-gray-800 text-sm font-medium">{message}</span>
      </div>
      {NotificationToggle && (
        <div className="top-0">
          {" "}
          <ShowNotification />{" "}
        </div>
      )}
    </div>
  );
};

export default MyNotification;
