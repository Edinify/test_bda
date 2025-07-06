import { TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import  Eye  from "../../../../../assets/icons/eye.svg?react";
import  EyeSlash  from "../../../../../assets/icons/eye-slash.svg?react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import az from "date-fns/locale/az";

export default function InputField({
  formik,
  modalData,
  inputName,
  updateModalState,
}) {
  const [shrink, setShrink] = useState(false);
  const [viewPass, setViewPass] = useState(true);
  registerLocale("az", az);

  const renderDatePicker = (dateName, label) => (
    <div className="render-datepicker">
      <label>
        {label} <span style={{ color: "red" }}>*</span>
      </label>
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
      label: "Ad soyad",
      type: "text",
      marginTop: "0",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
      required: true,
    },
    {
      inputName: "fin",
      label: "Fin kod",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
      required: true,
    },
    {
      inputName: "seria",
      label: "Seria nömrəsi",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
      required: true,
    },
    {
      inputName: "birthday",
      label: "Doğum tarixi",
      type: "date",
      marginBottom: "0",
      inputValue:
        modalData[inputName] && inputName === "birthday"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
      className: "birthday-input",
      required: true,
    },
    {
      inputName: "phone",
      label: "Mobil nömrə",
      type: "text",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
      required: true,
    },
    {
      inputName: "email",
      label: "Email",
      type: "email",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
      required: true,
    },
    {
      inputName: "password",
      label: !modalData._id ? "Şifrə" : "Şifrəni dəyiş",
      type: viewPass ? "password" : "text",
      marginTop: "24px",
      marginBottom: "0",
      paddingRight: "50px",
      className: "password-input",
    },
  ];

  return (
    <div
      className={
        inputData.find((item) => item.inputName === inputName).className
      }
    >
      {inputName === "birthday" ? (
        renderDatePicker(inputName, "Doğum tarixi")
      ) : (
        <TextField
          sx={{
            "& input": {
              fontSize: "12px",
              paddingRight: inputData.find(
                (item) => item.inputName === inputName
              )?.paddingRight,
            },
            marginTop:
              inputData.find((item) => item.inputName === inputName)
                ?.marginTop || "0",

            "& .MuiInputLabel-root.Mui-required:after": {
              content: '" *"',
              color: "red",
              fontSize: "12px",
            },
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
              marginBottom: inputData.find(
                (item) => item.inputName === inputName
              )?.marginBottom,
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
          required={
            inputData.find((item) => item.inputName === inputName)?.required
          }
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            updateModalState(inputName, e.target.value);
          }}
          onBlur={(e) => {
            formik.setFieldTouched(inputName, true);
            setShrink(!!e.target.value);
          }}
          onFocus={() => {
            setShrink(true);
            formik.setFieldTouched(inputName, true);
          }}
        />
      )}

      {inputName === "password" && (
        <div className="modal-view-icon" onClick={() => setViewPass(!viewPass)}>
          {viewPass ? <EyeSlash /> : <Eye />}
        </div>
      )}

      {formik.errors[inputName] && formik.touched[inputName] && (
        <small className="validation-err-message">
          {formik.errors[inputName]}
        </small>
      )}
    </div>
  );
}
