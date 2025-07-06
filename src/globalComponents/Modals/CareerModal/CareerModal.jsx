import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import  CloseBtn  from "../../../assets/icons/Icon.svg?react";
import { Box } from "@mui/material";
import { CAREER_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import InputField from "./components/Inputs/InputField";
import WorkStatusList from "./components/WorkStatusList";

const CareerModal = () => {
  const dispatch = useDispatch();
  const { careerModalData: modalData } = useSelector(
    (state) => state.careerModal
  );

  const inputName = [
    "fullName",
    "previousWorkPlace",
    "previousWorkPosition",
    "currentWorkPlace",
    "currentWorkPosition",
  ];
  const inputName2=[
    "workStartDate",

  ]

  // // console.log(modalData,"modal data")
  // formik
  const formik = useFormik({
    initialValues: {},
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
      type: CAREER_MODAL_ACTION_TYPE.GET_CAREER_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: CAREER_MODAL_ACTION_TYPE.GET_CAREER_MODAL,
      payload: { data: {}, openModal: false },
    });
  };


  return (
    <div className="create-update-modal-con teacher-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{modalData?._id ? "Karyera yenilə" : "Karyera yarat"}</h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            width: 500,
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div  className="input-couples ">
            {inputName.map((name, index) => (
              <InputField
                key={index}
                inputName={name}
                formik={formik}
                modalData={modalData}
                updateModalState={updateModalState}
              />
            ))}
          </div>

          <div  className="input-couples birthday ">
            {inputName2.map((name, index) => (
              <InputField
                key={index}
                inputName={name}
                formik={formik}
                modalData={modalData}
                updateModalState={updateModalState}
              />
            ))}
          </div>

          <div className="create-update-modal-form">
            <WorkStatusList
            formik={formik}
            modalData={modalData}
            updateModalState={updateModalState}
            />
            {/* <WorkStatus
              formik={formik}
              modalData={modalData}
              updateModalState={updateModalState}
            /> */}
            <InputField
              inputName="portfolioLink"
              formik={formik}
              modalData={modalData}
              updateModalState={updateModalState}
            />
            <InputField
              inputName="cvLink"
              formik={formik}
              modalData={modalData}
              updateModalState={updateModalState}
            />
          </div>
        </Box>

        <div className="create-update-modal-btn-con">
          <div></div>
          <SubmitBtn formik={formik} modalData={modalData} funcType="update" />
        </div>

        {modalData?._id && (
          <div className="joined-time">
            Qoşuldu: {moment(modalData.createdAt).format("YYYY.MM.DD")}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerModal;
