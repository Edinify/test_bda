import React from "react";
import { useCustomHook } from "../../GlobalFunctions/globalFunctions";
import { TableColumns } from "./TableColumns";

const TableBody = () => {
  const { lessonHours } = useCustomHook();


  return (
    <tbody>
      {lessonHours.map((time, index) => (
        <TableColumns key={index} time={time} />
      ))}
    </tbody>
  );
};

export default TableBody;
