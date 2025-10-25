import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-10 bg-orange-950">
      <Link to="/chat" className="text-white">
        <h1>Chat</h1>
      </Link>
      <Link className="text-white">
        <h1>Profie</h1>
      </Link>
    </div>
  );
};

export default Navbar;
