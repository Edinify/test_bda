import axios from "axios";
import { apiRoot } from "../../apiRoot";
import { TUITION_FEE_PAYMENT_ACTIONS_TYPE } from "../actions-type";

const API = axios.create({
  baseURL: `${apiRoot}/tution-fee`,
  withCredentials: true,
});

export const getTotalPaymentSumContinueAction = () => async (dispatch) => {
  try {
    const { data } = await API.get(`/total-amount-continue`);

    dispatch({
      type: TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_PAYMENT_SUM,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTotalPaymentSumContinueFullPaymentAction =
  () => async (dispatch) => {
    try {
      const { data } = await API.get(`/total-amount-continue-full-payment`);

      dispatch({
        type: TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_PAYMENT_SUM_FULL_PAYMENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getTotalPaymentSumContinuePartPaymentAction =
  () => async (dispatch) => {
    try {
      const { data } = await API.get(`/total-amount-continue-part-payment`);

      dispatch({
        type: TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_PAYMENT_SUM_PART_PAYMENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getTotalPaymentRestAction = () => async (dispatch) => {
  try {
    const { data } = await API.get(`/total-rest-continue`);

    dispatch({
      type: TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_PAYMENT_REST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTotalDebtContinueAction = () => async (dispatch) => {
  try {
    const { data } = await API.get(`/total-debt-continue`);

    dispatch({
      type: TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_DEBT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTotalPaymentRestStoppedAction = () => async (dispatch) => {
  try {
    const { data } = await API.get(`/total-rest-stopped`);

    dispatch({
      type: TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_PAYMENT_REST_STOPPED,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTotalPaidsAction =
  (monthCount, startDate="", endDate="", allDate) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/total-paids/?monthCount=${monthCount}&startDate=${startDate}&endDate=${endDate}&allDate=${allDate}`
      );
      console.log(data,"total paids  dataaaaa")

      dispatch({
        type: TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_PAIDS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };


  export const getTotalAmountWaiting = ()=> async(dispatch)=>{
    try {
      const {data} = await API.get("/total-amount-waiting");
      dispatch ({type:TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_AMOUNT_WAITING,payload:data})
    } catch (error) {
      console.log(error)
    }
  }

  export const getTotalDebtDisabledStudents = ()=> async(dispatch)=>{
    try {
      const {data} = await API.get("/total-debt-disabled-students");
      dispatch ({type:TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_DEBT_DISABLED_STUDENTS,payload:data})
    } catch (error) {
      console.log(error)
    }
  }

  export const getTotalAllDept = ()=> async(dispatch)=>{
    try {
      const {data} = await API.get("/total-all-debt");
      dispatch ({type:TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_ALL_DEBT,payload:data})
    } catch (error) {
      console.log(error)
    }
  }

export const getLatedPayment =
  (monthCount, startDate, endDate, allDate) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `late-payment/?monthCount=${monthCount}&startDate=${startDate}&endDate=${endDate}&allDate=${allDate}`
      );

      dispatch({
        type: TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_LATED_PAYMENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getPaidPayment =
  (monthCount, startDate = "", endDate = "", currentDay = true) =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `paid-amount/?monthCount=${monthCount}&startDate=${startDate}&endDate=${endDate}&currentDay=${currentDay}`
      );
      dispatch({
        type: TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_PAID_PAYMENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getWillPayPayment =
  (monthCount, startDate, endDate, allDate) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/pay-amount/?monthCount=${monthCount}&startDate=${startDate}&endDate=${endDate}&allDate=${allDate}`
      );
      dispatch({
        type: TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_WILL_PAY_PAYMENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
