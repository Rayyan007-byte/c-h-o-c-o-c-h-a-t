import React from "react";
import MainLayoutNew from "../components/layout/MainLayoutNew";

const MainNew = () => {
  return <div>Main Page Content</div>;
};

// ✅ CORRECT EXPORT
export default MainLayoutNew()(MainNew);
