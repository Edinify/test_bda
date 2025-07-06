import { TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";


export default function InputField({
  formik,
  setInputValue,
  modalData,
  inputName,
  updateModalState,
}) {
  const [shrink, setShrink] = useState(false);
  const inputData = [
    {
      inputName: "studentName",
      label: "Tələbə adı",
      type: "text",
      marginTop: "0",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : (modalData[inputName] === 0 ? "0" : '')  ,
    },
    // {
    //   inputName: "groupNumber",
    //   label: "Qrup Nömrəsi",
    //   type: "text",
    //   marginTop: "24px",
    //   marginBottom: "0",
    //   inputValue: modalData[inputName] ? modalData[inputName] : (modalData[inputName] === 0 ? "0" : '')  ,
    // },
    {
      inputName: "instructor",
      label: "İnstruktor",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : (modalData[inputName] === 0 ? "0" : '')  ,
    },
    {
      inputName: "status",
      label: "Status",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : (modalData[inputName] === 0 ? "0" : '')  ,
    },
    {
      inputName: "contractType",
      label: "Müqavilə növü",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : (modalData[inputName] === 0 ? "0" : '')  ,
    },
    {
      inputName: "discount",
      label: "Endirim %",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : (modalData[inputName] === 0 ? "0" : '')  ,
    },
    {
      inputName: "price",
      label: "Məbləğ",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : (modalData[inputName] === 0 ? "0" : '')  ,
    },
    {
      inputName: "finalPrice",
      label: "Yekun Məbləğ",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : (modalData[inputName] === 0 ? "0" : '')  ,
    },
    {
      inputName: "amountPaid",
      label: "Ödənilmiş məbləğ",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : (modalData[inputName] === 0 ? "0" : '')  ,
    },

    {
      inputName: "remainder",
      label: "Qalıq",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : (modalData[inputName] === 0 ? "0" : '')  ,
    },
    {
      inputName: "fin",
      label: "Fin kodu",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : (modalData[inputName] === 0 ? "0" : '')  ,
    },
    {
      inputName: "phone",
      label: "Nömrəsi",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : (modalData[inputName] === 0 ? "0" : '')  ,
    },
    {
      inputName: "startDate",
      label: "Dərs baş. tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        modalData[inputName] && inputName === "startDate"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
    },
  ];

  return (
    <div className={inputName === "password" ? "password-input" : ""}>
      <TextField
        sx={{
          "& input": {
            fontSize: "12px",
            paddingRight: inputData.find((item) => item.inputName === inputName)
              ?.paddingRight,
          },
          marginTop: inputData.find((item) => item.inputName === inputName).marginTop || '0',
        }}
        InputLabelProps={{
          shrink:
            inputName === "startDate"
              ? true
              : inputData.find((item) => item.inputName === inputName)
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

      {formik.errors[inputName] && formik.touched[inputName] && (
        <small className="validation-err-message">
          {formik.errors[inputName]}
        </small>
      )}
    </div>
  );
}
