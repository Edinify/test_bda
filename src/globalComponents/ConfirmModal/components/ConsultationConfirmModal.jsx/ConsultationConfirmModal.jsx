import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/az";
import { useCustomHook } from "../../../GlobalFunctions/globalFunctions";
import { useDispatch, useSelector } from "react-redux";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";
import {
  cancelConsultationChangesAction,
  confirmConsultationChangesAction,
} from "../../../../redux/actions/consultationsActions";

const ConsultationConfirmModal = () => {
  const { consultationModalData, consultationModalLoading } = useSelector(
    (state) => state.consultationModal
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [btns, setBtns] = useState(true);

  const {
    cancelReasonList,
    knowledgeList,
    constStatusList,
    whereComingList,
    personaList,
  } = useCustomHook();

  const beforeDataList = [
    { title: "Tələbə", value: consultationModalData?.studentName },
    { title: "Mobil nömrə", value: consultationModalData?.studentPhone },
    {
      title: "Persona",
      value:
        personaList.find((item) => item?.key === consultationModalData?.persona)
          ?.name || "",
    },
    {
      title: "Bizi haradan eşitdiniz?",
      value:
        whereComingList.find(
          (item) => item?.key === consultationModalData?.whereComing
        )?.name || "",
    },
    { title: "Təlimçi", value: consultationModalData?.teacher.fullName },

    { title: "İxtisas", value: consultationModalData?.course.name },
    {
      title: "Sahə biliyi",
      value:
        knowledgeList.find(
          (item) => item?.key === consultationModalData?.knowledge
        )?.name || "",
    },
    {
      title: "Əlaqə tarixi",
      value: consultationModalData?.contactDate
        ? moment(consultationModalData?.contactDate)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
    {
      title: "Konsultasiya tarixi",
      value: consultationModalData?.constDate
        ? moment(consultationModalData?.constDate)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
    {
      title: "Konsultasiya saatı",
      value: consultationModalData?.constTime,
    },
    {
      title: "Ləğv səbəbi",
      value:
        cancelReasonList.find(
          (item) => item?.key === consultationModalData?.cancelReason
        )?.name || "",
    },
    {
      title: "Əlavə məlumat",
      value: consultationModalData?.addInfo,
    },
    {
      title: "Status",
      value:
        constStatusList.find(
          (item) => item?.key === consultationModalData?.status
        )?.name || "",
    },
  ];

  const newDataList = [
    { title: "Tələbə", value: consultationModalData?.changes?.studentName },
    {
      title: "Mobil nömrə",
      value: consultationModalData?.changes?.studentPhone,
    },
    {
      title: "Persona",
      value:
        personaList.find(
          (item) => item?.key === consultationModalData?.changes?.persona
        )?.name || "",
    },
    {
      title: "Bizi haradan eşitdiniz?",
      value:
        whereComingList.find(
          (item) => item?.key === consultationModalData?.changes?.whereComing
        )?.name || "",
    },
    {
      title: "Təlimçi",
      value: consultationModalData?.changes?.teacher.fullName,
    },

    { title: "İxtisas", value: consultationModalData?.changes?.course.name },
    {
      title: "Sahə biliyi",
      value:
        knowledgeList.find(
          (item) => item?.key === consultationModalData?.changes?.knowledge
        )?.name || "",
    },
    {
      title: "Əlaqə tarixi",
      value: consultationModalData?.changes?.contactDate
        ? moment(consultationModalData?.changes?.contactDate)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
    {
      title: "Konsultasiya tarixi",
      value: consultationModalData?.changes?.constDate
        ? moment(consultationModalData?.changes?.constDate)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
    {
      title: "Konsultasiya saatı",
      value: consultationModalData?.changes?.constTime,
    },
    {
      title: "Ləğv səbəbi",
      value:
        cancelReasonList.find(
          (item) => item?.key === consultationModalData?.changes?.cancelReason
        )?.name || "",
    },
    {
      title: "Əlavə məlumat",
      value: consultationModalData?.changes?.addInfo,
    },
    {
      title: "Status",
      value:
        constStatusList.find(
          (item) => item?.key === consultationModalData?.changes?.status
        )?.name || "",
    },
  ];

  useEffect(() => {
    if (user?.role === "worker") {
      const power = user?.profiles?.find(
        (item) => item.profile === "teachers"
      )?.power;

      if (power === "update") {
        setBtns(false);
      }
    }
  });


  return (
    <>
      {(!consultationModalData?.changes?._id && (
        <h1 style={{ color: "red" }}>Heç bir yeniləmə yoxdur!</h1>
      )) || (
        <>
          <h2>Əvvəlki məlumatlar</h2>
          <div className="more-modal-header-inform">
            {beforeDataList.map((item, index) => (
              <h3 key={index}>
                {item.title}: <span>{item.value}</span>
              </h3>
            ))}
          </div>
          <div className="more-modal-work-inform">
            <div className="work-inform-con"></div>
          </div>

          <h2>Yenilənmiş məlumatlar</h2>
          <div className="more-modal-header-inform">
            {newDataList.map((item, index) => (
              <h3 key={index}>
                {item.title}:{" "}
                <span
                  style={
                    item.value !== beforeDataList[index].value
                      ? { color: "red" }
                      : {}
                  }
                >
                  {item.value}
                </span>
              </h3>
            ))}
          </div>
          {btns && (
            <div className="confirm-btns">
              <button
                className="cancel"
                style={
                  consultationModalLoading ? { backgroundColor: "#b29bff" } : {}
                }
                disabled={consultationModalLoading}
                onClick={() =>
                  dispatch(
                    cancelConsultationChangesAction(
                      consultationModalData._id,
                      consultationModalData
                    )
                  )
                }
              >
                {(consultationModalLoading && <LoadingBtn />) || "Ləğv et"}
              </button>

              <button
                className="confirm"
                style={
                  consultationModalLoading ? { backgroundColor: "#b29bff" } : {}
                }
                disabled={consultationModalLoading}
                onClick={() =>
                  dispatch(
                    confirmConsultationChangesAction(
                      consultationModalData._id,
                      consultationModalData
                    )
                  )
                }
              >
                {(consultationModalLoading && <LoadingBtn />) || "təsdiqlə"}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ConsultationConfirmModal;
