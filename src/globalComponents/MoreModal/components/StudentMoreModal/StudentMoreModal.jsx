import React from "react";
import moment from "moment";
import "moment/locale/az";
import { useCustomHook } from "../../../GlobalFunctions/globalFunctions";

const StudentMoreModal = ({ studentsModalData }) => {
  let courses =
    Array.isArray(studentsModalData?.courses) &&
    studentsModalData?.courses.length > 0
      ? studentsModalData?.courses
          .map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "boş";
  const { whereComingList,whereSendList, discountReasonList } =
    useCustomHook();
  const dataList1 = [
    { title: "Ad soyad", value: studentsModalData?.fullName },
    { title: "Fin kod", value: studentsModalData?.fin },
    { title: "Seriya nömrəsi", value: studentsModalData?.seria },
    {
      title: "Doğum günü",
      value: studentsModalData?.birthday
        ? moment(studentsModalData?.birthday)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
    { title: "Mobil nömrə", value: studentsModalData?.phone },
    {
      title: "Bizi haradan eşitdiniz?",
      value: whereComingList?.find(
        (item) => item.key === studentsModalData?.whereComing
      )?.name,
    },
    {
      title: "Haradan gəliblər?",
      value: whereSendList?.find(
        (item) => item.key === studentsModalData?.whereSend
      )?.name,
    },
    { title: "İxtisaslar", value: courses },
  ];
 

  return (
    <>
      <div className="more-modal-header-inform">
        {dataList1.map((item, index) => (
          <h3 key={index}>
            {item.title}: <span>{item.value}</span>
          </h3>
        ))}
      </div>

      {studentsModalData.groups.map((item) => (
        <div key={item.group._id} className="more-modal-work-inform">
          <h2>Qrup adi: {item.group.name}</h2>
          <div className="work-inform-con">
            <h3>
              Yekun məbləğ: <span>{item.totalAmount}</span>
            </h3>
            <h3>
              Ödəniş: <span>{item.amount}</span>
            </h3>
            <h3>
              Ödəmə növü: <span>{item.paymentType} hissəli</span>
            </h3>
            <h3>
              Endirim növü:{" "}
              <span>
                {
                  discountReasonList.find(
                    (data) => data.key === item?.discountReason
                  )?.name
                }
              </span>
            </h3>
            <h3>
              Endirim %: <span>{item.discount}</span>
            </h3>
            <h3>
              Müqavilə başlama tarixi:{" "}
              <span>
                {item?.contractStartDate
                  ? moment(item?.contractStartDate)
                      .locale("az")
                      .format("DD MMMM YYYY")
                  : ""}
              </span>
            </h3>
            <h3>
              Müqavilə bitmə tarixi:{" "}
              <span>
                {item?.contractEndDate
                  ? moment(item?.contractEndDate)
                      .locale("az")
                      .format("DD MMMM YYYY")
                  : ""}
              </span>
            </h3>
            <h3>
              Təhsil dərəcəsi: <span>{item.degree}</span>
            </h3>

            <h3>
              Status: <span>{item.status ? "Davam edir" : "Məzun"}</span>
            </h3>
          </div>
        </div>
      ))}
    </>
  );
};

export default StudentMoreModal;
