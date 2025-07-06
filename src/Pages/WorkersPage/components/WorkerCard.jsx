import { useDispatch, useSelector } from "react-redux";
import { WORKER_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteWorkerAction } from "../../../redux/actions/workersActions";
import moment from "moment";
import WorkerProfileDropdown from "./WorkerProfileDropdown";
import DeleteItemModal from "../../../globalComponents/Modals/DeleteItemModal/DeleteItemModal";
import { useState } from "react";
const WorkerCard = ({
  data,
  mode,
  worker,
  cellNumber,
  setOpenConfirmModal,
  setOpenMoreModal,
}) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const updateItem = (modalType) => {
    dispatch({
      type: WORKER_MODAL_ACTION_TYPE.GET_WORKER_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };

  const deleteItem = () => {
    dispatch(deleteWorkerAction(data._id));
  };

  const openConfirmModal = () => {
    setOpenConfirmModal(true);
    updateItem("more");
  };

  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
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
              <div className="table-scroll-text">{data.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.fin}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="email">
            <div className="td-con">
              <div className="table-scroll-text">{data.email}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">{data.phone}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.position}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text profiles">
                {data?.birthday
                  ? moment(data?.birthday).locale("az").format("DD MMMM YYYY")
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "400px" }}>
              <WorkerProfileDropdown data={data} />
            </div>
          </td>

          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              openConfirmModal={openConfirmModal}
              state={worker}
              openMoreModal={openMoreModal}
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
                <span>Email:</span>
                <p>{data.email ? data.email : "boş"}</p>
              </li>
              <li>
                <span>Mobil nömrə:</span>
                <p>{data.phone ? data.phone : "boş"}</p>
              </li>
              <li>
                <span>Pozisiya:</span>
                <p>{data.position ? data.position : "boş"}</p>
              </li>
              {/* <li>
                <span>Profil:</span>
                <p className="profiles">{profiles}</p>
              </li> */}
            </ul>
          </div>

          <div className="right">
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              openConfirmModal={openConfirmModal}
              state={worker}
              openMoreModal={openMoreModal}
              setShowDeleteModal={setShowDeleteModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WorkerCard;
