import React from "react";
import moment from "moment";
import "moment/locale/az";

const GroupMoreModal = ({ groupModalData }) => {
  // const dataList1 = [
  //   { title: "Qrup", value: groupModalData?.name },
  //   { title: "Fin kod", value: studentsModalData?.fin },
  //   { title: "Seriya nömrəsi", value: studentsModalData?.seria },
  //   {
  //     title: "Doğum günü",
  //     value: studentsModalData?.birthday
  //       ? moment(studentsModalData?.birthday)
  //           .locale("az")
  //           .format("DD MMMM YYYY")
  //       : "",
  //   },
  //   { title: "Mobil nömrə", value: studentsModalData?.phone },
  //   {
  //     title: "Bizi haradan eşitdiniz?",
  //     value: whereComingList.find(
  //       (item) => item.key === studentsModalData?.whereComing
  //     ).name,
  //   },
  //   { title: "İxtisaslar", value: courses },
  // ];
  // const dataList2 = [
  // { title: "Təhsil dərəcəsi", value: studentsModalData?.degree },
  // {
  //   title: "Müqavilə başlama tarixi",
  //   value: studentsModalData?.contractStartDate
  //     ? moment(studentsModalData?.contractStartDate)
  //         .locale("az")
  //         .format("DD MMMM YYYY")
  //     : "",
  // },
  // {
  //   title: "Müqavilə bitmə tarixi",
  //   value: studentsModalData?.contractEndDate
  //     ? moment(studentsModalData?.contractEndDate)
  //         .locale("az")
  //         .format("DD MMMM YYYY")
  //     : "",
  // },
  // { title: "Ödəniş", value: studentsModalData?.amount },
  // { title: "Yekun məbləğ", value: studentsModalData?.totalAmount },
  // {
  //   title: "Endirim növü",
  //   value: discountReasonList.find(
  //     (item) => item.key === studentsModalData?.discountReason
  //   ).name,
  // },
  // { title: "Endirim %", value: studentsModalData?.discount },
  // {
  //   title: "Ödəniş növü",
  //   value: paymentTypeList.find(
  //     (item) => item.key === studentsModalData?.paymentType
  //   ).name,
  // },
  // { title: "Qrup", value: "" },
  // {
  //   title: "Qoşulma tarixi",
  //   value: studentsModalData?.createdAt
  //     ? moment(studentsModalData?.createdAt)
  //         .locale("az")
  //         .format("DD MMMM YYYY")
  //     : "",
  // },
  // ];

  const teachers =
    Array.isArray(groupModalData.teachers) && groupModalData.teachers.length > 0
      ? groupModalData?.teachers
          .map((teacher) => {
            return teacher.fullName;
          })
          .join(", ")
      : "boş";

  const mentors =
    Array.isArray(groupModalData.mentors) && groupModalData.mentors.length > 0
      ? groupModalData.mentors
          .map((mentor) => {
            return mentor.fullName;
          })
          .join(",")
      : "boş";

  const students =
    Array.isArray(groupModalData.students) && groupModalData.students.length > 0
      ? groupModalData.students
          .map((student) => {
            return student.fullName;
          })
          .join(" , ")
      : "boş";

  const lessonDate =
    Array.isArray(groupModalData.lessonDate) &&
    groupModalData.lessonDate.length > 0
      ? groupModalData.lessonDate.map((lesson, i) => (
          <span className="lesson-date" key={i}>
            Gün: {lesson.day}, Saat: {lesson.time}{" "}
            {lesson.practical ? "(Praktika)" : ""}
            <br />
          </span>
        ))
      : "";

  // // console.log(groupModalData, "group modal data");

  return (
    <>
      <div className="more-modal-work-inform">
        <h2>Qrup adı: {groupModalData?.name}</h2>

        <div className="work-inform-con">
          <h3>
            İxtisas adı: <span> {groupModalData?.course.name} </span>{" "}
          </h3>
          <h3>
            Müəllimlər: <span> {teachers} </span>{" "}
          </h3>
          <h3>
            Mentorlar: <span> {mentors} </span>{" "}
          </h3>
          <h3>
            Tələbələr: <span> {students} </span>{" "}
          </h3>
          <h3>
            Dərs günləri: <span> {lessonDate} </span>{" "}
          </h3>

          <h3>
            Müqavilə başlama tarixi:{" "}
            <span>
              {groupModalData?.startDate
                ? moment(groupModalData?.startDate)
                    .locale("az")
                    .format("DD MMMM YYYY")
                : ""}
            </span>
          </h3>
          <h3>
            Müqavilə bitmə tarixi:{" "}
            <span>
              {groupModalData?.endDate
                ? moment(groupModalData?.endDate)
                    .locale("az")
                    .format("DD MMMM YYYY")
                : ""}
            </span>
          </h3>

          <h3>
            Status:{" "}
            <span>
              {groupModalData.status === "waiting"
                ? " Yığılan"
                : groupModalData.status === "current"
                ? "Mövcud"
                : "Bitmiş"}
            </span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default GroupMoreModal;
