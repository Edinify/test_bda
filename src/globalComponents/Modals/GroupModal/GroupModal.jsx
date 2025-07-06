import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import  CloseBtn  from "../../../assets/icons/Icon.svg?react";
import { Box } from "@mui/material";
import { GROUP_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import InputField from "./components/Inputs/InputField";
import StudentsList from "./components/SelectCollection/StudentList/StudentList";
import TeachersList from "./components/SelectCollection/TeachersList/TeachersList";
import Course from "./components/SelectCollection/Course";
import MentorsList from "./components/SelectCollection/MentorsList/MentorsList";
import LessonDateList from "./components/SelectCollection/LessonDateList/LessonDateList";
import Status from "./components/Buttons/Status";
import RoomList from "./components/SelectCollection/RoomList";

const GroupModal = () => {
  const dispatch = useDispatch();
  const { groupModalData: modalData } = useSelector(
    (state) => state.groupModal
  );
  const inputNameArr1 = ["startDate", "endDate"];

  // formik
  const formik = useFormik({
    initialValues: {
      name: modalData.name ? modalData.name : "",
      course: modalData.course,
      room: modalData.room,
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
    if (keyName === "profiles") {
      const formikValue =
        value.length > 0
          ? value?.find((item) => !item.power)
            ? ""
            : "true"
          : "";
      setInputValue("profiles", formikValue);
    } else {
      setInputValue(keyName, value);
    }
    dispatch({
      type: GROUP_MODAL_ACTION_TYPE.GET_GROUP_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: GROUP_MODAL_ACTION_TYPE.GET_GROUP_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con teacher-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{modalData?._id ? "Qrup yenilə" : "Qrup yarat"}</h2>
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
              setInputValue={setInputValue}
              modalData={modalData}
              updateModalState={updateModalState}
            />
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
            <Course
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
            <RoomList
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
            <TeachersList
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
            <MentorsList
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
            <StudentsList
              modalData={modalData}
              updateModalState={updateModalState}
            />
            <LessonDateList
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
          </div>
        </Box>

        {modalData?._id ? (
          <div className="create-update-modal-btn-con">
            <Status modalData={modalData} updateModalState={updateModalState} />
            <SubmitBtn
              formik={formik}
              modalData={modalData}
              funcType="update"
            />
          </div>
        ) : (
          <div className="create-update-modal-btn-con">
            <Status modalData={modalData} updateModalState={updateModalState} />
            <SubmitBtn
              formik={formik}
              modalData={modalData}
              funcType="create"
            />
          </div>
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

export default GroupModal;
