import { TUITION_FEE_PAYMENT_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  totalPaymentSum: 0,
  latedPayment: 0,
  paidPayment: 0,
  willPayPayment: 0,
  fullPaymentTotalSum: 0,
  partPaymentTotalSum: 0,
  totalRest: 0,
  totalDebt: 0,
  totalRestStopped: 0,
  totalPaids: 0,
  totalAmountWaiting: 0,
  totalDebtDisabledStudents: 0,
  totalAllDebt: 0,
};

export const tuitionFeePaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_PAYMENT_SUM:
      return {
        ...state,
        totalPaymentSum: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_LATED_PAYMENT:
      return {
        ...state,
        latedPayment: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_PAID_PAYMENT:
      return {
        ...state,
        paidPayment: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_WILL_PAY_PAYMENT:
      return {
        ...state,
        willPayPayment: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_PAYMENT_SUM_FULL_PAYMENT:
      return {
        ...state,
        fullPaymentTotalSum: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_PAYMENT_SUM_PART_PAYMENT:
      return {
        ...state,
        partPaymentTotalSum: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_PAYMENT_REST:
      return {
        ...state,
        totalRest: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_DEBT:
      return {
        ...state,
        totalDebt: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_PAYMENT_REST_STOPPED:
      return {
        ...state,
        totalRestStopped: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_PAIDS:
      return {
        ...state,
        totalPaids: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_AMOUNT_WAITING:
      return {
        ...state,
        totalAmountWaiting: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_DEBT_DISABLED_STUDENTS:
      return {
        ...state,
        totalDebtDisabledStudents: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_TOTAL_ALL_DEBT:
      return {
        ...state,
        totalAllDebt: action.payload,
      };

    default:
      return state;
  }
};
