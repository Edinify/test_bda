import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, validateYupSchema } from "formik";
import CloseBtn  from "../../../assets/icons/Icon.svg?react";
import { Box } from "@mui/material";
import { CONSULTATION_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import InputField from "./components/Inputs/InputField";
import Course from "./components/SelectCollection/Course";
import Teacher from "./components/SelectCollection/Teacher";
import WhereComing from "./components/SelectCollection/WhereComing";
import Persona from "./components/SelectCollection/Persona";
import Knowledge from "./components/SelectCollection/Knowledge";
import CancelReason from "./components/SelectCollection/CancelReason";
import Status from "./components/SelectCollection/Status";
import Group from "./components/SelectCollection/Group";
import { validationSchema } from "./components/ValidationSchema/ValidationSchema";
import Worker from "./components/SelectCollection/Worker";

const ConsultationModal = () => {
  const dispatch = useDispatch();
  const { consultationModalData: modalData } = useSelector(
    (state) => state.consultationModal
  );
  const inputNameArr1 = ["contactDate", "studentPhone"];
  const inputNameArr2 = ["constDate", "constTime"];
  const ValidationSchema = validationSchema(modalData);

  // formik
  const formik = useFormik({
    initialValues: {
      studentName: modalData?.studentName || "",
      fin: modalData?.fin || "",
      contactDate: modalData?.contactDate || "",
      constDate: modalData?.constDate || "",
      constTime: modalData?.constTime || "",
      course: modalData?.course || "",
      group: modalData?.group || "",
      salesDate: modalData?.salesDate || "",
    },
    validationSchema: ValidationSchema,
  });
  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
        ...(key === "course" ? { group: "" } : {}),
      }),
    [formik]
  );

  const updateModalState = (keyName, value) => {
    setInputValue(keyName, value);
    dispatch({
      type: CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL,
      payload: {
        data: {
          ...modalData,
          [keyName]: value,
          ...(keyName === "course" ? { group: "" } : {}),
        },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  useEffect(() => {
    setInputValue("studentPhone", modalData?.studentPhone || "");
  }, [modalData.status, modalData?.group]);

  console.log(ValidationSchema);

  return (
    <div className="create-update-modal-con teacher-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>
            {modalData?._id ? "Konsultasiya yenilə" : "Konsultasiya yarat"}
          </h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            width: 500,
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="create-update-modal-form">
            <InputField
              inputName="studentName"
              formik={formik}
              setInputValue={setInputValue}
              modalData={modalData}
              updateModalState={updateModalState}
            />

            {modalData?._id && (
              <InputField
                inputName="fin"
                formik={formik}
                modalData={modalData}
                updateModalState={updateModalState}
              />
            )}

            <div className="input-couples birthday ">
              {inputNameArr1.map((name, index) => (
                <InputField
                  key={index}
                  inputName={name}
                  formik={formik}
                  modalData={modalData}
                  updateModalState={updateModalState}
                />
              ))}
            </div>
            <div className="input-couples birthday ">
              {inputNameArr2.map((name, index) => (
                <InputField
                  key={index}
                  inputName={name}
                  formik={formik}
                  modalData={modalData}
                  updateModalState={updateModalState}
                />
              ))}
            </div>
            <WhereComing
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
            <Course
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />

            {modalData?._id && (
              <>
                <Group
                  modalData={modalData}
                  updateModalState={updateModalState}
                  formik={formik}
                />
                <Teacher
                  modalData={modalData}
                  updateModalState={updateModalState}
                  formik={formik}
                />
                <Worker
                  modalData={modalData}
                  updateModalState={updateModalState}
                  formik={formik}
                />
                {/* <Knowledge
                  modalData={modalData}
                  updateModalState={updateModalState}
                  formik={formik}
                /> */}

                {/* <Persona
                  modalData={modalData}
                  updateModalState={updateModalState}
                  formik={formik}
                /> */}
                <InputField
                  inputName="addInfo"
                  formik={formik}
                  modalData={modalData}
                  updateModalState={updateModalState}
                />
                <Status
                  modalData={modalData}
                  updateModalState={updateModalState}
                  formik={formik}
                />
                {modalData.status === "cancelled" && (
                  <CancelReason
                    modalData={modalData}
                    updateModalState={updateModalState}
                    formik={formik}
                  />
                )}

                {modalData.status === "sold" && (
                  <div className="input-only birthday ">
                    <InputField
                      inputName="salesDate"
                      formik={formik}
                      modalData={modalData}
                      updateModalState={updateModalState}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </Box>

        {modalData?._id ? (
          // <div className="create-update-modal-btn-con">
          <SubmitBtn formik={formik} modalData={modalData} funcType="update" />
        ) : (
          // </div>
          <SubmitBtn formik={formik} modalData={modalData} funcType="create" />
        )}
      </div>
    </div>
  );
};

export default ConsultationModal;
