import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import {  getStudentsCountBySalesType } from "../../../../../redux/actions/reportActions";
import { REPORT_FILTER_ACTION_TYPE } from "../../../../../redux/actions-type";
import { useEffect } from "react";

export const useReporStudentSalesTypeCustomHook = () => {
  const dispatch = useDispatch();

  const { salesDivitionChooseDate, salesDivitionMonthFilter } = useSelector(
    (state) => state.reportDateFilter
  );

  const getAllDefaultData = () => {
    dispatch(getStudentsCountBySalesType("", "", 1));
 
  };


  useEffect(()=>{
    getAllDefaultData()
  },[])

  const getAllDataByMonth = (monthCount) => {
    dispatch(getStudentsCountBySalesType("", "", monthCount));
    
  };

  const getAllDataByDateRange = (startDate, endDate) => {
    const start = moment(startDate).format("YYYY-MM");
    const end = moment(endDate).format("YYYY-MM");

    dispatch(getStudentsCountBySalesType(start, end, ""));

  
  };

  const getFinanceDataAfterUpdate = () => {
    if (salesDivitionChooseDate.startDate && salesDivitionChooseDate.endDate) {
      const start = moment(salesDivitionChooseDate.startDate).format("YYYY-MM");
      const end = moment(salesDivitionChooseDate.endDate).format("YYYY-MM");
    dispatch(getStudentsCountBySalesType(start, end, ""));
     
    } else {
     
    dispatch(getStudentsCountBySalesType("", "", salesDivitionMonthFilter || 1));

   
        
    }
  };

  const getFinanceDataAfterCreate = () => {
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_SALES_DIVITION_MONTH_FILTER,
      payload: { reportMonthFilter:"" },
    });
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_SALES_DIVITION_DATE_SELECTED_OPTION,
      payload: {
        key: 1,
        name: "Cari ay",
      },
    });
    dispatch(getStudentsCountBySalesType("", "", 1));
   
  };

  return {
    getAllDefaultData,
    getAllDataByMonth,
    getAllDataByDateRange,
    getFinanceDataAfterCreate,
    getFinanceDataAfterUpdate,
  };
};
