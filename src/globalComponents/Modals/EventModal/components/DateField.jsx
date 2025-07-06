import { TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import az from "date-fns/locale/az";

export default function DateField({
  formik,
  modalData,
  inputName,
  setInputValue,
  updateModalState
}) {
  const [shrink, setShrink] = useState(false);

  registerLocale("az", az);

  const inputData = [
    {
      inputName: "date",
      label: "Tarix",
      type: "date",
      inputValue:
        modalData[inputName] && inputName === "date"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
      className: "birthday-input",
    },
    {
      inputName: "time",
      label: "Saat",
      type: "time",
      inputValue: modalData[inputName] || "",
    },
  ];

  // const OnHandleChange = (e) => {
  //   dispatch({
  //     type: EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL,
  //     payload: {
  //       data: { ...modalData, [inputName]: e.target.value },
  //       openModal: true,
  //     },
  //   });
  //   setInputValue(inputName, e.target.value);
  // };

  const renderDatePicker = (dateName, label) => (
    <div className="render-datepicker">
      <label>{label}</label>
      <DatePicker
        selected={modalData[dateName] ? new Date(modalData[dateName]) : null}
        onChange={(date) => {
          updateModalState(dateName, date);
          setInputValue(dateName,date)
        }}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/yyyy"
        locale="az"
      />
    </div>
  );

  return (
    <div
      className={
        inputData.find((item) => item.inputName === inputName)?.className || ""
      }
    >
      {inputName === "date" ? (
        renderDatePicker(inputName, "Tarix")
      ) : (
        <TextField
          sx={{
            "& input": {
              fontSize: "12px",
            },
            marginTop: "24px",
            marginBottom: 0,
          }}
          InputLabelProps={{
            shrink: true,
            style: {
              fontSize: "12px",
              color: "#3F3F3F",
              marginBottom: 0,
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
          onChange={(e) => {
            updateModalState(inputName, e.target.value);
            setInputValue(inputName, e.target.value);
          }}
          onBlur={(e) => {
            formik.setFieldTouched(inputName, true);
            setShrink(!e.target.value);
          }}
          onFocus={() => setShrink(true)}
        />
      )}

      {formik.errors[inputName] && formik.touched[inputName] && (
        <small className="validation-err-message">
          {formik.errors[inputName]}
        </small>
      )}
    </div>
  );
}
