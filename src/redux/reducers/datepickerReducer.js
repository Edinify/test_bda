import { DATEPICKER_ACTION_TYPE } from "../actions-type";

const initialState = {
  startDate: "",
  startDay: "",
  endDate: "",
  endDay: "",
};

const datePickerReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATEPICKER_ACTION_TYPE.START_DATE:
      return {
        ...state,
        startDate: action.payload,
      };
    case DATEPICKER_ACTION_TYPE.START_DAY_DATE:
      return {
        ...state,
        startDay: action.payload,
      };
    case DATEPICKER_ACTION_TYPE.END_DATE:
      return {
        ...state,
        endDate: action.payload,
      };
    case DATEPICKER_ACTION_TYPE.END_DAY_DATE:
      return {
        ...state,
        endDay: action.payload,
      };
    default:
      return state;
  }
};

export default datePickerReducer;
