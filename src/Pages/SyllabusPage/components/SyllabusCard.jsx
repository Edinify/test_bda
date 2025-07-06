import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SYLLABUS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteSyllabusAction } from "../../../redux/actions/syllabusActions";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
import DeleteItemModal from "../../../globalComponents/Modals/DeleteItemModal/DeleteItemModal";
const SyllabusCard = ({ data, mode, syllabus }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const updateItem = (modalType) => {
    dispatch({
      type: SYLLABUS_MODAL_ACTION_TYPE.GET_SYLLABUS_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    dispatch(deleteSyllabusAction(data._id));
  };

  const openConfirmModal = () => {
    dispatch({
      type: SYLLABUS_MODAL_ACTION_TYPE.OPEN_SYLLABUS_CONFIRM_MODAL,
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
          <td>{data.orderNumber}</td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.name}</div>
              <div className="right-fade"></div>
            </div>
          </td>

          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              state={syllabus}
              openConfirmModal={openConfirmModal}
              profil={"syllabus"}
              setShowDeleteModal={setShowDeleteModal}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data.fullName}</h3>
            <ul>
              <li>
                <span>No:</span>
                <p>{data.orderNumber ? data.orderNumber : "boş"}</p>
              </li>
              <li>
                <span>Mövzu:</span>
                <p>{data.name ? data.name : "boş"}</p>
              </li>
            </ul>
          </div>
          <div className="right">
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              state={syllabus}
              openConfirmModal={openConfirmModal}
              setShowDeleteModal={setShowDeleteModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SyllabusCard;
