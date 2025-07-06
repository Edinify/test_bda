import React from "react";

const Status = ({
  updatedResultData,
  setUpdatedResultData,
  futureLesson,
  user,
}) => {
  const confirmedStatusList = [
    { status: "unviewed", label: "Baxılmayıb" },
    { status: "confirmed", label: "Təsdiqlənib" },
    { status: "cancelled", label: "İmtina edilib" },
  ];
  return (
    <>
      {user?.role !== "teacher" && (
        <div className="modal-select">
          <ul>
            {confirmedStatusList.map((item, i) => (
              <li
                key={i}
                className={
                  item.status === updatedResultData.status
                    ? "active"
                    : futureLesson
                    ? "disabled"
                    : "none"
                }
                onClick={() =>
                  setUpdatedResultData({
                    ...updatedResultData,
                    status: item.status,
                  })
                }
                id={item.status}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Status;
