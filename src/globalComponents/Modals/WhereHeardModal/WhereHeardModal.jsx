import { Box } from "@mui/material";
import CloseBtn  from "../../../assets/icons/Icon.svg?react";

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WHERE_HEARD_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { useFormik } from "formik";
import InputField from "./components/InputField";
import { ValidationSchema } from "./components/ValidationSchema";
import SubmitBtn from "./components/SubmitBtn";
import Status from "./components/Status";

const WhereHeardModal = () => {
  const dispatch = useDispatch();
  const { whereHeardModalData: modalData } = useSelector(
    (state) => state.whereHeardModal
  );

  const closeModal = () => {
    dispatch({
      type: WHERE_HEARD_MODAL_ACTION_TYPE.GET_WHERE_HEARD_MODAL,
      payload: { data: {}, openModal: false },
    });
  };


  const formik = useFormik({
    initialValues: {
      name: modalData?.name ? modalData?.name : "",
      desc: modalData.desc,
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
  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{modalData?._id ? "Reklam yenilə" : "Reklam yaradın"}</h2>
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
              inputName={"desc"}
            />
          </div>
        </Box>
        <div className="modal-status" style={{ marginTop: "20px" }}>
          <Status modalData={modalData} setInputValue={setInputValue} />
        </div>

        <SubmitBtn
          formik={formik}
          modalData={modalData}
          funcType={modalData?._id ? "update" : "create"}
        />
      </div>
    </div>
  );
};

export default WhereHeardModal;
