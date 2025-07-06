import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import  CloseBtn  from "../../../assets/icons/Icon.svg?react";
import { Box } from "@mui/material";
import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import InputField from "./components/Inputs/InputField";
import Topic from "./components/SelectCollection/Topic";
import Teacher from "./components/SelectCollection/Teacher";
import Mentor from "./components/SelectCollection/Mentor";
// import StudentsList from "./components/SelectCollection/StudentList/StudentList";
import Status from "./components/Status/Status";
import MentorStatus from "./components/SelectCollection/MentorStatus";
import StudentStatus from "./components/StudentStatus/StudentStatus";

const LessonTableModal = () => {
  const dispatch = useDispatch();
  const { lessonTableModalData: modalData } = useSelector(
    (state) => state.lessonTableModal
  );
  const { selectedGroup } = useSelector((state) => state.dropdownGroup);
  const { user } = useSelector((state) => state.user);

  const inputNameArr1 = ["startTime", "endTime"];

  console.log(modalData, "modal dataaaa");

  // formik
  const formik = useFormik({
    initialValues: {
      group: modalData?.group || "",
      date: modalData?.date || "",
      startTime: modalData?.startTime || "",
      endTime: modalData?.endTime || "",
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
      type: LESSON_TABLE_MODAL_ACTION_TYPE.GET_LESSON_TABLE_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: LESSON_TABLE_MODAL_ACTION_TYPE.GET_LESSON_TABLE_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  useEffect(() => {
    updateModalState("group", selectedGroup._id);
  }, []);

  return (
    <div className="create-update-modal-con teacher-modal">
      <div className="create-update-modal teacher-modal ">
        <div className="create-update-modal-head">
          <h2>{modalData?._id ? "Dərs yenilə" : "Dərs yarat"}</h2>
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
              inputName="group"
              formik={formik}
              setInputValue={setInputValue}
              modalData={modalData}
              updateModalState={updateModalState}
            />
            <div
              className="input-couples birthday"
              style={{ gridTemplateColumns: "1fr" }}
            >
              <InputField
                inputName="date"
                formik={formik}
                setInputValue={setInputValue}
                modalData={modalData}
                updateModalState={updateModalState}
              />
            </div>
            <div className="input-couples birthday">
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

            <Topic
              formik={formik}
              updateModalState={updateModalState}
              modalData={modalData}
            />
            <Teacher
              formik={formik}
              updateModalState={updateModalState}
              modalData={modalData}
            />
            <Mentor
              formik={formik}
              updateModalState={updateModalState}
              modalData={modalData}
            />
            {modalData?._id &&
              user.role !== "teacher" &&
              user?.role !== "student" &&
              modalData?.topic?.name !== "Praktika" && (
                <MentorStatus
                  updateModalState={updateModalState}
                  modalData={modalData}
                />
              )}
          </div>
        </Box>

        {modalData?._id ? (
          <div className="modal-buttons">
            {(!(
              (user?.role === "mentor" &&
                modalData?.topic?.name !== "Praktika") ||
              (user?.role === "teacher" &&
                modalData?.topic?.name === "Praktika") ||
              user?.role === "student"
            ) && (
              <Status
                updateModalState={updateModalState}
                modalData={modalData}
              />
            )) ||
              (user?.role === "student" && (
                <StudentStatus
                  updateModalState={updateModalState}
                  modalData={modalData}
                />
              )) || <div></div>}

            <SubmitBtn
              formik={formik}
              modalData={modalData}
              funcType="update"
            />
          </div>
        ) : (
          <div className="modal-buttons">
            <span></span>
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

export default LessonTableModal;
