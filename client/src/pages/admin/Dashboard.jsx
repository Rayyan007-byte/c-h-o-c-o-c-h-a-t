import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  MdAdminPanelSettings,
  MdGroup,
  MdOutlineMessage,
} from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import {
  SearchButton,
  SearchField,
} from "../../components/styles/StyledComponent";
import { DonoughtChart, LineChart } from "../../components/specific/Chart";

const Dashboard = () => {
  const Appbar = (
    <div
      className="
      mt-10 p-4 rounded-xl shadow-lg
      bg-white/20
      flex flex-col gap-3
      md:flex-row md:items-center md:justify-between
    "
    >
      <div className="flex items-center gap-2">
        <MdAdminPanelSettings className="text-2xl md:text-4xl" />
        <h1 className="text-lg md:text-xl font-semibold">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <SearchField />
        <SearchButton>Search</SearchButton>
      </div>

      <div className="text-sm md:text-base opacity-80 flex items-center gap-2">
        {moment().format("MMMM Do YYYY")}
        <IoMdNotifications />
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <main className="max-w-7xl mx-auto px-4 flex flex-col gap-6">
        {Appbar}

        {/* ================= chart  ================= */}
        <div className="flex flex-col gap-5 md:flex-row md:gap-6">
          {/* Line Chart */}
          <div className="flex-1 bg-gray-700 shadow-lg rounded-xl px-4 py-4">
            <h4 className="text-xl text-gray-200 text-center mb-3">
              Last Message
            </h4>
            <LineChart
              value={[23, 56, 33, 67, 33, 22, 33, 44, 55, 66, 77, 88]}
            />
          </div>

          {/* Doughnut Chart */}
          <div className="relative z-10 bg-gray-700 rounded-xl flex items-center justify-center p-4 md:w-[320px] text-gray-200">
            <DonoughtChart
              value={[50, 34]}
              labels={["Single Chats", "Group Chats"]}
            />

            {/* Center Icons */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none">
              <MdGroup />
              <span>Vs</span>
              <FaUser />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Widget title="Users" value={35} Icon={<FaUser />} />
          <Widget title="Chats" value={3} Icon={<MdGroup />} />
          <Widget title="Messages" value={450} Icon={<MdOutlineMessage />} />
        </div>
      </main>
    </AdminLayout>
  );
};

/* ================= WIDGET ================= */
const Widget = ({ title, value, Icon }) => (
  <div
    className="
    bg-gray-700
    p-4
    w-60
    rounded-lg
    shadow-xl
    flex flex-col
    items-center
    justify-center
    gap-4
    text-gray-200
  "
  >
    <div
      className="
      w-14 h-14
      border-2 border-lime-300
      rounded-full
      flex items-center justify-center
      text-lg font-semibold
    "
    >
      {value}
    </div>
    <div className="flex items-center gap-2">
      {Icon}
      <p>{title}</p>
    </div>
  </div>
);

export default Dashboard;
