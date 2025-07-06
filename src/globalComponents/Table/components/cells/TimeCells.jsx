import React from "react";

const TimeCells = ({ index, time }) => {
  // console.log(time)
  return (
    <td className="time" key={index}>
      {time.startTime} - {time.endTime}
    </td>
  );
};

export default TimeCells;
