import React, { useState } from 'react'
import { useCustomHook } from '../../../GlobalFunctions/globalFunctions';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { TextField } from "@mui/material";
import CheckIcon  from "../../../../assets/icons/Checkbox.svg?react";
import DropdownIcon from '../../components/DropdownIcon/DropdownIcon';
import WorkStatusInput from './WorkStatusInput';




const WorkStatusList = ({formik,updateModalState,modalData}) => {
  const { careerModalWorkStatusList: dataList } = useCustomHook();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [profileErrMessage, setProfileErrMessage] = useState(false);

  const deleteWorkStatus = (key) => {
    if (modalData.workStatus.length === 1) {
      updateModalState("workStatus", []);
    } else {
      const workStatusData = modalData.workStatus.filter((work) => work.key !== key )
      updateModalState("workStatus", workStatusData);
    }
  };

  const addWorkStatus = () => {
    if (modalData.workStatus) {
      // the same element can't be added twice
      if (modalData.workStatus.find((item) => item === selectedItem.key)) {
        setProfileErrMessage(true);
      } else {
        const workStatusData = [...modalData?.workStatus, selectedItem];
        setProfileErrMessage(false);
        updateModalState("workStatus", workStatusData);
      }
    } else {
      const workStatusData = [selectedItem];
      setProfileErrMessage(false);
      updateModalState("workStatus", workStatusData);
    }
    setSelectedItem("");
    setOpenDropdown(false);
  };

  return (
    <div>
    <div className="dropdown-input courses">
      <div className="left">
        <div className="input-box">
          <TextField
            sx={{
              "& input": { fontSize: "12px", marginRight: "32px" },
              marginTop: "24px",
            }}
            InputLabelProps={{
              style: { fontSize: "12px", color: "#3F3F3F" },
            }}
            fullWidth
            label="İş statusu"
            autoComplete="off"
            value={selectedItem?.name || ""}
            disabled
            onClick={() => setOpenDropdown(!openDropdown)}
          />

         <DropdownIcon
            setOpenDropdown={setOpenDropdown}
            openDropdown={openDropdown}
          />
        </div>

        <ul className={`dropdown-body ${openDropdown ? "active" : ""}`}>
          {dataList?.map((item, index) => (
            <li key={item.key} onClick={() => setSelectedItem(item)}>
              {modalData?.workStatus?.find((obj) => obj === item.key) ? (
                <CheckIcon />
              ) : null}
              <h4>{item.name}</h4>
            </li>
          ))}
        </ul>
      </div>

      <div className="right">
        <button
          disabled={!selectedItem}
          onClick={() => addWorkStatus()}
          className="add-class"
        >
          <AiOutlinePlusCircle />
        </button>
      </div>
    </div>

    {formik.errors.workStatus && formik.touched.workStatus && (
      <small className="validation-err-message">
        {formik.errors.workStatus}
      </small>
    )}

    <ul className="category-list courses-li">
      {profileErrMessage ? (
        <small className="category-error-message">
          İş statusu mövcuddur.
        </small>
      ) : null}

      {modalData?.workStatus?.map((item, index) => (
        <WorkStatusInput
          key={index}
          index={index}
          data={item}
          deleteWorkStatus={deleteWorkStatus}
          modalData={modalData}
          updateModalState={updateModalState}
        />
      ))}
    </ul>
  </div>
  )
}

export default WorkStatusList