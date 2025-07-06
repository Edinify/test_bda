import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import CloseBtn  from "../../../assets/icons/Icon.svg?react";
import {
  LEAD_MODAL_ACTION_TYPE,
} from "../../../redux/actions-type";
import InputField from "./components/InputField/InputField";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import { useFinanceCustomHook } from "../../../Pages/FinancePage/utils";

export const LeadModal = () => {
  const dispatch = useDispatch();
  const { deleteIncome } = useFinanceCustomHook();
  const { leadModalData } = useSelector((state) => state.leadModal);

  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const inputNameArr = ["count", "date",];

  // formik
  const formik = useFormik({
    initialValues: {
      count: leadModalData?.count || "",
      date: leadModalData?.date || "",
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

  const deleteItem = () => {
    deleteIncome(leadModalData._id);
    // dispatch({
    //   type: INCOMES_MODAL_ACTION_TYPE.GET_INCOMES_MODAL,
    //   payload: { data: {}, openModal: false },
    // });
  };
  const updateModalState = (keyName, value) => {
    dispatch({
      type: LEAD_MODAL_ACTION_TYPE.GET_LEAD_MODAL,
      payload: {
        data: { ...leadModalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: LEAD_MODAL_ACTION_TYPE.GET_LEAD_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  useEffect(() => {
    setInputValue();
  }, []);

  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>
            {leadModalData?._id ? "Lead sayını yenilə" : "Lead sayı əlavə et"}
          </h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="create-update-modal-form">
            <div className="lead  ">
            {inputNameArr.map((name, index) => (
              <InputField
                key={index}
                inputName={name}
                leadModalData={leadModalData}
                updateModalState={updateModalState}
                formik={formik}
                setInputValue={setInputValue}
              />
            ))}
            </div>
            
          </div>
        </Box>

        {leadModalData?._id ? (
          <SubmitBtn
            formik={formik}
            funcType="update"
            leadModalData={leadModalData}
            setShowDeleteModal={setShowDeleteModal}
          />
        ) : (
          <SubmitBtn
            formik={formik}
            funcType="create"
            leadModalData={leadModalData}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
        {showDeleteModal && (
          <DeleteItemModal
            setShowDeleteModal={setShowDeleteModal}
            deleteItem={deleteItem}
          />
        )}
      </div>
    </div>
  );
};
