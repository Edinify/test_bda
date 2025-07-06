import { FILTER_ACTION_TYPE } from "../actions-type";

const initialState = {
  search: "",
  course: "",
  status: "",
  whereComing: "",
  startDate: "",
  endDate: "",
  group: "",
  teacher: "",
  paymentType: "",
  forDate: "forContactDate",
  tuitionStatus:"all",
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_ACTION_TYPE.GET_FILTER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
