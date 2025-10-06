import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

const CreateGroup = () => {
  // const [showGroupForm, setShowGroupForm] = useState(false);
  // const [NewContact, setNewContact] = useState(false);

  // const toggleNewContact = () => {
  //   setNewContact((prev) => !prev);
  // };
  // const toggleGroupForm = () => {
  //   setShowGroupForm((prev) => !prev);
  // };

  return (
    <>
      <div className=" h-full px-2 py-4">
        <Link to="/group" className="flex gap-3 items-center h-15 w-full">
          <div className="h-10 w-10 rounded-full bg-orange-950 text-2xl flex items-center justify-center cursor-pointer text-orange-600">
            <MdOutlineGroupAdd />
          </div>
          <h1>Create New Group</h1>
        </Link>
        <Link to="/newcontact" className="flex gap-3 items-center h-15 w-full">
          <div className="h-10 w-10 rounded-full bg-orange-950 text-2xl flex items-center justify-center cursor-pointer text-orange-600">
            <IoPersonAdd />
          </div>
          <h1>New Contact</h1>
        </Link>
      </div>

      {/* {NewContact && (
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
      )}
      {showGroupForm && (
        <div className="absolute top-40  bg-white/5 border border-amber-400 rounded-lg p-4 shadow-lg w-64 z-50">
          <h2 className="text-lg font-semibold mb-2">Create New Group</h2>
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
      )} */}
    </>
  );
};

export default CreateGroup;
