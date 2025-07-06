import React from "react";
import moment from "moment";
import "moment/locale/az";
import { useCustomHook } from "../../../GlobalFunctions/globalFunctions";

const ConsultationMoreModal = ({ consultationModalData }) => {
  const {
    cancelReasonList,
    knowledgeList,
    constStatusList,
    whereComingList,
    personaList,
  } = useCustomHook();
  const dataList1 = [
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
  ];
  const dataList2 = [
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
  return (
    <>
      <div className="more-modal-header-inform">
        {dataList1.map((item, index) => (
          <h3 key={index}>
            {item?.title}: <span>{item?.value}</span>
          </h3>
        ))}
      </div>
      <div className="more-modal-work-inform">
        <h2>İş məlumatları</h2>
        <div className="work-inform-con">
          {dataList2.map((item, index) => (
            <h3 key={index}>
              {item?.title}: <span>{item?.value}</span>
            </h3>
          ))}
        </div>
      </div>
    </>
  );
};

export default ConsultationMoreModal;
