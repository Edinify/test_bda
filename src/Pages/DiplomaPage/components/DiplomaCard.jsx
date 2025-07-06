import moment from "moment";
import React from "react";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { useDispatch } from "react-redux";
import { DIPLOMA_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
import DiplomaStatus from "./DiplomaStatus";

const DiplomaCard = ({ data, mode }) => {
  const dispatch = useDispatch();
  const { diplomaStatus, diplomaDegrees } = useCustomHook();

  const diplomaDegree = diplomaDegrees.find(
    (diploma) => diploma.key === data.diplomaDegree
  ).name;
  const status =
    diplomaStatus.find((diploma) => diploma.key === data.diplomaStatus)?.name ||
    "";

  const updateItem = () => {
    dispatch({
      type: DIPLOMA_MODAL_ACTION_TYPE.GET_DIPLOMA_MODAL,
      payload: {
        data: data,
        openModal: true,
      },
    });
  };

  const doubleClick = () => {
    updateItem("");
  };

  return (
    <>
      <tr onDoubleClick={doubleClick}>
        <td>
          <div className="td-con" style={{ width: "200px" }}>
            {/* <div className="cell-number">{cellNumber}.</div> */}
            <div className="table-scroll-text phone">{data.fullName}</div>
            <div className="right-fade"></div>
          </div>
        </td>
        <td>
          <div className="td-con" style={{ width: "150px" }}>
            <div className="table-scroll-text">{data?.group?.name}</div>
            <div className="right-fade"></div>
          </div>
        </td>{" "}
        <td>
          <div className="td-con" style={{ width: "150px" }}>
            <div className="table-scroll-text">{data?.course?.name}</div>
            <div className="right-fade"></div>
          </div>
        </td>
        <td>
          <div className="td-con" style={{ width: "150px" }}>
            <div className="table-scroll-text">{data?.seria}</div>
            <div className="right-fade"></div>
          </div>
        </td>
        <td>
          <div className="td-con" style={{ width: "200px" }}>
            <div className="table-scroll-text phone">
              {data?.diplomaDate
                ? moment(data?.diplomaDate).locale("az").format("DD MMMM YYYY")
                : ""}
            </div>
            <div className="right-fade"></div>
          </div>
        </td>
        <td>
          <div className="td-con" style={{ width: "150px" }}>
            <div className="table-scroll-text">{diplomaDegree}</div>
            <div className="right-fade"></div>
          </div>
        </td>
        <td
          style={
            data.diplomaStatus !== "awarded"
              ? { backgroundColor: "#d2c3fe" }
              : { backgroundColor: "#d4ffbf" }
          }
        >
          <DiplomaStatus data={data} />
        </td>
        <td>
          <UpdateDeleteModal
            updateItem={updateItem}
            // openMoreModal={openMoreModal}
            profil={"diploma"}
            data={data}
          />
        </td>
      </tr>
    </>
  );
};

export default DiplomaCard;
