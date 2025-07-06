import React from "react";
import moment from "moment";
import "moment/locale/az";
import { useCustomHook } from "../../../GlobalFunctions/globalFunctions";

const TuitionFeeMoreModal = ({ tuitionFeeModalData }) => {
  const { discountReasonList } = useCustomHook();
  const dataList1 = [
    { title: "Tələbə", value: tuitionFeeModalData?.fullName },
    { title: "Mobil nömrə", value: tuitionFeeModalData?.phone },
    {
      title: "Status",
      value: tuitionFeeModalData.status ? "Davam edir" : "Məzun",
    },
  ];
  const dataList2 = [
    {
      title: "Qrup",
      value: `${tuitionFeeModalData.group.name} - ${tuitionFeeModalData.group.course.name}`,
    },

    { title: "Məbləğ", value: tuitionFeeModalData.amount },
    { title: "Yekun Məbləğ", value: tuitionFeeModalData.totalAmount },
    {
      title: "Ödəmə növü:",
      value: `${tuitionFeeModalData.paymentType} hissəli`,
    },
    { title: "Endirim %", value: tuitionFeeModalData.discount },
    {
      title: "Endirim növü",
      value:
        discountReasonList.find(
          (item) => item.title === tuitionFeeModalData?.discountReason
        )?.name || "",
    },
    {
      title: "Müqavilə başlama tarixi",
      value: tuitionFeeModalData?.contractStartDate
        ? moment(tuitionFeeModalData?.contractStartDate)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
    {
      title: "Müqavilə bitmə tarixi",
      value: tuitionFeeModalData?.contractEndDate
        ? moment(tuitionFeeModalData?.contractEndDate)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
  ];

  // // console.log(tuitionFeeModalData);
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
        <h2>Ödəniş məlumatları</h2>
        <div className="work-inform-con">
          {dataList2.map((item, index) => (
            <h3 key={index}>
              {item?.title}: <span>{item?.value}</span>
            </h3>
          ))}
        </div>
      </div>

      <div className="more-modal-work-inform">
        <h2>Ödənişlər</h2>
        <div className="work-inform-con">
          {tuitionFeeModalData.payments.map((item, index) => (
            <h3 key={index}>
              {/* {item?.title}: <span>{item?.value}</span> */}
              Məbləğ: {item.payment} <br />
              Tarix:{" "}
              {item.paymentDate
                ? moment(item.paymentDate).locale("az").format("DD MMMM YYYY")
                : ""}{" "}
            </h3>
          ))}
        </div>
      </div>
    </>
  );
};

export default TuitionFeeMoreModal;
