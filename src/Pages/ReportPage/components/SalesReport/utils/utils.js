import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import { getConsultationStatistics } from "../../../../../redux/actions/reportActions";
import { REPORT_FILTER_ACTION_TYPE } from "../../../../../redux/actions-type";
import { useEffect } from "react";

export const useReportSalesCustomHook = () => {
  const dispatch = useDispatch();

  const { consultationStatisticChooseDate, consultationStatisticMonthFilter } = useSelector(
    (state) => state.reportDateFilter
  );

  const getAllDefaultData = () => {
    dispatch(getConsultationStatistics("", "", 1));
 
  };


  useEffect(()=>{
    getAllDefaultData()
  },[])

  const getAllDataByMonth = (monthCount) => {
    dispatch(getConsultationStatistics("", "", monthCount));
    
  };

  const getAllDataByDateRange = (startDate, endDate) => {
    const start = moment(startDate).format("YYYY-MM");
    const end = moment(endDate).format("YYYY-MM");

    dispatch(getConsultationStatistics(start, end, ""));

  
  };

  const getFinanceDataAfterUpdate = () => {
    if (consultationStatisticChooseDate.startDate && consultationStatisticChooseDate.endDate) {
      const start = moment(consultationStatisticChooseDate.startDate).format("YYYY-MM");
      const end = moment(consultationStatisticChooseDate.endDate).format("YYYY-MM");
    dispatch(getConsultationStatistics(start, end, ""));
     
    } else {
     
    dispatch(getConsultationStatistics("", "", consultationStatisticMonthFilter || 1));

   
        
    }
  };

  const getFinanceDataAfterCreate = () => {
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_CONSULTATION_STATISTICS_MONTH_FILTER,
      payload: { reportMonthFilter:"" },
    });
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_CONSULTATION_STATISTICS_DATE_SELECTED_OPTION,
      payload: {
        key: 1,
        name: "Cari ay",
      },
    });
    dispatch(getConsultationStatistics("", "", 1));
   
  };

  return {
    getAllDefaultData,
    getAllDataByMonth,
    getAllDataByDateRange,
    getFinanceDataAfterCreate,
    getFinanceDataAfterUpdate,
  };
};
