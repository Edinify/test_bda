import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/az";
import { useDispatch, useSelector } from "react-redux";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";
import {
  cancelTeacherChangesAction,
  confirmTeacherChangesAction,
} from "../../../../redux/actions/teachersActions";

const TeacherConfirmModal = () => {
  const { teachersModalData, teachersModalLoading } = useSelector(
    (state) => state.teachersModal
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [btns, setBtns] = useState(true);

  let beforeCourses =
    Array.isArray(teachersModalData.courses) &&
    teachersModalData.courses.length > 0
      ? teachersModalData.courses
          .map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "";

  let newCourses =
    Array.isArray(teachersModalData?.changes?.courses) &&
    teachersModalData.changes.courses.length > 0
      ? teachersModalData?.changes?.courses
          ?.map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "";

  const beforeDataList = [
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
    { title: "İxtisaslar", value: beforeCourses },
    { title: "Status", value: teachersModalData?.status ? "Aktiv" : "Deaktiv" },
    {
      title: "Qoşulma tarixi",
      value: teachersModalData?.createdAt
        ? moment(teachersModalData.createdAt)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
  ];

  const newDataList = [
    { title: "Ad soyad", value: teachersModalData?.changes?.fullName },
    { title: "Fin kod", value: teachersModalData?.changes?.fin },
    { title: "Seriya nömrəsi", value: teachersModalData?.changes?.seria },
    {
      title: "Doğum günü",
      value: teachersModalData?.changes?.birthday
        ? moment(teachersModalData.changes?.birthday)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
    { title: "Mobil nömrə", value: teachersModalData?.changes?.phone },
    { title: "Email", value: teachersModalData?.changes?.email },
    { title: "İxtisaslar", value: newCourses },
    {
      title: "Status",
      value: teachersModalData?.changes?.status ? "Aktiv" : "Deaktiv",
    },
    {
      title: "Qoşulma tarixi",
      value: teachersModalData?.changes?.createdAt
        ? moment(teachersModalData.changes?.createdAt)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
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
      {(!teachersModalData?.changes?._id && (
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
                  teachersModalLoading ? { backgroundColor: "#b29bff" } : {}
                }
                disabled={teachersModalLoading}
                onClick={() =>
                  dispatch(
                    cancelTeacherChangesAction(
                      teachersModalData._id,
                      teachersModalData
                    )
                  )
                }
              >
                {(teachersModalLoading && <LoadingBtn />) || "Ləğv et"}
              </button>

              <button
                className="confirm"
                style={
                  teachersModalLoading ? { backgroundColor: "#b29bff" } : {}
                }
                disabled={teachersModalLoading}
                onClick={() =>
                  dispatch(
                    confirmTeacherChangesAction(
                      teachersModalData._id,
                      teachersModalData
                    )
                  )
                }
              >
                {(teachersModalLoading && <LoadingBtn />) || "təsdiqlə"}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TeacherConfirmModal;
