import React, { useEffect, useRef, useState } from "react";
import "./updateDeleteModal.css";
import { useDispatch, useSelector } from "react-redux";
import { FUNC_COMPONENT_ACTION_TYPE } from "../../../redux/actions-type";
import  MoreIcon  from "../../../assets/icons/more.svg?react";
import {
  downloadContractAction,
  downloadStudentPaymentsAction,
} from "../../../redux/actions/studentsActions";
import { MdOutlineFileDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const UpdateDeleteModal = ({
  updateItem = () => {},
  deleteItem = () => {},
  data,
  dataType = "",
  openConfirmModal,
  profil,
  setShowDeleteModal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { funcComp } = useSelector((state) => state.funcComponent);
  const { user } = useSelector((state) => state.user);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [contractBtn, setContractBtn] = useState(false);
  const [paymentsTableBtn, setPaymentsTableBtn] = useState(false);
  const [confirmBtn, setConfirmBtn] = useState(false);
  const [changesBtn, setChangesBtn] = useState(false);
  const [paymentsBtn, setPaymentsBtn] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [badge, setBadge] = useState(false);

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const modalRef = useRef(null);

  const handleClickOutside = () => {
    dispatch({
      type: FUNC_COMPONENT_ACTION_TYPE.GET_FUNC_COMP,
      payload: false,
    });
  };

  const handleToggleModal = (e) => {
    e.stopPropagation();
    if (funcComp === data._id) {
      dispatch({
        type: FUNC_COMPONENT_ACTION_TYPE.GET_FUNC_COMP,
        payload: false,
      });
    } else {
      dispatch({
        type: FUNC_COMPONENT_ACTION_TYPE.GET_FUNC_COMP,
        payload: data._id,
      });
    }
  };

  const downloadContract = () => {
    for (let i = 0; i < data?.groups?.length || 0; i++) {
      downloadContractAction({
        fullName: data?.fullName,
        studentId: data?._id,
        groupId: data?.groups[i]?.group?._id,
      });
    }
  };

  const downloadStudentPayments = () => {
    if (profil === "students") {
      downloadStudentPaymentsAction({
        fullName: data?.fullName,
        studentId: data?._id,
        groupId: data?.groups[0]?.group?._id,
      });
    } else if (profil === "tuitionFee") {
      downloadStudentPaymentsAction({
        fullName: data?.fullName,
        studentId: data?.studentId,
        groupId: data?.group?._id,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (user?.role === "super-admin") {
      setUpdateBtn(true);
      setDeleteBtn(true);
      if (profil === "tuitionFee") {
        setPaymentsBtn(true);
        setPaymentsTableBtn(true);
      }

      if (profil === "students") {
        setContractBtn(true);
        setPaymentsTableBtn(true);
      }
    } else if (user?.role === "worker") {
      const power = user?.profiles?.find(
        (item) => item.profile === profil
      )?.power;

      if (power === "all") {
        setConfirmBtn(true);
        setDeleteBtn(true);

        if (profil === "students") {
          setContractBtn(true);
          setPaymentsTableBtn(true);
        }
      }

      if (power === "update" && profil !== "tuitionFee") {
        setChangesBtn(true);
      }

      if (profil === "tuitionFee") {
        setPaymentsBtn(true);
        setPaymentsTableBtn(true);
      }

      if (
        (power === "all" || power === "update") &&
        data?.changes?._id &&
        profil !== "tuitionFee"
      ) {
        setBadge(true);
      } else {
        setBadge(false);
      }

      if (power !== "only-show") {
        setUpdateBtn(true);
      }
    } else if (user?.role === "teacher") {
      if (profil === "lessonTable" && data?.topic?.name !== "Praktika") {
        setUpdateBtn(true);
      }
    } else if (user?.role === "mentor") {
      setUpdateBtn(true);
    } else if (user?.role === "student") {
      setUpdateBtn(true);
    }
  }, []);

  return (
    <div className="func-component">
      {badge && (
        <div
          style={{
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            backgroundColor: "#ff462a",
            position: "absolute",
            right: "12px",
            top: "-5px",
          }}
        ></div>
      )}
      <MoreIcon className="more-icon" onMouseDown={handleToggleModal} />
      <div
        className={`delete-update-modal  ${
          funcComp === data._id ? "active" : ""
        }`}
        ref={modalRef}
      >
        <>
          {dataType !== "feedback" && profil !== "tuitionFee" && updateBtn && (
            <h4 onClick={updateItem}>Yenilə</h4>
          )}

          {confirmBtn && (
            <h4 className="confirm" onClick={openConfirmModal}>
              <div style={{ position: "relative" }}>
                <span>təsdiqlə</span>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#ff462a",
                    position: "absolute",
                    right: "-7px",
                    top: "0px",
                    display: badge ? "block" : "none",
                  }}
                ></div>
              </div>
            </h4>
          )}

          <h4 onClick={() => navigate(`/updates/${data?._id}`)}>
            <div style={{ position: "relative" }}>
              <span>Yeniləmələr</span>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#ff462a",
                  position: "absolute",
                  right: "-7px",
                  top: "0px",
                  display: badge ? "block" : "none",
                }}
              ></div>
            </div>
          </h4>

          {paymentsBtn && (
            <h4 className="confirm" onClick={openConfirmModal}>
              Ödənişlər
            </h4>
          )}

          {deleteBtn &&
            profil !== "careers" &&
            profil !== "tuitionFee" &&
            profil !== "whereHeard" &&
            profil !== "diploma" && (
              <h4
                className={`delete-func ${
                  dataType === "branches" ? "only" : ""
                }`}
                onClick={handleShowDeleteModal}
              >
                Sil
              </h4>
            )}

          {contractBtn && (
            <h4
              className="confirm"
              onClick={downloadContract}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span>Müqavilə</span>
              <MdOutlineFileDownload style={{}} />
            </h4>
          )}
          {paymentsTableBtn && (
            <h4
              className="confirm"
              onClick={downloadStudentPayments}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                width: "200px",
              }}
            >
              <span>Ödəniş cədvəli</span>
              <MdOutlineFileDownload style={{}} />
            </h4>
          )}
        </>
      </div>
    </div>
  );
};

export default UpdateDeleteModal;
