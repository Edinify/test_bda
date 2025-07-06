import React, { useState } from "react";
import MinusIcon  from "../../../../../../assets/icons/minus-cirlce.svg?react";
import { useCustomHook } from "../../../../../GlobalFunctions/globalFunctions";
import { TextField } from "@mui/material";

const PaymentItem = ({ data, deleteData, addPayment }) => {
  const { paymentTypeList } = useCustomHook();

  const paymentType = paymentTypeList.find(
    (item) => item.name === data.paymentType
  ).name;

  return (
    <li>
      <div className="top" style={{marginTop: "20px"}}>
        <span style={{ fontWeight: "bold" }}> ödəniş növü: {paymentType}</span>
        <div className="minus-icon-con">
          <MinusIcon
            className="minus-icon"
            onClick={() => deleteData(data.paymentType)}
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
            shrink: data.payment ? true : false,
          }}
          fullWidth
          label="Ümumi ödəniş"
          autoComplete="off"
          type="number"
          value={data.payment ? data.payment : ""}
          onChange={(e) => addPayment(data.paymentType, e.target.value)}
        />
      </div>
    </li>
  );
};

export default PaymentItem;
