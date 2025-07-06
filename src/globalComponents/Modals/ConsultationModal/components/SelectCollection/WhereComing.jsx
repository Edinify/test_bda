import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";
import { useDispatch, useSelector } from "react-redux";
import { getActiveWhereComing } from "../../../../../redux/actions/whereHeardActions";

const WhereComing = ({ formik, modalData, updateModalState }) => {
  const dispatch = useDispatch();
  // const { whereComingList: dataList } = useCustomHook();
  const { activeWhereData } = useSelector((state) => state.whereHeard);

  // console.log(activeWhereData, "activeWhereData");
  // console.log(modalData.whereComing, "modalData.whereComing");
  const inputValue =
    activeWhereData.find((item) => item._id === modalData?.whereComing?._id)
      ?.name || "";

  console.log(inputValue, "inputValue");
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    updateModalState("whereComing", item);
    setOpenDropdown(false);
  };

  useEffect(() => {
    dispatch(getActiveWhereComing());
  }, [dispatch]);
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
              label="Bizi haradan eşitdiniz?"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("whereComing", true)}
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
            {activeWhereData.map((item) => (
              <li key={item.key} onClick={() => addData(item)}>
                <h4>{item.name}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {formik.errors.whereComing && formik.touched.whereComing && (
        <small className="validation-err-message">
          {formik.errors.whereComing}
        </small>
      )}
    </>
  );
};

export default WhereComing;
