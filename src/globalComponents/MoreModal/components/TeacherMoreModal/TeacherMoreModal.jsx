import React from "react";
import moment from "moment";
import "moment/locale/az";

const TeacherMoreModal = ({ teachersModalData }) => {
  let courses =
    Array.isArray(teachersModalData.courses) &&
    teachersModalData.courses.length > 0
      ? teachersModalData.courses
          .map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "boş";

  const dataList1 = [
    { title: "Ad soyad", value: teachersModalData?.fullName },
    { title: "Fin kod", value: teachersModalData?.fin },
    { title: "Seriya nömrəsi", value: teachersModalData?.seria },
    {
      title: "Doğum günü",
      value: teachersModalData?.birthday
        ? moment(teachersModalData.birthday).locale("az").format("DD MMMM YYYY")
        : "",
    },
    { title: "Mobil nömrə", value: teachersModalData?.phone },
    { title: "Email", value: teachersModalData?.email },
  ];
  const dataList2 = [
    { title: "İxtisaslar", value: courses },
    { title: "Status", value: teachersModalData?.status ? 'Aktiv' : 'Deaktiv' },
    {
      title: "Qoşulma tarixi",
      value: teachersModalData?.createdAt
        ? moment(teachersModalData.createdAt)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
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
      <div className="more-modal-work-inform">
        <h2>İş məlumatları</h2>
        <div className="work-inform-con">
          {dataList2.map((item, index) => (
            <h3 key={index}>
              {item.title}: <span>{item.value}</span>
            </h3>
          ))}
        </div>
      </div>
    </>
  );
};

export default TeacherMoreModal;
