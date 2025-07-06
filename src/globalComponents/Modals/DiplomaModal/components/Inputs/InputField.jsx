import { TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import az from "date-fns/locale/az";

export default function InputField({ modalData, inputName, updateModalState }) {
  const [shrink, setShrink] = useState(false);

  registerLocale("az", az);

  console.log(modalData, "modal");

  const renderDatePicker = (dateName, label) => (
    <div className="render-datepicker">
      <label>{label}</label>

      <DatePicker
        selected={modalData[dateName] ? new Date(modalData[dateName]) : null}
        onChange={(date) => updateModalState(dateName, date)}
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
  const inputData = [
    {
      inputName: "fullName",
      label: "Tələbə adı",
      type: "text",
      marginTop: "24px",
      marginBottom: "0px",
      inputValue: modalData[inputName] || "",
    },

    {
      inputName: "seria",
      label: "Seria",
      type: "text",
      marginTop: "24px",
      marginBottom: "0px",
      inputValue: modalData[inputName] || "",
    },

    {
      inputName: "group",
      label: "group",
      type: "text",
      marginTop: "24px",
      marginBottom: "0px",
      inputValue: modalData[inputName] ? modalData[inputName].name : "",
    },

    {
      inputName: "diplomaDate",
      label: "Tarix",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        modalData[inputName] && inputName === "diplomaDate"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
      className: "birthday-input",
    },
  ];

  return (
    <div
      className={
        inputData.find((item) => item.inputName === inputName).className
      }
    >
      {inputName === "diplomaDate" ? (
        renderDatePicker(inputName, "Tarix")
      ) : (
        <TextField
          sx={{
            "& input": {
              fontSize: "12px",
              paddingRight: inputData.find(
                (item) => item.inputName === inputName
              )?.paddingRight,
            },
            marginTop: inputData.find((item) => item.inputName === inputName)
              .marginTop,
            marginBottom: inputData.find((item) => item.inputName === inputName)
              ?.marginBottom,
          }}
          InputLabelProps={{
            shrink:
              inputName === "diplomaDate"
                ? true
                : inputData.find((item) => item.inputName === inputName)
                    .inputValue
                ? true
                : shrink,
            style: {
              fontSize: "12px",
              color: "#3F3F3F",
              marginBottom: inputData.find(
                (item) => item.inputName === inputName
              ).marginBottom,
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
            setShrink(!!e.target.value);
          }}
          onFocus={() => setShrink(true)}
          disabled={
            inputName === "fullName" ||
            inputName === "seria" ||
            inputName === "group"
          }
        />
      )}
    </div>
  );
}
