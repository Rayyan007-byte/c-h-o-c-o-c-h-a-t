import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MainLayout from "../components/layout/MainLayout";
import axios from "axios";
import { setSenderId } from "../redux/slice";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const dispatch = useDispatch();
  const [Profile, setProfile] = useState({});

  useEffect(() => {
    const fetchMe = async () => {
      const res = await axios.get("http://localhost:3000/api/v1/user/get-me", {
        withCredentials: true,
      });
      // console.log("mee", res.data.profile._id);
      dispatch(setSenderId(res.data.profile._id));
      setProfile(res.data.profile);
    };
    fetchMe();
  }, []);

  return (
    <>
      {Profile && (
        <div className="flex flex-col items-center justify-center w-full h-full relative">
          <Link to="/main" className="absolute top-0 left-0">
            back
          </Link>
          <div>{Profile.name}</div>
          <div>{Profile._id}</div>
        </div>
      )}
    </>
  );
};

export default MainLayout()(MyProfile);
