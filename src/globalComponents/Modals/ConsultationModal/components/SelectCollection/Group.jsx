import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";
import { getGroupsAction } from "../../../../../redux/actions/groupsActions";
import { ALL_GROUPS_ACTION } from "../../../../../redux/actions-type";

const Group = ({ formik, modalData, updateModalState }) => {
  const dispatch = useDispatch();
  const { allGroups: dataList } = useSelector((state) => state.allGroups);

  const inputValue =
    modalData?.group === "newGroup"
      ? "Yeni qrup"
      : modalData?.group?.name || "";
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    updateModalState("group", item);
    setOpenDropdown(false);
  };

  useEffect(() => {
    setOpenDropdown(false);
  }, [modalData?.course]);

  useEffect(() => {
    if (openDropdown)
      dispatch(getGroupsAction("waiting", modalData?.course._id));
    else
      dispatch({
        type: ALL_GROUPS_ACTION.GET_ALL_GROUPS,
        payload: [],
      });
  }, [openDropdown]);
  console.log(modalData, "modal data");
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
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label="Yığılan Qruplar"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("group", true)}
            />
            {modalData?.course && (
              <DropdownIcon
                setOpenDropdown={setOpenDropdown}
                openDropdown={openDropdown}
              />
            )}
          </div>

          <ul
            className={`dropdown-body where-coming ${
              openDropdown ? "active" : ""
            }`}
          >
            <li onClick={() => addData("newGroup")}>
              <h4>Yeni qrup</h4>
            </li>
            {dataList.map((item) => (
              <li
                key={item._id}
                style={{
                  display: "flex",
                }}
                onClick={() => addData(item)}
              >
                <li>
                  <h4>{item.name}</h4>
                </li>

                <ul
                  style={{ display: "flex", gap: "10px", marginLeft: "20px" }}
                >
                  {item?.lessonDate?.map((item, i) => (
                    <li key={i}>
                      {item?.day || "-"} gün / {item?.startTime || ""}-
                      {item?.endTime || ""}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {formik.errors.course && formik.touched.course && (
        <small className="validation-err-message">{formik.errors.course}</small>
      )}
    </>
  );
};

export default Group;
