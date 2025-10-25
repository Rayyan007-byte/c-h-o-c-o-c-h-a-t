import React from "react";
import MainLayout from "../components/layout/MainLayout";
import MyNotification from "../components/constants/MyNotification";

const Main = ({ ChatId }) => {
  console.log("ChatId", ChatId);

  return (
    <div className="">
      Main
      <MyNotification />
    </div>
  );
};

export default MainLayout()(Main);
