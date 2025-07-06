import { TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import az from "date-fns/locale/az";
import { useSelector } from "react-redux";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";

export default function InputField({
  formik,
  modalData,
  inputName,
  updateModalState,
}) {
  registerLocale("az", az);

  const { weeksArrFullName } = useCustomHook();
  const { selectedGroup } = useSelector((state) => state.dropdownGroup);
  const [shrink, setShrink] = useState(false);
  const { user } = useSelector((state) => state.user);

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
      inputName: "group",
      label: "Qrup",
      type: "text",
      marginTop: "0",
      marginBottom: "0",
      inputValue: selectedGroup.name,
    },
    {
      inputName: "day",
      label: "Dərs günü",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        inputName === "day"
          ? weeksArrFullName[moment(new Date(modalData.date)).day()]
          : "",
    },
    {
      inputName: "date",
      label: "Dərs tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        modalData[inputName] && inputName === "date"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
      className: "birthday-input",
    },
    {
      inputName: "startTime",
      label: "Dərs başlama saatı",
      type: "time",
      // marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
    },

    {
      inputName: "endTime",
      label: "Dərs bitmə saatı",
      type: "time",
      // marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "topic",
      label: "Dəyişikliklər",
      type: "text",
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
      {inputName === "date" ? (
        renderDatePicker(inputName, "Dərs tarixi")
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
              ?.marginTop,
            marginBottom: inputData.find((item) => item.inputName === inputName)
              ?.marginBottom,
          }}
          InputLabelProps={{
            shrink:
              inputName === "startTime" || inputName === "endTime"
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
              )?.marginBottom,
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
          disabled={
            inputName === "group" ||
            user?.role === "teacher" ||
            user?.role === "mentor" ||
            user?.role === "student"
          }
          onWheel={(e) => e.target.blur()}
          onChange={(e) => updateModalState(inputName, e.target.value)}
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
