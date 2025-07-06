import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import { getStudentsCountAndTotalContractAmountByStatus } from "../../../../../redux/actions/reportActions";
import { REPORT_FILTER_ACTION_TYPE } from "../../../../../redux/actions-type";
import { useEffect } from "react";

export const useReportStudentListCustomHook = () => {
  const dispatch = useDispatch();

  const {
    studentsCountContractStatusChooseDate,
    studentsCountContractStatusMonthFilter,
  } = useSelector((state) => state.reportDateFilter);

  const getAllDefaultData = () => {
    dispatch(getStudentsCountAndTotalContractAmountByStatus("", "", 1));
  };

  useEffect(() => {
    getAllDefaultData();
  }, []);

  const getAllDataByMonth = (monthCount) => {
    dispatch(
      getStudentsCountAndTotalContractAmountByStatus("", "", monthCount)
    );
  };

  const getAllDataByDateRange = (startDate, endDate) => {
    const start = moment(startDate).format("YYYY-MM");
    const end = moment(endDate).format("YYYY-MM");

    dispatch(getStudentsCountAndTotalContractAmountByStatus(start, end, ""));
  };

  const getFinanceDataAfterUpdate = () => {
    if (
      studentsCountContractStatusChooseDate.startDate &&
      studentsCountContractStatusChooseDate.endDate
    ) {
      const start = moment(
        studentsCountContractStatusChooseDate.startDate
      ).format("YYYY-MM");
      const end = moment(studentsCountContractStatusChooseDate.endDate).format(
        "YYYY-MM"
      );
      dispatch(getStudentsCountAndTotalContractAmountByStatus(start, end, ""));
    } else {
      dispatch(
        getStudentsCountAndTotalContractAmountByStatus(
          "",
          "",
          studentsCountContractStatusMonthFilter || 1
        )
      );
    }
  };

  const getFinanceDataAfterCreate = () => {
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_STUDENTS_COUNT_CONTRACT_STATUS_MONTH_FILTER,
      payload: { studentsCountContractStatusMonthFilter: "" },
    });
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_STUDENTS_COUNT_CONTRACT_STATUS_DATE_SELECTED_OPTION,
      payload: {
        key: 1,
        name: "Cari ay",
      },
    });
    dispatch(getStudentsCountAndTotalContractAmountByStatus("", "", 1));
  };

  return {
    getAllDefaultData,
    getAllDataByMonth,
    getAllDataByDateRange,
    getFinanceDataAfterCreate,
    getFinanceDataAfterUpdate,
  };
};
