// import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setRequestId } from "../../redux/slice";

const ShowNotification = () => {
  const [NotificationDetails, setNotificationDetails] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/user/get-request",
          { withCredentials: true }
        );
        console.log("request", res.data);

        setNotificationDetails(res.data.request);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  //   accept & reject request

  const acceptRequest = async (id) => {
    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/user/accept-request",
        { requestId: id, accept: true },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error accepting request");
    }
  };

  const rejectRequest = async (id) => {
    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/user/accept-request",
        { requestId: id, accept: false },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error accepting request");
    }
  };

  return (
    <>
      {/* <Link
        to="/main"
        className="h-10 w-10 hover:bg-orange-950 flex items-center justify-center m-2 rounded-full"
      >
        <IoIosArrowRoundBack className="text-3xl" />
      </Link> */}

      <div className="absolute ml-15 bg-white/5  rounded-lg p-4 shadow-lg w-100 h-[32rem] z-50 flex flex-col">
        <h2 className="text-lg font-semibold mb-2">Notifications</h2>

        <div className="flex-1 overflow-y-auto p-1 space-y-2">
          {NotificationDetails.length > 0 ? (
            NotificationDetails.map((notif, index) => (
              <div
                key={notif._id}
                className="bg-white/10 rounded px-2 py-2 hover:bg-white/20 transition-colors"
              >
                {/* Clickable Name Row */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => {
                    setOpenIndex(openIndex === index ? null : index);
                    console.log("requestId", notif._id);
                    dispatch(setRequestId(notif._id));
                  }}
                >
                  <span className="text-sm text-gray-200 font-medium">
                    {notif.receiver?.name}
                  </span>
                </div>

                {/* Slide Down Buttons */}
                <div
                  className={`grid transition-all duration-300 overflow-hidden ${
                    openIndex === index
                      ? "grid-rows-[1fr] mt-2"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden flex gap-2">
                    <button
                      onClick={() => acceptRequest(notif._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectRequest(notif._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-sm text-gray-500">
              No new notifications
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowNotification;
