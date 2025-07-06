import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  CloseBtn  from "../../../assets/icons/Icon.svg?react";
import { UPDATE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import "moment/locale/az";
import "./style.css";
import moment from "moment";
import { useCustomHook } from "../../GlobalFunctions/globalFunctions";

const UpdatesModal = () => {
  const dispatch = useDispatch();
  const { updatesModalData: modalData } = useSelector(
    (state) => state.updatesModal
  );
  const { whereSendList } = useCustomHook();

  const closeModal = () => {
    dispatch({
      type: UPDATE_MODAL_ACTION_TYPE.GET_UPDATES_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  const [activeStatus, setActiveStatus] = useState(null);

  const whereOldSendName = whereSendList.find(
    (item) => item.key === modalData?.oldData?.whereSend
  )?.name;

  const whereNewSendName = whereSendList.find(
    (item) => item.key === modalData?.newData?.whereSend
  )?.name;

  const renderGroup = (group) => {
    const newGroup = modalData.newData.groups.find(
      (item) => item.group._id === group.group._id
    );

    return (
      <div
        key={group?._id}
        style={{ marginLeft: "40px", borderBottom: "1px solid black" }}
      >
        <h4>
          {group?.group?.name}{" "}
          {
            <span className={getChangedClass(group?.name, newGroup?.name)}>
              &#8594;
            </span>
          }
          <span className={getChangedClass(group?.name, newGroup?.name)}>
            {newGroup?.group.name}
          </span>
        </h4>

        <p>
          Status:{" "}
          {group?.status === "continue"
            ? "Davam edir"
            : group?.status === "freeze"
            ? "Dondurdu"
            : group?.status === "graduate"
            ? "Məzun"
            : group?.status === "stopped"
            ? "Dayandırdı"
            : group?.status === "waiting"
            ? "Gözləmədə"
            : "Borclu məzun"}
          {
            <span className={getChangedClass(group?.status, newGroup?.status)}>
              &#8594;
            </span>
          }
          <span className={getChangedClass(group?.status, newGroup?.status)}>
            {newGroup?.status === "continue"
              ? "Davam edir"
              : newGroup?.status === "freeze"
              ? "Dondurdu"
              : newGroup?.status === "graduate"
              ? "Məzun"
              : newGroup?.status === "stopped"
              ? "Dayandırdı"
              : newGroup?.status === "waiting"
              ? "Gözləmədə"
              : "Borclu məzun"}
          </span>
        </p>
        <p>
          Məbləğ: {group?.amount}{" "}
          {
            <span className={getChangedClass(group?.amount, newGroup?.amount)}>
              &#8594;
            </span>
          }{" "}
          <span className={getChangedClass(group?.amount, newGroup?.amount)}>
            {newGroup?.amount}{" "}
          </span>
        </p>
        <p>
          Yekun məbləğ: {group?.totalAmount}{" "}
          {
            <span
              className={getChangedClass(
                group?.totalAmount,
                newGroup?.totalAmount
              )}
            >
              &#8594;
            </span>
          }{" "}
          <span
            className={getChangedClass(
              group?.totalAmount,
              newGroup?.totalAmount
            )}
          >
            {" "}
            {newGroup?.totalAmount}{" "}
          </span>
        </p>
        <p>
          Endirim: {group?.discount}%{" "}
          {
            <span
              className={getChangedClass(group?.discount, newGroup?.discount)}
            >
              &#8594;
            </span>
          }{" "}
          <span
            className={getChangedClass(group?.discount, newGroup?.discount)}
          >
            {" "}
            {newGroup?.discount}%{" "}
          </span>
        </p>
        <p>
          Endirim növü:{" "}
          {group?.discountReason === "technest"
            ? "Teknest"
            : group?.discountReason === "plus-card"
            ? "Tələbə plus kartı"
            : "Digər"}
          {
            <span
              className={getChangedClass(
                group?.discountReason,
                newGroup?.discountReason
              )}
            >
              &#8594;
            </span>
          }{" "}
          <span
            className={getChangedClass(
              group?.discountReason,
              newGroup?.discountReason
            )}
          >
            {" "}
            {newGroup?.discountReason === "technest"
              ? "Teknest"
              : newGroup?.discountReason === "plus-card"
              ? "Tələbə plus kartı"
              : "Digər"}
          </span>
        </p>
        <p>
          Ödənişə başlama tarixi:{" "}
          {moment(group?.paymentStartDate).locale("az").format("DD MM YYYY")}
          {
            <span
              className={getChangedClass(
                group?.paymentStartDate,
                newGroup?.paymentStartDate
              )}
            >
              &#8594;
            </span>
          }{" "}
          <span
            className={getChangedClass(
              group?.paymentStartDate,
              newGroup?.paymentStartDate
            )}
          >
            {" "}
            {moment(newGroup?.paymentStartDate)
              .locale("az")
              .format("DD MM YYYY")}{" "}
          </span>
        </p>
        <p>
          Ödəniş hissəsi: {group?.paymentPart}{" "}
          {
            <span
              className={getChangedClass(
                group?.paymentPart,
                newGroup?.paymentPart
              )}
            >
              &#8594;
            </span>
          }{" "}
          <span
            className={getChangedClass(
              group?.paymentPart,
              newGroup?.paymentPart
            )}
          >
            {newGroup?.paymentPart}{" "}
          </span>{" "}
        </p>
        <div style={{ display: "flex" }}>
          <p>
            {" Ödənişlər: "}
            {group?.payments?.map((payment, i) => {
              const newPayment = newGroup?.payments?.[i];

              console.log(newPayment, "new payment");

              return (
                <div key={payment?._id}>
                  <p>
                    Ödəniş: {payment?.payment}AZN{" "}
                    {
                      <span
                        className={getChangedClass(
                          payment?.payment,
                          newPayment?.payment
                        )}
                      >
                        &#8594;
                      </span>
                    }{" "}
                  </p>
                  <p>
                    Status:{" "}
                    {payment?.status === "wait"
                      ? "ödənilməyib"
                      : payment?.status === "paid"
                      ? "ödənildi"
                      : payment?.status === "confirm"
                      ? "təsdiqləndi"
                      : "ləğv edildi"}{" "}
                    {
                      <span
                        className={getChangedClass(
                          payment?.status,
                          newPayment?.status
                        )}
                      >
                        &#8594;
                      </span>
                    }{" "}
                  </p>
                  <p>
                    Ödəmə tarixi:{" "}
                    {moment(payment?.paymentDate)
                      .locale("az")
                      .format("DD MM YYYY")}{" "}
                    {
                      <span
                        className={getChangedClass(
                          payment?.status,
                          newPayment?.status
                        )}
                      >
                        &#8594;
                      </span>
                    }{" "}
                  </p>
                </div>
              );
            })}
          </p>
          <p>
            <span>Ödənişlər:</span>
            {newGroup?.payments?.map((payment,i) => {
              const newPayment = newGroup?.payments?.[i];
              return(
              <div key={payment?._id}>
                <p
                  className={getChangedClass(payment?.payment, newPayment?.payment)}
                >
                  {payment?.payment}AZN{" "}
                </p>
                <p className={getChangedClass(payment?.status, newPayment?.status)}>
                  {payment?.status === "wait"
                    ? "ödənilməyib"
                    : payment?.status === "paid"
                    ? "ödənildi"
                    : payment?.status === "confirm"
                    ? "təsdiqləndi"
                    : "ləğv edildi"}{" "}
                </p>
                <p
                  className={getChangedClass(
                    moment(payment?.paymentDate)
                      .locale("az")
                      .format("DD MM YYYY"),
                    moment(newPayment?.paymentDate)
                      .locale("az")
                      .format("DD MM YYYY")
                  )}
                >
                  {moment(payment?.paymentDate)
                    .locale("az")
                    .format("DD MM YYYY")}{" "}
                </p>
              </div>
              )
  })}
          </p>
        </div>
      </div>
    );
  };

  const getChangedClass = (oldValue, newValue) => {
    return oldValue !== newValue ? "new-value-changed" : "old-value";
  };

  const renderGroupsList = (groups) => {
    return groups.map((group) => renderGroup(group));
  };

  const groups = renderGroupsList(modalData?.oldData?.groups);

  const oldCourses =
    Array.isArray(modalData?.oldData?.courses) &&
    modalData?.oldData?.courses.length > 0
      ? modalData?.oldData.courses
          .map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "";

  const newCourses =
    Array.isArray(modalData?.newData?.courses) &&
    modalData?.newData?.courses.length > 0
      ? modalData?.newData.courses
          .map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "";

  const renderUpdateRow = (label, oldVal, newVal) => {
    const hasChanged = oldVal !== newVal;
    const arrowColor = hasChanged ? "#e74c3c" : "#2ecc71";

    return (
      <div className="update-row">
        <span className="updates-key">{label}:</span>
        <span className="update-value old">{oldVal}</span>
        <span className="update-arrow" style={{ color: arrowColor }}>
          &#8594;
        </span>
        <span className={`update-value new ${hasChanged ? "change" : ""} `}>
          {newVal}
        </span>
      </div>
    );
  };

  const renderUpdateGroupsRow = (label, content) => {
    return (
      <div className={`update-row groups`}>
        <div className="group-container">
          <span className="updates-key old">{label}:</span>

          <div className="update-value old group-render">{content}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal updates">
        <div className="create-update-modal-head">
          <h2>Yeniləmələr</h2>
          <CloseBtn onClick={closeModal} />
        </div>
        <div className="updates-datas-container">
          <div className="updates-list">
            {renderUpdateRow(
              "Ad, Soyad",
              modalData?.oldData?.fullName,
              modalData?.newData?.fullName
            )}
            {renderUpdateRow(
              "Fin",
              modalData?.oldData?.fin,
              modalData?.newData?.fin
            )}
            {renderUpdateRow(
              "Seria",
              modalData?.oldData?.seria,
              modalData?.newData?.seria
            )}
            {renderUpdateRow(
              "Email",
              modalData?.oldData?.email,
              modalData?.newData?.email
            )}
            {renderUpdateRow(
              "Email",
              modalData?.oldData?.phone,
              modalData?.newData?.phone
            )}
            {renderUpdateRow(
              "Doğum tarixi",
              moment(modalData?.oldData?.birthday)
                .locale("az")
                .format("DD MM YYYY"),
              moment(modalData?.newData?.birthday)
                .locale("az")
                .format("DD MM YYYY")
            )}
            {renderUpdateRow(
              "Satış tipi",
              modalData?.oldData?.salesType,

              modalData?.newData?.salesType
            )}

            {renderUpdateRow(
              "Bizi haradan eşidiblər?",
              modalData?.oldData?.whereComing.name,

              modalData?.newData?.whereComing.name
            )}
            {renderUpdateRow(
              "Haradan gəliblər?",
              whereOldSendName,

              whereNewSendName
            )}

            {renderUpdateRow(
              "Kurslar",

              oldCourses,
              newCourses
            )}
            {renderUpdateGroupsRow("Qruplar", groups)}
          </div>
        </div>
        <div className="status-button-container">
          <button
            onClick={() => setActiveStatus("pending")}
            className={activeStatus === "pending" ? "active" : ""}
          >
            Gözləmədə
          </button>
          <button
            onClick={() => setActiveStatus("approved")}
            className={activeStatus === "approved" ? "active" : ""}
          >
            Təsdiqlə
          </button>
          <button
            onClick={() => setActiveStatus("rejected")}
            className={activeStatus === "rejected" ? "active" : ""}
          >
            Ləğv et
          </button>
        </div>
        <div className="update-btn-container">
          <button>Yenilə</button>
        </div>
      </div>
    </div>
  );
};

export default UpdatesModal;
