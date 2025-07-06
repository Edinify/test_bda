import { TextField } from "@mui/material";
import {  useState } from "react";

export default function InputField({
  formik,
  modalData,
  inputName,
  updateModalState,
}) {
  const [shrink, setShrink] = useState(false);
  const inputData = [
    {
      inputName: "name",
      label: "Mövzu",
      type: "text",
      marginTop: "0",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "orderNumber",
      label: "Sıra nömrəsi",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
    },
  ];

  return (
    <div
      className={
        inputData.find((item) => item.inputName === inputName)?.className || ""
      }
    >
      <TextField
        sx={{
          "& input": {
            fontSize: "12px",
            paddingRight: inputData.find((item) => item.inputName === inputName)
              ?.paddingRight,
          },
          marginTop: inputData.find((item) => item.inputName === inputName)
            .marginTop,
          marginBottom: inputData.find((item) => item.inputName === inputName)
            ?.marginBottom,
        }}
        InputLabelProps={{
          shrink: inputData.find((item) => item.inputName === inputName)
            .inputValue
            ? true
            : shrink,
          style: {
            fontSize: "12px",
            color: "#3F3F3F",
            marginBottom: inputData.find((item) => item.inputName === inputName)
              .marginBottom,
          },
        }}
        fullWidth
        id={inputName}
        name={inputName}
        type={inputData.find((item) => item.inputName === inputName).type}
        label={inputData.find((item) => item.inputName === inputName).label}
        value={
          inputData.find((item) => item.inputName === inputName)?.inputValue
        }
        onWheel={(e) => e.target.blur()}
        onChange={(e) => updateModalState(inputName, e.target.value)}
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
