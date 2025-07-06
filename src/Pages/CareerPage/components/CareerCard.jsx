import { useDispatch, useSelector } from "react-redux";
import { CAREER_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
// import { deleteCareerAction } from "../../../redux/actions/careerActions";
import moment from "moment";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
// import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
const CareerCard = ({ data, mode, cellNumber, setOpenMoreModal }) => {
  const dispatch = useDispatch();
  const { careerData, lastPage } = useSelector(
    (state) => state.careerPagination
  );
  const { careerSearchValues } = useSelector((state) => state.searchValues);


  const {
    whereComingList: dataList,
    whereSendList,
    studentStatus,
  } = useCustomHook();

  const status = studentStatus.find(
    (status) => status.key === data.status
  ).value;

  const whereComingName =
    dataList.find((item) => item.key === data.whereComing)?.name || "";
  const whereSendName =
    whereSendList.find((item) => item.key === data.whereSend)?.name || "";

  const workStatus =
    Array.isArray(data.workStatus) && data.workStatus.length > 0
      ? data.workStatus
          .map((workStatus) => {
            return workStatus.name;
          })
          .join(",")
      : "";

  const listData = [
    { key: "Qrup", value: data?.group?.name },
    { key: "İxtisas", value: data?.group?.course?.name },
    // { key: "Tələbənin adı", value: data.fullName },
    { key: "Portfolio linki", value: data?.portfolioLink || "" },
    { key: "CV linki", value: data?.cvLink || "" },
    { key: "Mobil Nömrə", value: data.phone },
    {
      key: "Müqavilə başlama tarixi",
      value: data?.contractStartDate
        ? moment(data?.contractStartDate).locale("az").format("DD MMMM YYYY")
        : "",
    },
    {
      key: "Müqavilə bitmə tarixi",
      value: data?.contractEndDate
        ? moment(data?.contractEndDate).locale("az").format("DD MMMM YYYY")
        : "",
    },
    { key: "Status", value: data.status ? "Davam edir" : "Məzun" },
    { key: "Diplom", value: "" },
  ];

  const updateItem = (modalType) => {
    dispatch({
      type: CAREER_MODAL_ACTION_TYPE.GET_CAREER_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (careerData.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = careerSearchValues;
    // dispatch(deleteCareerAction({ _id, pageNumber, searchQuery }));
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
      {mode === "desktop" ? (
        <tr onDoubleClick={doubleClick}>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text phone">{data.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              <div className="table-scroll-text">{data?.group?.name}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="email">
            <div className="td-con" style={{ width: "150px" }}>
              <div className="table-scroll-text">
                {data?.group?.course?.name}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text phone">
                {data.portfolioLink}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">{data?.cvLink}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">{data?.phone}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">{data?.fin}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">{data?.seria}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text phone">
                {data?.birthday
                  ? moment(data?.birthday).locale("az").format("DD MMMM YYYY")
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text phone">
                {data?.group
                  ? moment(data?.group?.startDate)
                      .locale("az")
                      .format("DD MMMM YYYY")
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text phone">
                {data?.group
                  ? moment(data?.group?.endDate)
                      .locale("az")
                      .format("DD MMMM YYYY")
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text phone">{whereComingName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text phone">{whereSendName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              <div className="table-scroll-text phone">
                {data?.previousWorkPlace}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              <div className="table-scroll-text phone">
                {data?.previousWorkPosition}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              <div className="table-scroll-text phone">
                {data?.currentWorkPlace}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              <div className="table-scroll-text phone">
                {data?.currentWorkPosition}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text phone">
                {data?.workStartDate
                  ? moment(data?.workStartDate)
                      .locale("az")
                      .format("DD MMMM YYYY")
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td
            style={
              data.workStatus === "student"
                ? { backgroundColor: "#d2c3fe" }
                : data.workStatus === "employed"
                ? { backgroundColor: "#d4ffbf" }
                : data.workStatus === "unemployed"
                ? { backgroundColor: "#ffced1" }
                : {}
            }
          >
            <div className="td-con" style={{ width: "120px" }}>
              <div className="table-scroll-text no-wrap">
                {workStatus}
                {/* {dataList.find((item) => item.key === data.workStatus)?.name ||
                  ""} */}
              </div>
            </div>
          </td>
          <td
            style={
              data.status === "graduate"
                ? { backgroundColor: "#d4ffbf" }
                : data.status === "continue"
                ? { backgroundColor: "#d2c3fe" }
                : data.status === "freeze"
                ? { backgroundColor: "var(--tertiary-300)" }
                : { backgroundColor: "var(--error-200)" }
            }
          >
            <div className="td-con student-status ">
              <div className="table-scroll-text phone">
                {data?.status ? status : ""}
              </div>
              {/* <div className="right-fade"></div> */}
            </div>
          </td>
          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              openMoreModal={openMoreModal}
              profil={"careers"}
              data={data}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data.fullName}</h3>
            <ul>
              {listData.map((item, index) => (
                <li key={index}>
                  <span className="type">{item.key}</span>
                  <p>{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="right">
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              openMoreModal={openMoreModal}
              profil={"careers"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CareerCard;
