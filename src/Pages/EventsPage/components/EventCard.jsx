import { useDispatch, useSelector } from "react-redux";
import { EVENTS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteEventAction } from "../../../redux/actions/eventsActions";
import moment from "moment";
import EventsProductDropdown from "./EventsProductDropdown";
import DeleteItemModal from "../../../globalComponents/Modals/DeleteItemModal/DeleteItemModal";
import { useState } from "react";

const EventCard = ({
  data,
  mode,
  userData,
  cellNumber,
  setOpenConfirmModal,
  setOpenMoreModal,
}) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const purposes = [
    { key: "new-qrup", value: "Yeni qrup" },
    { key: "conversation", value: "Müzakirə" },
    { key: "meet-up", value: "Meet-up" },
    { key: "community", value: "Community görüşü" },
    { key: "meeting", value: "Tanışlıq" },
    { key: "thesis-defense", value: "Diplom müdafiəsi" },
  ];

  const eventDate = data.date
    ? moment(data.date).locale("az").format("DD.MM.YYYY")
    : "";
  const updateItem = (modalType) => {
    dispatch({
      type: EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    dispatch(deleteEventAction(data._id));
  };

  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

  const openConfirmModal = () => {
    dispatch({
      type: EVENTS_MODAL_ACTION_TYPE.OPEN_EVENT_CONFIRM_MODAL,
      payload: {
        data: data,
        openModal: false,
        confirmModal: true,
      },
    });
  };

  const doubleClick = () => {
    if (userData.role === "teacher") return;
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
        <tr onDoubleClick={doubleClick} className="class-table">
          <td>
            <div
              className="td-con"
              style={{ width: "200px", whiteSpace: "nowrap" }}
            >
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text">{data?.eventName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div
              className="td-con"
              style={{ width: "200px", whiteSpace: "nowrap" }}
            >
              <div className="table-scroll-text">{data?.place}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div
              className="td-con"
              style={{ width: "200px", whiteSpace: "nowrap" }}
            >
              <div className="table-scroll-text">{eventDate}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data?.time}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div
              className="td-con"
              style={{ width: "200px", whiteSpace: "nowrap" }}
            >
              <div className="table-scroll-text">{data?.visitor}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div
              className="td-con"
              style={{ width: "200px", whiteSpace: "nowrap" }}
            >
              <div className="table-scroll-text">{data?.speaker}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div
              className="td-con"
              style={{ width: "200px", whiteSpace: "nowrap" }}
            >
              <div className="table-scroll-text">{data?.targetAudience}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div
              className="td-con"
              style={{ width: "200px", whiteSpace: "nowrap" }}
            >
              <div className="table-scroll-text">{data?.purpose}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div
              className="td-con"
              style={{ width: "120px", whiteSpace: "nowrap" }}
            >
              <div className="table-scroll-text">{data?.budget}</div>
              <div className="right-fade"></div>
            </div>
          </td>

          <td>
            <div
              className="td-con"
              style={{ width: "100px", whiteSpace: "nowrap" }}
            >
              <div className="table-scroll-text">{data?.participantsCount}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <EventsProductDropdown data={data} />
              {/* <div className="right-fade"></div> */}
            </div>
          </td>

          <td
            style={
              data.status
                ? { backgroundColor: "#d4ffbf" }
                : { backgroundColor: "#d2c3fe" }
            }
          >
            <div className="td-con">
              <div className="table-scroll-text">
                {(data?.status && "Keçirilib") || "Gözləmədə"}
              </div>
            </div>
          </td>
          {userData?.power !== "only-show" ? (
            <td>
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                openConfirmModal={openConfirmModal}
                openMoreModal={openMoreModal}
                profil={"events"}
                setShowDeleteModal={setShowDeleteModal}
              />
            </td>
          ) : null}
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3 className="name">{data?.eventName || ""}</h3>
            <ul>
              <li>
                <span className="type">Tədbir adı:</span>
                <p>{data?.eventName || ""}</p>
              </li>
              <li>
                <span className="type">Qonaq:</span>
                <p>{data?.visitor || ""}</p>
              </li>
              <li>
                <span className="type">Spiker:</span>
                <p>{data?.speaker || ""}</p>
              </li>
              <li>
                <span className="type">Məkan:</span>
                <p>{data?.place || ""}</p>
              </li>
              <li>
                <span className="type">Vaxt:</span>
                <p>{eventDate}</p>
              </li>
              <li>
                <span className="type">Saat:</span>
                <p>{data?.time || ""}</p>
              </li>
              <li>
                <span className="type">Status:</span>
                <p
                  style={
                    data?.status ? { color: "#07bc0c" } : { color: "#704eff" }
                  }
                >
                  {data?.status ? "Keçirilib" : "Gözləmədə"}
                </p>
              </li>
            </ul>
          </div>

          {userData.power === "only-show" ? null : (
            <div className="right">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                openConfirmModal={openConfirmModal}
                openMoreModal={openMoreModal}
                profil={"events"}
                setShowDeleteModal={setShowDeleteModal}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EventCard;
