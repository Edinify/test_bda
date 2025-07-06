import React from "react";
import { useSelector } from "react-redux";
import WhereHeardCard from "./WhereHeardCard";

const WhereHeardData = ({ userData }) => {
  const { whereHeardData } = useSelector((state) => state.whereHeard);

  const tableHead = [
    { id: 1, label: "Haradan eşidiblər" },
    {
      id: 2,
      label: "Açıqlama",
    },
    {
      id: 3,
      label: "Status",
    },
    { id: 4, label: "" },
  ];

  return (
    <>
      <>
        <table
          className={`details-table  courses-table ${
            userData?.power === "only-show" ? "only-show" : "update"
          } `}
        >
          <thead>
            <tr>
              {tableHead.map((head, i) => (
                <th key={i}>{head.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {whereHeardData?.map((whereHeard, i) => (
              <WhereHeardCard
                key={i}
                data={whereHeard}
                user={userData}
                mode="desktop"
                cellNumber={i + 1}
              />
            ))}
          </tbody>
        </table>
      </>
    </>
  );
};

export default WhereHeardData;
