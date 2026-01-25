import React from "react";

const MainLayoutNew = () => (WrappedComponentNew) => {
  return (props) => {
    return (
      <div className="min-h-screen bg-orange-950 text-white p-4">
        <div className="border border-white/20 rounded-lg p-4">
          <h1 className="text-xl font-bold mb-4">Main Layout</h1>

          {/* Wrapped Page */}
          <WrappedComponentNew {...props} />
        </div>
      </div>
    );
  };
};

export default MainLayoutNew;
