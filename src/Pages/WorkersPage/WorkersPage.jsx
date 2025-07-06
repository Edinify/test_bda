import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkersPaginationAction } from "../../redux/actions/workersActions";
import {
  WORKER_MODAL_ACTION_TYPE,
  WORKER_ALL_ACTIONS_TYPE,
} from "../../redux/actions-type";
import WorkersData from "./components/WorkersData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";


const WorkersPage = () => {
  const dispatch = useDispatch();
  const { totalLength, loading, workers } = useSelector(
    (state) => state.workersPagination
  );
  const { workersSearchValues } = useSelector((state) => state.searchValues);
  let userData = JSON.parse(localStorage.getItem("userData"));
  userData =
    userData.role !== "super-admin"
      ? userData.profiles
      : JSON.parse(localStorage.getItem("userData"));

  const getNextTeachers = () => {
    if (loading) return;

    if (workersSearchValues) {
      dispatch(
        getWorkersPaginationAction(workers?.length || 0, workersSearchValues)
      );
    } else {
      dispatch(getWorkersPaginationAction(workers?.length || 0, ""));
    }
  };

  const openModal = () => {
    dispatch({
      type: WORKER_MODAL_ACTION_TYPE.GET_WORKER_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();

    dispatch({
      type: WORKER_ALL_ACTIONS_TYPE.RESET_WORKER_PAGINATION,
    });
    dispatch(getWorkersPaginationAction(0, workersSearchValues));
  };

  useEffect(() => {
    if (workersSearchValues) {
      dispatch(getWorkersPaginationAction(0, workersSearchValues));
    } else {
      dispatch(getWorkersPaginationAction(0, ""));
    }

    return () => {
      dispatch({
        type: WORKER_ALL_ACTIONS_TYPE.RESET_WORKER_PAGINATION,
      });
    };
  }, []);

  return (
    <div className="details-page teachers-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"WORKERS_SEARCH_VALUE"}
        dataSearchValues={workersSearchValues}
        profile={"workers"}
        count={totalLength}
      />
      <WorkersData userData={userData} getNextTeachers={getNextTeachers} />
    </div>
  );
};

export default WorkersPage;
