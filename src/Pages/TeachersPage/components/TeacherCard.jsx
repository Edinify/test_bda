import { useState } from "react";
import { useDispatch } from "react-redux";
import { TEACHERS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteTeacherAction } from "../../../redux/actions/teachersActions";
import moment from "moment";
import "moment/locale/az";
import DeleteItemModal from "../../../globalComponents/Modals/DeleteItemModal/DeleteItemModal";
const TeacherCard = ({ data, mode, cellNumber, setOpenMoreModal, teacher }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  let courses =
    Array.isArray(data.courses) && data.courses.length > 0
      ? data.courses
          .map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "";

  const listData = [
    { key: "Fənn", value: courses },
    { key: "Email", value: data.email },
    { key: "Mobil nömrə", value: data.phone },
    { key: "Email", value: data.email },
  ];

  const updateItem = (modalType) => {
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    dispatch(deleteTeacherAction(data._id));
  };
  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

  const openConfirmModal = () => {
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.OPEN_TEACHER_CONFIRM_MODAL,
      payload: {
        data: data,
        openModal: false,
        confirmModal: true,
      },
    });
  };

  const doubleClick = () => {
    updateItem("");
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteItemModal
          setShowDeleteModal={setShowDeleteModal}
          deleteItem={deleteItem}
        />
      )}
      {mode === "desktop" ? (
        <tr onDoubleClick={doubleClick} >
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text">{data?.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "120px" }}>
              <div className="table-scroll-text">{data?.fin}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "120px" }}>
              <div className="table-scroll-text">{data?.seria}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text">
                {data?.birthday
                  ? moment(data.birthday).locale("az").format("DD MMMM YYYY ")
                  : "" || ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="email">
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text">{data?.email}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text phone">{data?.phone}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text">{courses}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text phone">
                {data?.createdAt
                  ? moment(data.createdAt).locale("az").format("DD MMMM YYYY")
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">
                {data?.status ? "Aktiv" : "Deaktiv"}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>

          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              state={teacher}
              openConfirmModal={openConfirmModal}
              openMoreModal={openMoreModal}
              profil={"teachers"}
              setShowDeleteModal={setShowDeleteModal}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data?.fullName}</h3>
            <ul>
              {listData.map((item, index) => (
                <li key={index}>
                  <span className="type">{item.key}:</span>
                  <p>{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
          {teacher.power === "only-show" ? (
            <div className="more-content">
              <span onClick={openMoreModal}>Ətraflı</span>
            </div>
          ) : (
            <div className="right">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                state={teacher}
                openConfirmModal={openConfirmModal}
                openMoreModal={openMoreModal}
                profil={"teachers"}
                setShowDeleteModal={setShowDeleteModal}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TeacherCard;
