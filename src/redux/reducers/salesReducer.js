import { SALES_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  salesChart: {
    series: [
      {
        name: "Lead",
        data: [],
      },
      {
        name: "Planlanan",
        data: [],
      },
      {
        name: "Konsultasiya",
        data: [],
      },
      {
        name: "Satış",
        data: [],
      },
    ],
    categories: [],
  },
  leadData: {},
  courseId: "",
};

export const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SALES_ACTIONS_TYPE.GET_SALES_CHART:
      return {
        ...state,
        salesChart: action.payload,
      };
    case SALES_ACTIONS_TYPE.GET_LEAD_DATA:
      return {
        ...state,
        leadData: action.payload,
      };
    case SALES_ACTIONS_TYPE.UPDATE_COURSE_ID:
      return {
        ...state,
        courseId: action.payload,
      };
    default:
      return state;
  }
};
