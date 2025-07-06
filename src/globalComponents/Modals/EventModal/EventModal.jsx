import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import  CloseBtn  from "../../../assets/icons/Icon.svg?react";
import { Box } from "@mui/material";
import { EVENTS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { useFormik } from "formik";
import { ValidationSchema } from "./components/ValidationSchema";
import SubmitBtn from "./components/SubmitBtn";
import InputField from "./components/InputField";
import Purpose from "./components/Purpose";
import DateField from "./components/DateField";
import Status from "./components/Status/Status";
import Products from "./components/Products/Products";

export const EventModal = () => {
  const dispatch = useDispatch();
  const { eventsModalData: modalData } = useSelector(
    (state) => state.eventModal
  );

  // // console.log(modalData, "ggggggggggggggggggggg");
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

  const closeModal = () => {
    dispatch({
      type: EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  const updateModalState = (keyName, value) => {
    dispatch({
      type: EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };

  useEffect(() => {
    formik.setValues({ ...formik.values, ...modalData });
  }, []);

  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{modalData?._id ? "Tədbir yenilə" : "Tədbir yaradın"}</h2>
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
              inputName={"eventName"}
            />{" "}
            <InputField
              setInputValue={setInputValue}
              modalData={modalData}
              formik={formik}
              inputName={"visitor"}
            />{" "}
            <InputField
              setInputValue={setInputValue}
              modalData={modalData}
              formik={formik}
              inputName={"speaker"}
            />{" "}
            <InputField
              setInputValue={setInputValue}
              modalData={modalData}
              formik={formik}
              inputName={"place"}
            />
            <div className="lead">
              <DateField
                formik={formik}
                modalData={modalData}
                inputName={"date"}
                setInputValue={setInputValue}
                updateModalState={updateModalState}
              />
              <DateField
                formik={formik}
                modalData={modalData}
                inputName={"time"}
                setInputValue={setInputValue}
                updateModalState={updateModalState}
              />
            </div>
            <InputField
              setInputValue={setInputValue}
              modalData={modalData}
              formik={formik}
              inputName={"targetAudience"}
            />
            <InputField
              setInputValue={setInputValue}
              modalData={modalData}
              formik={formik}
              inputName={"community"}
            />
            <div className="input-couples">
              <InputField
                formik={formik}
                modalData={modalData}
                inputName={"participantsCount"}
                setInputValue={setInputValue}
              />
              <InputField
                formik={formik}
                modalData={modalData}
                inputName={"budget"}
                setInputValue={setInputValue}
              />
            </div>
            <Purpose
              setInputValue={setInputValue}
              modalData={modalData}
              formik={formik}
            />
            <Products modalData={modalData} formik={formik} />
            <Status modalData={modalData} setInputValue={setInputValue} />
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
