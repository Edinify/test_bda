import React from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  COURSES_MODAL_ACTION_TYPE,
  EVENTS_MODAL_ACTION_TYPE,
} from "../../../../redux/actions-type";

export default function InputField({
  setInputValue,
  setCategoryItem,
  modalData,
  formik,
  inputName,
  categoryItem,
}) {
  const dispatch = useDispatch();
  const labelArr = [
    { name: "eventName", label: "Tədbir adı", type: "string" },
    { name: "visitor", label: "Qonaq", type: "string" },
    { name: "speaker", label: "Spiker", type: "string" },
    { name: "place", label: "Məkan", type: "string" },
    { name: "targetAudience", label: "Hədəf kütlə", type: "string" },
    { name: "community", label: "Kütlə", type: "string" },
    { name: "category", label: "Səviyyə", type: "string" },
    { name: "participantsCount", label: "İştirakçı sayı", type: "number" },
    { name: "budget", label: "Büdcə", type: "number" },
  ];
  const inputValue = modalData[inputName] || "";

  const OnHandleChange = (e) => {
    dispatch({
      type: EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL,
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
          marginTop: inputName === "name" ? "15px" : "20px",
        }}
        InputLabelProps={{
          style: { fontSize: "12px", color: "#3F3F3F" },
        }}
        autoComplete="off"
        fullWidth
        label={labelArr.find((item) => item.name === inputName)?.label}
        type={labelArr.find((item) => item.name === inputName)?.type}
        id={inputName}
        name={inputName}
        variant="outlined"
        value={inputValue}
        onChange={(e) => OnHandleChange(e)}
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
