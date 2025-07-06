import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";
import { getAllRoomsAction } from "../../../../../redux/actions/roomsActions";
import { ROOMS_ALL_ACTIONS_TYPE } from "../../../../../redux/actions-type";

const RoomList = ({ formik, modalData, updateModalState }) => {
  const dispatch = useDispatch();
  const { rooms: dataList } = useSelector((state) => state.roomsPagination);
  const inputValue = modalData?.room?.name || "";
  const [openDropdown, setOpenDropdown] = useState(false);

  const addData = (item) => {
    updateModalState("room", item);
    setOpenDropdown(false);
  };

  useEffect(() => {
    dispatch(getAllRoomsAction());

    return () => {
      dispatch({
        type: ROOMS_ALL_ACTIONS_TYPE.RESET_ROOMS_PAGINATION,
      });
    };
  }, []);
  return (
    <>
      <div className="class-input">
        <div className="dropdown-input">
          <div className="input-box">
            <TextField
              sx={{
                "& input": {
                  fontSize: "12px",
                  marginRight: "32px",
                },
                marginTop: "24px",
                // marginBottom: "24px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label="Otaqlar"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("room", true)}
            />
            <DropdownIcon
              setOpenDropdown={setOpenDropdown}
              openDropdown={openDropdown}
            />
          </div>

          <ul
            className={`dropdown-body where-coming ${
              openDropdown ? "active" : ""
            }`}
          >
            {dataList.map((item) => (
              <li key={item._id} onClick={() => addData(item)}>
                <h4>{item.name}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {formik.errors.course && formik.touched.course && (
        <small className="validation-err-message">{formik.errors.room}</small>
      )}
    </>
  );
};

export default RoomList;
