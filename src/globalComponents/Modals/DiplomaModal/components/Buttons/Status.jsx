import { TextField } from "@mui/material";
import React from "react";

const Status = ({
  selectedStatus,
  statusDropdown,
  statusOpen,
  setStatusOpen,
  statusAddData,
  statusList,
}) => {
  const changeOpenDropdown = () => {
    setStatusOpen(!statusOpen);
  };

  return (
    <>
      <div className="class-input status ">
        <div className="class-field">
          <TextField
            sx={{
              "& input": {
                fontSize: "12px",
                marginRight: "32px",
              },
              marginTop: "20px",
            }}
            InputLabelProps={{
              style: { fontSize: "12px", color: "#3F3F3F" },
            }}
            fullWidth
            label="Status"
            name="class"
            autoComplete="off"
            value={selectedStatus ? selectedStatus.status : ""}
            // onChange={(e) => searchData(e)}
            onClick={statusDropdown}
          />
          <div className="dropdown-icon">
            <div onClick={changeOpenDropdown}>
              <svg
                className={!statusOpen ? "down" : "up"}
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.92 9.4502L13.4 15.9702C12.63 16.7402 11.37 16.7402 10.6 15.9702L4.07999 9.4502"
                  stroke="#5D5D5D"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <ul
          className={`create-update-modal-dropdown where-coming ${
            statusOpen ? "active" : ""
          }`}
        >
          {statusList?.map((item, i) => {
            return (
              <li key={i} onClick={() => statusAddData(item)}>
                <h4>{item.status}</h4>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Status;
