import { useState } from "react";
import { TextField } from "@mui/material";
import moment from "moment";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import az from "date-fns/locale/az";

export default function InputField({
  formik,
  setInputValue,
  leadModalData,
  inputName,
  updateModalState,
}) {
  const [shrink, setShrink] = useState(false);
  registerLocale("az", az);

  const renderDatePicker = (dateName,label) => (
    <div className="render-datepicker">
    <label>{label}</label>
    <DatePicker
      selected={
        leadModalData[dateName] ? new Date(leadModalData[dateName]) : null
      }
      onChange={(date) => {
        updateModalState(dateName, date);
        setInputValue(dateName, date);
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

  const inputData = [
    {
      inputName: "count",
      label: "Sayı",
      type: "number",
      // marginTop: "24px",
      marginBottom: "0",
      inputValue: leadModalData[inputName] || "",
    },

    {
      inputName: "date",
      label: "Tarixi",
      type: "date",
      // marginTop: "24px",
      marginBottom: "0",
      inputValue:
        leadModalData[inputName] && inputName === "date"
          ? moment(leadModalData[inputName]).format("YYYY-MM-DD")
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
      {inputName === "date" ? (
        renderDatePicker(inputName,"Tarixi")
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
              inputName === "date"
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
          onChange={(e) => {
            updateModalState(inputName, e.target.value);
            setInputValue(inputName, e.target.value);
          }}
          onBlur={(e) => {
            formik.setFieldTouched(inputName, true);
            setShrink(!!e.target.value);
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
