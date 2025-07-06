import { TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";

export default function Payment({
  formik,
  data,
  inputName,
  addPayments,
  index,
}) {
  const [shrink, setShrink] = useState(false);
  const inputData = [
    {
      inputName: "paymentDate",
      label: "Ödəniş tarixi",
      type: "date",
      marginTop: "10px",
      marginBottom: "0",
      inputValue:
        data[inputName] && inputName === "paymentDate"
          ? moment(data[inputName]).format("YYYY-MM-DD")
          : "",
    },
    {
      inputName: "payment",
      label: "Ödəniş",
      type: "number",
      marginTop: "10px",
      marginBottom: "0",
      inputValue: data[inputName] || "",
    },
  ];

  return (
    <div>
      <TextField
        sx={{
          "& input": {
            fontSize: "12px",
          },
          marginTop:
            inputData.find((item) => item.inputName === inputName)?.marginTop ||
            "0",
        }}
        InputLabelProps={{
          shrink:
            inputData.find((item) => item.inputName === inputName)?.type ===
            "date"
              ? true
              : inputData.find((item) => item.inputName === inputName)
                  ?.inputValue
              ? true
              : shrink,
          style: {
            fontSize: "12px",
            color: "#3F3F3F",
            marginBottom: inputData.find((item) => item.inputName === inputName)
              ?.marginBottom,
          },
        }}
        fullWidth
        id={inputName}
        name={inputName}
        type={inputData.find((item) => item.inputName === inputName)?.type}
        label={inputData.find((item) => item.inputName === inputName)?.label}
        value={
          inputData.find((item) => item.inputName === inputName)?.inputValue
        }
        disabled={true}
        onWheel={(e) => e.target.blur()}
        onChange={(e) => {
          addPayments(inputName, e.target.value, index);
        }}
        onBlur={(e) => {
          formik.setFieldTouched(inputName, true);
          setShrink(!!e.target.value);
        }}
        onFocus={() => setShrink(true)}
      />

      {formik.errors[inputName] && formik.touched[inputName] && (
        <small className="validation-err-message">
          {formik.errors[inputName]}
        </small>
      )}
    </div>
  );
}
