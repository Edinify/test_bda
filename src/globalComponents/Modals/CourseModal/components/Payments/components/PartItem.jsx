import React, { useState } from "react";
// import { ReactComponent as MinusIcon } from "../../../../../../assets/icons/minus-cirlce.svg";
import { useCustomHook } from "../../../../../GlobalFunctions/globalFunctions";
import { TextField } from "@mui/material";

const PartItem = ({ data, deleteData, addPart }) => {
  return (
    <li style={{ marginTop: "8px" }}>
      <div className="input-box">
        <TextField
          sx={{
            "& input": { fontSize: "12px" },
            marginTop: "16px",
          }}
          InputLabelProps={{
            style: { fontSize: "12px", color: "#3F3F3F" },
            shrink: data.part ? true : false,
          }}
          fullWidth
          label="Ödəniş hissəsi"
          autoComplete="off"
          type="number"
          value={data.part ? data.part : ""}
          onChange={(e) => addPart(data.paymentType, e.target.value)}
        />
      </div>
    </li>
  );
};

export default PartItem;
