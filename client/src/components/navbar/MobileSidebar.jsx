import React, { useState } from "react";
import { MdMenu, MdCancelPresentation } from "react-icons/md";
import Sidebar from "../../pages/admin/Sidebar";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden fixed top-0 right-0 p-4 z-[1000]">

      <button
        onClick={() => setOpen(prev => !prev)}
        className="text-2xl sm:text-4xl font-bold"
      >
        {open ? <MdCancelPresentation /> : <MdMenu />}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[900]"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 h-full w-64
          bg-white/20 backdrop-blur
          border
          transition-all duration-300
          z-[1000]
          ${open ? "left-0" : "-left-64"}
        `}
      >
        <Sidebar />
      </aside>

    </div>
  );
};

export default MobileSidebar;