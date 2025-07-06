import {  useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import  CloseBtn  from "../../../assets/icons/Icon.svg?react";
import { Box } from "@mui/material";
import { SYLLABUS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import InputField from "./components/Inputs/InputField";

const SyllabusModal = () => {
  const dispatch = useDispatch();
  const { syllabusModalData: modalData } = useSelector(
    (state) => state.syllabusModal
  );

  // formik
  const formik = useFormik({
    initialValues: {
      name: modalData.name ? modalData.name : "",
      orderNumber: modalData?.orderNumber ? modalData?.orderNumber : "",
    },
    validationSchema: ValidationSchema,
  });
  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );

  const updateModalState = (keyName, value) => {
    setInputValue(keyName, value);
    dispatch({
      type: SYLLABUS_MODAL_ACTION_TYPE.GET_SYLLABUS_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: SYLLABUS_MODAL_ACTION_TYPE.GET_SYLLABUS_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con teacher-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{modalData?._id ? "Sillabus yenilə" : "Sillabus yarat"}</h2>
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
              inputName="name"
              formik={formik}
              modalData={modalData}
              updateModalState={updateModalState}
            />
            <InputField
              inputName="orderNumber"
              formik={formik}
              modalData={modalData}
              updateModalState={updateModalState}
            />
          </div>
        </Box>

        {modalData?._id ? (
          <SubmitBtn formik={formik} modalData={modalData} funcType="update" />
        ) : (
          <SubmitBtn formik={formik} modalData={modalData} funcType="create" />
        )}

        {modalData?._id && (
          <div className="joined-time">
            Qoşuldu: {moment(modalData.createdAt).format("YYYY.MM.DD")}
          </div>
        )}
      </div>
    </div>
  );
};

export default SyllabusModal;
