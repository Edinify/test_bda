import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTuitionFeePaginationAction } from "../../redux/actions/tuitionFeeActions";
import {
  TUITION_FEE_ALL_ACTIONS_TYPE,
  TUITION_FEE_MODAL_ACTION_TYPE,
} from "../../redux/actions-type";
import TuitionFeeData from "./components/TuitionFeeData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const TuitionFeePage = () => {
  const dispatch = useDispatch();
  const { loading, currentLength } = useSelector(
    (state) => state.tuitionFeePagination
  );
  const { tuitionFeeSearchValues } = useSelector((state) => state.searchValues);
  const { selectedGroups, selectedCourses } = useSelector(
    (state) => state.selectedGroups
  );
  const { tuitionStatus } = useSelector((state) => state.filter);

  const filterTuition = () => {
    dispatch({
      type: TUITION_FEE_ALL_ACTIONS_TYPE.RESET_TUITION_FEE_PAGINATION,
    });

    dispatch(
      getTuitionFeePaginationAction(
        0,
        tuitionFeeSearchValues,
        selectedCourses,
        selectedGroups,
        tuitionStatus
      )
    );
  };

  const getNextTuitionFees = () => {
    if (loading) return;

    if (tuitionFeeSearchValues) {
      dispatch(
        getTuitionFeePaginationAction(
          currentLength,
          tuitionFeeSearchValues,
          selectedCourses,
          selectedGroups,
          tuitionStatus
        )
      );
    } else {
      dispatch(
        getTuitionFeePaginationAction(
          currentLength,
          "",
          selectedCourses,
          selectedGroups,
          tuitionStatus
        )
      );
    }
  };

  const openModal = () => {
    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.GET_TUITION_FEE_MODAL,
      payload: { data: {}, openModal: true },
    });
  };

  const searchData = (e) => {
    e.preventDefault();

    dispatch({
      type: TUITION_FEE_ALL_ACTIONS_TYPE.RESET_TUITION_FEE_PAGINATION,
    });

    dispatch(
      getTuitionFeePaginationAction(
        0,
        tuitionFeeSearchValues,
        selectedCourses,
        selectedGroups,
        tuitionStatus
      )
    );
  };

  useEffect(() => {
    if (tuitionFeeSearchValues) {
      dispatch(
        getTuitionFeePaginationAction(
          0,
          tuitionFeeSearchValues,
          "",
          "",
          tuitionStatus
        )
      );
    } else {
      dispatch(getTuitionFeePaginationAction(0, "", "", "", tuitionStatus));
    }

    return () =>
      dispatch({
        type: TUITION_FEE_ALL_ACTIONS_TYPE.RESET_TUITION_FEE_PAGINATION,
      });
  }, []);

  return (
    <div className="details-page tuition-fee-page">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        filter={filterTuition}
        addBtn={false}
        DATA_SEARCH_VALUE={"TUITION_FEE_SEARCH_VALUE"}
        dataSearchValues={tuitionFeeSearchValues}
        profile={"tuitionFee"}
        statusType="tutionFee"
      />
      <TuitionFeeData getNextTuitionFees={getNextTuitionFees} />
    </div>
  );
};

export default TuitionFeePage;
