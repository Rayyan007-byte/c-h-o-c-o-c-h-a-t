import { useState, useRef } from "react";
import { IoAddSharp } from "react-icons/io5";
import CreateGroup from "../../specific/CreateGroup";

const DraggableBox = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [ShowAdd, setShowAdd] = useState(false);
  const dragStartedAt = useRef({ x: 0, y: 0 });

  const startDrag = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    dragStartedAt.current = { x: e.clientX, y: e.clientY };
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const stopDrag = (e) => {
    setIsDragging(false);

    // Check if movement was small = it's a click, not a drag
    const dx = Math.abs(e.clientX - dragStartedAt.current.x);
    const dy = Math.abs(e.clientY - dragStartedAt.current.y);

    if (dx < 5 && dy < 5) {
      // very little movement: treat it as a click
      toggleHandle();
    }
  };

  const toggleHandle = () => {
    setShowAdd((prev) => !prev);
  };

  return (
    <>
      <div
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          backgroundColor: "orangered",
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: "grab",
          borderRadius: "4px",
          userSelect: "none",
        }}
      >
        <IoAddSharp className="text-4xl pointer-events-none" />
      </div>

      {ShowAdd && (
        <div className="w-[100%] h-[100%] border">
          {" "}
          <CreateGroup />{" "}
        </div>
      )}
    </>
  );
};

export default DraggableBox;
