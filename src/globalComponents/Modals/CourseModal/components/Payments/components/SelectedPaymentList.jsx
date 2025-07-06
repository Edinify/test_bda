import React, { useState } from "react";
import  MinusIcon  from "../../../../../../assets/icons/minus-cirlce.svg?react";
import { useCustomHook } from "../../../../../GlobalFunctions/globalFunctions";
import { TextField } from "@mui/material";

const SelectedPaymentList = (deleteData, modalData) => {
  const { paymentTypeList } = useCustomHook();

  // // console.log(modalData.payments);
  return (
    <ul className="category-list courses-li">
      {modalData?.payments?.map((item, index) => (
        <li key={item.paymentType}> 
          <div className="top">
            {`${index + 1}. ${paymentTypeList.find((item) => item.key === item.paymentType).name}`}
            <div className="minus-icon-con">
              <MinusIcon
                className="minus-icon"
                onClick={() => deleteData(item.paymentType)}
              />
            </div>
          </div>
          <div className="input-box">
            <TextField
              sx={{
                "& input": { fontSize: "12px" },
                marginTop: "16px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
                shrink: item.payment ? true : false,
              }}
              fullWidth
              label="Səlahiyyət"
              autoComplete="off"
              type="number"
              value={item.payment ? item.payment : ""}
              onChange={(e) => {}}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SelectedPaymentList;
