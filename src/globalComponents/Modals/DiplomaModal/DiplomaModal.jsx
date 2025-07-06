import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  CloseBtn from "../../../assets/icons/Icon.svg?react";
import { DIPLOMA_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import InputField from "./components/Inputs/InputField";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import Status from "./components/Buttons/Status";
import Degrees from "./components/Buttons/Degrees";

const DiplomaModal = () => {
  const dispatch = useDispatch();
  const { diplomaModalData: modalData, diplomaModalLoading } = useSelector(
    (state) => state.diplomaModal
  );

  console.log(diplomaModalLoading, "diplomaModalLoading");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);

  const [selectedDegree, setSelectedDegree] = useState("");
  const [degreeOpen, setDegreeOpen] = useState(false);

  const statusList = [
    { status: "Yoxdur", label: "none" },
    { status: "Dizayna göndərilib", label: "send-design" },
    { status: "Dizayn olunub", label: "designed" },
    { status: "Çapa göndərildi", label: "send-print" },
    { status: "Akademiyadadır", label: "in-academy" },
    { status: "Diplom verilib", label: "awarded" },
  ];

  const diplomaDegrees = [
    { name: "Sertifikat", key: "certificate" },
    { name: "Adi diplom", key: "simple" },
    { name: "Şərəf diplomu", key: "honor" },
    { name: "Yoxdur", key: "none" },
  ];

  const statusDropdown = () => {
    setStatusOpen(!statusOpen);
  };

  const degreeDropdown = () => {
    setDegreeOpen(!degreeOpen);
  };

  useEffect(() => {
    if (modalData.diplomaStatus) {
      const targetStatus = statusList.find(
        (item) => item.label === modalData.diplomaStatus
      );
      setSelectedStatus(targetStatus);
    }

    if (modalData.diplomaDegree) {
      const targetDegree = diplomaDegrees.find(
        (item) => item.key === modalData.diplomaDegree
      );
      setSelectedDegree(targetDegree);
    }
  }, [modalData.diplomaStatus]);

  const statusAddData = (item) => {
    updateModalState("diplomaStatus", item.label);

    setStatusOpen(false);
    setSelectedStatus(item);
  };

  const degreeAddData = (item) => {
    updateModalState("diplomaDegree", item.key);
    setDegreeOpen(false);
    setSelectedDegree(item);
  };

  const inputArr = ["fullName", "diplomaDate", "seria", "group"];

  const updateModalState = (keyName, value) => {
    dispatch({
      type: DIPLOMA_MODAL_ACTION_TYPE.GET_DIPLOMA_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };

  const closeModal = () => {
    dispatch({
      type: DIPLOMA_MODAL_ACTION_TYPE.GET_DIPLOMA_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con teacher-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>Diplom yenilə</h2>
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
          <div className="input-couples birthday diploma ">
            {inputArr.map((name, index) => (
              <InputField
                key={index}
                inputName={name}
                modalData={modalData}
                updateModalState={updateModalState}
              />
            ))}
          </div>

          <div className="create-update-modal-btn-con demo ">
            <Status
              selectedStatus={selectedStatus}
              statusDropdown={statusDropdown}
              statusOpen={statusOpen}
              setStatusOpen={setStatusOpen}
              statusAddData={statusAddData}
              statusList={statusList}
            />
            <Degrees
              selectedDegree={selectedDegree}
              degreeDropdown={degreeDropdown}
              degreeOpen={degreeOpen}
              setDegreeOpen={setDegreeOpen}
              degreeAddData={degreeAddData}
              diplomaDegrees={diplomaDegrees}
            />
            <SubmitBtn
              // formik={formik}
              modalData={modalData}
              closeModal={closeModal}
              funcType="update"
            />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default DiplomaModal;
