import React, { useRef, useState } from "react";
import "./components/table.css";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";

export const Table = () => {
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsScrolling(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
 
  };

  const handleMouseLeave = () => {
    setIsScrolling(false);
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
  };

  const handleMouseMove = (e) => {
    if (!isScrolling) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="table-container">
      <div
        className="scrolling"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ overflowX: "auto", cursor: "grab" }}
      >
        <table >
          <TableHead />
          <TableBody />
        </table>
      </div>
    </div>
  );
};
