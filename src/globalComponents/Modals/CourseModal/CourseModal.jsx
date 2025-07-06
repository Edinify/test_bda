import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import  CloseBtn  from "../../../assets/icons/Icon.svg?react";
import { Box } from "@mui/material";
import { COURSES_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { useFormik } from "formik";
import { ValidationSchema } from "./components/ValidationSchema";
import SubmitBtn from "./components/SubmitBtn";
import InputField from "./components/InputField";
import Payments from "./components/Payments/Payments";

export const CourseModal = () => {
  const dispatch = useDispatch();
  const { coursesModalData: modalData, coursesOpenModal } = useSelector(
    (state) => state.coursesModal
  );

  // formik
  const formik = useFormik({
    initialValues: {
      name: modalData?.name ? modalData?.name : "",
      payments: modalData.payments,
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

  const closeModal = () => {
    dispatch({
      type: COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{modalData?._id ? "Dərs yenilə" : "Dərs yaradın"}</h2>
          <CloseBtn onClick={closeModal} />
        </div>
        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="create-update-modal-form">
            <InputField
              setInputValue={setInputValue}
              modalData={modalData}
              formik={formik}
              inputName={"name"}
            />
            <InputField
              setInputValue={setInputValue}
              modalData={modalData}
              formik={formik}
              inputName={"lessonCount"}
            />
            <Payments modalData={modalData} formik={formik} />
          </div>
        </Box>

        <SubmitBtn
          formik={formik}
          modalData={modalData}
          funcType={modalData?._id ? "update" : "create"}
        />
      </div>
    </div>
  );
};
