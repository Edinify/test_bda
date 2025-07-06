import axios from "axios";
import { apiRoot } from "../../apiRoot";
import { REPORT_ACTION_TYPE } from "../actions-type";

const API = axios.create({
  baseURL: `${apiRoot}/report`,
  withCredentials: true,
});

export const getTotalAmountSumOfContinuesStudents =
  (startDate = "", endDate = "", monthCount = "") =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/total-contract-payments-by-continues-students?startDate=${startDate}&endDate=${endDate}&monthCount=${monthCount}`
      );

      dispatch({
        type: REPORT_ACTION_TYPE.GET_TOTAL_AMOUNT_SUM_CONTINUES_STUDENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getTotalDebtOfContinueStudents =
  (startDate = "", endDate = "", monthCount = "") =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/total-debt-by-continues-students?startDate=${startDate}&endDate=${endDate}&monthCount=${monthCount}`
      );

      dispatch({
        type: REPORT_ACTION_TYPE.GET_TOTAL_DEBT_CONTINUES_STUDENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getTotalDebtOfDisabledStudents =
  (startDate = "", endDate = "", monthCount = "") =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/total-debt-by-disabled-students?startDate=${startDate}&endDate=${endDate}&monthCount=${monthCount}`
      );

      dispatch({
        type: REPORT_ACTION_TYPE.GET_TOTAL_DEBT_DISABLED_STUDENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getTotalAmountSumOfWaitingStudents =
  (startDate = "", endDate = "", monthCount = "") =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/total-contract-payments-by-waiting-students?startDate=${startDate}&endDate=${endDate}&monthCount=${monthCount}`
      );

      dispatch({
        type: REPORT_ACTION_TYPE.GET_TOTAL_AMOUNT_SUM_WAITING_STUDENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getContinuesStudentsCountForEachCourse =
  () => async (dispatch) => {
    try {
      const { data } = await API.get(
        "/continues-students-count-for-each-course"
      );
      dispatch({
        type: REPORT_ACTION_TYPE.GET_CONTINUES_STUDENTS_COUNT_COURSE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getStudentsIncomes =
  (startDate = "", endDate = "", monthCount = "") =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/students-incomes?startDate=${startDate}&endDate=${endDate}&monthCount=${monthCount}`
      );
      dispatch({
        type: REPORT_ACTION_TYPE.GET_STUDENTS_INCOMES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getSoldConsultationsCountByCourse =
  (startDate = "", endDate = "", monthCount = "") =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/sold-consultation-count-by-course?startDate=${startDate}&endDate=${endDate}&monthCount=${monthCount}`
      );
      dispatch({
        type: REPORT_ACTION_TYPE.GET_SOLD_CONSULTATION_COUNT_BY_COURSE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getWaitingGroupsWithStudentsCount = () => async (dispatch) => {
  try {
    const { data } = await API.get("/waiting-groups-with-students-count");
    dispatch({
      type: REPORT_ACTION_TYPE.GET_WAITING_GROUPS_WITH_STUDENTS_COUNT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSubstitutedLessonsCountByTeacher = () => async (dispatch) => {
  try {
    const { data } = await API.get("/substituted-lessons-count-by-teacher");
    dispatch({
      type: REPORT_ACTION_TYPE.GET_SUBSTITUTED_LESSONS_COUNT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getConsultationStatistics =
  (startDate = "", endDate = "", monthCount = 1) =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/consultation-statistics?startDate=${startDate}&endDate=${endDate}&monthCount=${monthCount}`
      );
      dispatch({
        type: REPORT_ACTION_TYPE.GET_CONSULTATION_STATISTICS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getStudentsCountAndTotalContractAmountByStatus =
  (startDate = "", endDate = "", monthCount = 1) =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/students-count-and-total-contract-amount-by-status?startDate=${startDate}&endDate=${endDate}&monthCount=${monthCount}`
      );
      dispatch({
        type: REPORT_ACTION_TYPE.GET_STUDENTS_COUNT_AND_TOTAL_CONTRACT_STATUS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getTotalStudentsPaymentsByEachGroup = () => async (dispatch) => {
  try {
    const { data } = await API.get("/total-students-payments-by-each-group");
    dispatch({
      type: REPORT_ACTION_TYPE.GET_TOTAL_STUDENTS_PAYMENTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};


export const getStudentsCountBySalesType =
  (startDate = "", endDate = "", monthCount = 1) =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/students-count-by-sales-type?startDate=${startDate}&endDate=${endDate}&monthCount=${monthCount}`
      );
      dispatch({
        type: REPORT_ACTION_TYPE.GET_STUDENTS_COUNT_SALES_TYPE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
