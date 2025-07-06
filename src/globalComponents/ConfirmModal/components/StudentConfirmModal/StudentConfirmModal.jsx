import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/az";
import { useCustomHook } from "../../../GlobalFunctions/globalFunctions";
import { useDispatch, useSelector } from "react-redux";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";
import {
  cancelStudentChangesAction,
  confirmStudentChangesAction,
} from "../../../../redux/actions/studentsActions";

const StudentConfirmModal = () => {
  const { studentsModalData, studentsModalLoading } = useSelector(
    (state) => state.studentsModal
  );
  const { whereComingList, discountReasonList,whereSendList, paymentTypeList } =
    useCustomHook();
  const { user } = useSelector((state) => state.user);
  const [btns, setBtns] = useState(true);
  const dispatch = useDispatch();
  // // console.log(studentsModalData, "studentsModalData");

  let beforeCourses =
    Array.isArray(studentsModalData?.courses) &&
    studentsModalData?.courses.length > 0
      ? studentsModalData?.courses
          .map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "boş";

  let newCourses =
    Array.isArray(studentsModalData?.changes?.courses) &&
    studentsModalData?.changes?.courses.length > 0
      ? studentsModalData?.changes?.courses
          .map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "boş";

  const beforeList = [
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
      value: whereComingList.find(
        (item) => item.key === studentsModalData?.whereComing
      )?.name,
    },
    {title:"Haradan gəliblər?",
  value:whereSendList.find(item=>item.key===studentsModalData?.whereSend)?.name},
    { title: "İxtisaslar", value: beforeCourses },
  ];

  const newList = [
    { title: "Ad soyad", value: studentsModalData?.changes?.fullName },
    { title: "Fin kod", value: studentsModalData?.changes?.fin },
    { title: "Seriya nömrəsi", value: studentsModalData?.changes?.seria },
    {
      title: "Doğum günü",
      value: studentsModalData?.changes?.birthday
        ? moment(studentsModalData?.changes?.birthday)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
    { title: "Mobil nömrə", value: studentsModalData?.changes?.phone },
    {
      title: "Bizi haradan eşitdiniz?",
      value: whereComingList.find(
        (item) => item.key === studentsModalData?.changes?.whereComing
      )?.name,
    },
    { title: "İxtisaslar", value: newCourses },
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
      {(!studentsModalData?.changes?._id && (
        <h1 style={{ color: "red" }}>Heç bir yeniləmə yoxdur!</h1>
      )) || (
        <>
          <h2>Əvvəlki məlumatlar</h2>
          <div className="more-modal-header-inform">
            {beforeList.map((item, index) => (
              <h3 key={index}>
                {item.title}: <span>{item.value}</span>
              </h3>
            ))}
          </div>

          <h2 style={{ marginTop: "10px" }}>Qruplar:</h2>
          {studentsModalData?.groups?.map((item) => (
            <div
              key={item.group._id}
              className="more-modal-work-inform"
              style={{
                marginLeft: "20px",
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              <div className="work-inform-con">
                <h2>Qrup adı: {item?.group?.name}</h2>
                <h3>
                  Yekun məbləğ: <span>{item?.totalAmount}</span>
                </h3>
                <h3>
                  Məbləğ: <span>{item?.amount}</span>
                </h3>
                <h3>
                  Ödəmə növü: <span>{item?.payment?.paymentType}</span>
                </h3>
                <h3>
                  Endirim növü:
                  <span>
                    {
                      discountReasonList.find(
                        (data) => data.key === item?.discountReason
                      )?.name
                    }
                  </span>
                </h3>
                <h3>
                  Endirim: <span>{item?.discount}%</span>
                </h3>
                <h3>
                  Müqavilə başlama tarixi:
                  <span>
                    {item?.contractStartDate
                      ? moment(item?.contractStartDate)
                          .locale("az")
                          .format("DD MMMM YYYY")
                      : ""}
                  </span>
                </h3>
                <h3>
                  Müqavilə bitmə tarixi:
                  <span>
                    {item?.contractEndDate
                      ? moment(item?.contractEndDate)
                          .locale("az")
                          .format("DD MMMM YYYY")
                      : ""}
                  </span>
                </h3>
                <h3>
                  Təhsil dərəcəsi: <span>{item?.degree}</span>
                </h3>

                <h3>
                  Status: <span>{item?.status ? "Davam edir" : "Məzun"}</span>
                </h3>

                <h3>Ödənişlər:</h3>
                {item?.payments?.map((item, index) => (
                  <ul
                    key={index}
                    style={{ listStyleType: "unset", marginLeft: "20px" }}
                  >
                    <li>
                      <span>
                        {item?.paymentDate
                          ? moment(item?.paymentDate)
                              .locale("az")
                              .format("DD.MM.YYYY")
                          : ""}
                      </span>
                      <span>-</span>
                      <span>{item?.payment} AZN</span>
                      <span>-</span>
                      <span>
                        {item?.status === "wait"
                          ? "ödənilməyib"
                          : item?.status === "paid"
                          ? "ödənildi"
                          : item?.status === "confirm"
                          ? "təsdiqləndi"
                          : "ləğv edildi"}{" "}
                      </span>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          ))}

          <h2 style={{ marginTop: "40px" }}>Yenilənmiş məlumatlar</h2>
          <div className="more-modal-header-inform">
            {newList.map((item, index) => (
              <h3 key={index}>
                {item.title}: <span>{item.value}</span>
              </h3>
            ))}
          </div>

          <div className="more-modal-work-inform">
            <div className="work-inform-con"></div>
          </div>

          {studentsModalData?.changes?.groups?.map((item) => (
            <div
              key={item.group._id}
              className="more-modal-work-inform"
              style={{
                marginLeft: "20px",
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              <div className="work-inform-con">
                <h2>Qrup adi: {item?.group?.name}</h2>
                <h3>
                  Yekun məbləğ: <span>{item?.totalAmount}</span>
                </h3>
                <h3>
                  Məbləğ: <span>{item?.amount}</span>
                </h3>
                <h3>
                  Ödəmə növü: <span>{item?.payment?.paymentType}</span>
                </h3>
                <h3>
                  Endirim növü:
                  <span>
                    {
                      discountReasonList.find(
                        (data) => data.key === item?.discountReason
                      )?.name
                    }
                  </span>
                </h3>
                <h3>
                  Endirim: <span>{item?.discount}%</span>
                </h3>
                <h3>
                  Müqavilə başlama tarixi:
                  <span>
                    {item?.contractStartDate
                      ? moment(item?.contractStartDate)
                          .locale("az")
                          .format("DD MMMM YYYY")
                      : ""}
                  </span>
                </h3>
                <h3>
                  Müqavilə bitmə tarixi:
                  <span>
                    {item?.contractEndDate
                      ? moment(item?.contractEndDate)
                          .locale("az")
                          .format("DD MMMM YYYY")
                      : ""}
                  </span>
                </h3>
                <h3>
                  Təhsil dərəcəsi: <span>{item?.degree}</span>
                </h3>

                <h3>
                  Status: <span>{item?.status ? "Davam edir" : "Məzun"}</span>
                </h3>

                <h3>Ödənişlər:</h3>
                {item?.payments?.map((item, index) => (
                  <ul
                    key={index}
                    style={{ listStyleType: "unset", marginLeft: "20px" }}
                  >
                    <li>
                      <span>
                        {item?.paymentDate
                          ? moment(item?.paymentDate)
                              .locale("az")
                              .format("DD.MM.YYYY")
                          : ""}
                      </span>
                      <span>-</span>
                      <span>{item?.payment} AZN</span>
                      <span>-</span>
                      <span>
                        {item?.status === "wait"
                          ? "ödənilməyib"
                          : item?.status === "paid"
                          ? "ödənildi"
                          : item?.status === "confirm"
                          ? "təsdiqləndi"
                          : "ləğv edildi"}{" "}
                      </span>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          ))}
          {btns && (
            <div className="confirm-btns">
              <button
                className="cancel"
                style={
                  studentsModalLoading ? { backgroundColor: "#b29bff" } : {}
                }
                disabled={studentsModalLoading}
                onClick={() =>
                  dispatch(
                    cancelStudentChangesAction(
                      studentsModalData._id,
                      studentsModalData
                    )
                  )
                }
              >
                {(studentsModalLoading && <LoadingBtn />) || "Ləğv et"}
              </button>

              <button
                className="confirm"
                style={
                  studentsModalLoading ? { backgroundColor: "#b29bff" } : {}
                }
                disabled={studentsModalLoading}
                onClick={() =>
                  dispatch(
                    confirmStudentChangesAction(
                      studentsModalData._id,
                      studentsModalData
                    )
                  )
                }
              >
                {(studentsModalLoading && <LoadingBtn />) || "təsdiqlə"}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default StudentConfirmModal;
