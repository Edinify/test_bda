import React from "react";
import { TableHeadCells } from "./cells/TableHeadCells";
import { useCustomHook } from "../../GlobalFunctions/globalFunctions";

const TableHead = () => {
  const { weeksArr } = useCustomHook();

  return (
    <thead>
      <tr>
        {weeksArr?.map((week, index) => (
          <TableHeadCells week={week} key={index} />
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
