import { PAYMENT_STATUS_FILTER_ACTION_TYPE } from "../actions-type";

const initialState = {
  paymentStatus: "",
};

export const paymentStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_STATUS_FILTER_ACTION_TYPE.GET_PAYMENT_STATUS:
      return {
        ...state,
        paymentStatus: action.payload,
      };
    default:
      return state;
  }
};
