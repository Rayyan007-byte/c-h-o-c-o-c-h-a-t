import React from "react";
import MainLayout from "../components/layout/MainLayout";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const Group = () => {
  return (
    <>
      <Link
        to="/main"
        className="h-10 w-10 hover:bg-orange-950 flex items-center justify-center m-2 rounded-full"
      >
        <IoIosArrowRoundBack className="text-3xl" />
      </Link>
      <div className="absolute top-40  bg-white/5 border border-amber-400 rounded-lg p-4 shadow-lg w-64 z-50">
        <h2 className="text-lg font-semibold mb-2">New Contact</h2>
        <input
          type="text"
          placeholder="Group Name"
          className="w-full mb-2 p-1 border border-gray-300 rounded"
        />
        <div className="flex justify-between items-center py-2 ">
          <p>sarkar</p>
          <IoMdAdd className="text-2xl" />
        </div>
        <button
          className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 mt-4"
          onClick={() => setShowGroupForm(false)}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default MainLayout()(Group);
