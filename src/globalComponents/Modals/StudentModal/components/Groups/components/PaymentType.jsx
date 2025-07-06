import React, { useState } from "react";
import { TextField } from "@mui/material";
import DropdownIcon from "../../../../components/DropdownIcon/DropdownIcon";

const PaymentType = ({ formik, data, addPaymentType }) => {
  const inputValue = data?.payment?.paymentType || "";
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    addPaymentType(item);
    setOpenDropdown(false);
  };

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
              label="Ödəniş növü"
              autoComplete="off"
              disabled={
                data?.payments?.find((item) => item.status !== "wait")
                  ? true
                  : false
              }
              value={inputValue}
              onBlur={() => formik.setFieldTouched("paymentType", true)}
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
            {data.group?.course?.payments?.map((item) => (
              <li key={item.paymentType} onClick={() => addData(item)}>
                <h4>
                  {item.paymentType}, ödəniş: {item.payment}{" "}
                  {`(${item.part} hissəli
                  )`}
                </h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {formik.errors.paymentType && formik.touched.paymentType && (
        <small className="validation-err-message">
          {formik.errors.paymentType}
        </small>
      )}
    </>
  );
};

export default PaymentType;
