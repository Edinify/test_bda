import React from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {  WHERE_HEARD_MODAL_ACTION_TYPE } from "../../../../redux/actions-type";

export default function InputField({
  setInputValue,
  modalData,
  formik,
  inputName,
}) {
  const dispatch = useDispatch();

  const inputData = [
    {
      inputName: "name",
      label: "Haradan eşidiblər",
      type: "text",
      marginTop: "24px",
      marginBottom: "0px",
      inputValue: modalData?.name || "",
    },
    {
      inputName: "desc",
      label: "Açıqlama",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData?.desc || "",
    },
  ];

  const handleChange = (e) => {
    dispatch({
      type: WHERE_HEARD_MODAL_ACTION_TYPE.GET_WHERE_HEARD_MODAL,
      payload: {
        data: { ...modalData, [inputName]: e.target.value },
        openModal: true,
      },
    });
    setInputValue(inputName, e.target.value);
  };

  return (
    <>
      <TextField
        sx={{
          "& input": {
            fontSize: "16px",
          },
          marginTop: inputData.find((item) => item.inputName === inputName)
            .marginTop,
          marginBottom: inputData.find((item) => item.inputName === inputName)
            .marginBottom,
        }}
        InputLabelProps={{
          style: { fontSize: "12px", color: "#3F3F3F" },
        }}
        autoComplete="off"
        fullWidth
        label={inputData.find((item) => item.inputName === inputName)?.label}
        type={inputData.find((item) => item.inputName === inputName)?.type}
        id={inputName}
        name={inputName}
        variant="outlined"
        value={
          inputData.find((item) => item.inputName === inputName)?.inputValue
        }
        onChange={(e) => handleChange(e)}
        onBlur={() =>
          inputName === "name" && formik.setFieldTouched(inputName, true)
        }
      />
      {inputName === "name" &&
        formik.errors[inputName] &&
        formik.touched[inputName] && (
          <small className="validation-err-message">
            {formik.errors[inputName]}
          </small>
        )}
    </>
  );
}
