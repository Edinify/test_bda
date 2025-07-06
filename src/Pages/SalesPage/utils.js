import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import {
  FINANCE_FILTER_ACTION_TYPE,
  LEAD_ACTION_TYPE,
} from "../../redux/actions-type";
import { getSalesChartAction } from "../../redux/actions/salesAction";
import {
  deleteLeadAction,
  getLeadPaginationAction,
} from "../../redux/actions/leadActions";

export const useFinanceCustomHook = () => {
  const dispatch = useDispatch();
  const { financeMonthsFilter, financeChooseDate } = useSelector(
    (state) => state.financeDateFilter
  );

  const { courseId } = useSelector((state) => state.salesData);

  const getAllDefaultData = () => {
    dispatch({ type: LEAD_ACTION_TYPE.RESET_LEAD });
    dispatch(getSalesChartAction("", "", 1));
    dispatch(getLeadPaginationAction(0, "", "", 1));
  };

  const getAllDataByMonth = (monthCount) => {
    dispatch({ type: LEAD_ACTION_TYPE.RESET_LEAD });
    dispatch(getSalesChartAction("", "", monthCount));
    dispatch(getLeadPaginationAction(0, "", "", monthCount));
  };

  const getAllDataByDateRange = (startDate, endDate) => {
    const start = moment(startDate).format("YYYY-MM");
    const end = moment(endDate).format("YYYY-MM");

    dispatch({ type: LEAD_ACTION_TYPE.RESET_LEAD });
    dispatch(getSalesChartAction(start, end, ""));
    dispatch(getLeadPaginationAction(0, start, end, ""));
  };

  const getFinanceDataAfterUpdate = () => {
    // dispatch({ type: LEAD_ACTION_TYPE.RESET_LEAD });

    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      const start = moment(financeChooseDate.startDate).format("YYYY-MM");
      const end = moment(financeChooseDate.endDate).format("YYYY-MM");
      dispatch(getSalesChartAction(start, end, "", courseId));
    } else {
      dispatch(getSalesChartAction("", "", financeMonthsFilter || 1, courseId));
    }
  };

  const getFinanceDataAfterCreate = () => {
    dispatch({
      type: FINANCE_FILTER_ACTION_TYPE.GET_MONTHS_FILTER,
      payload: { financeMonthsFilter: 1 },
    });
    dispatch({
      type: FINANCE_FILTER_ACTION_TYPE.GET_DATE_SELECTED_OPTION,
      payload: {
        key: 1,
        name: "Cari ay",
      },
    });
    dispatch(getSalesChartAction("", "", 1, courseId));
  };

  const deleteIncome = (_id) => {
    // const pageNum =
    //   (leadPageNum > 1 && (leads.length > 1 ? leadPageNum : leadPageNum - 1)) ||
    //   1;
    // if (financeChooseDate.startDate && financeChooseDate.endDate) {
    //   dispatch(
    //     deleteLeadAction(
    //       _id,
    //       pageNum,
    //       financeChooseDate.startDate,
    //       financeChooseDate.endDate,
    //       "" //month,
    //     )
    //   );
    // } else {
    //   dispatch(
    //     deleteLeadAction(
    //       _id,
    //       pageNum,
    //       "",
    //       "",
    //       financeMonthsFilter ? financeMonthsFilter : 1 //month,
    //     )
    //   );
    // }
  };

  return {
    getAllDefaultData,
    getAllDataByMonth,
    getAllDataByDateRange,
    getFinanceDataAfterCreate,
    getFinanceDataAfterUpdate,
    deleteIncome,
  };
};
