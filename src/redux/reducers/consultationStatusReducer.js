import { CONSULTATION_STATUS_FILTER_ACTION_TYPE } from "../actions-type";

const initialState = {
  consultationStatus: "",
  whereComing: "",
  courseId: "",
};

export const consultationStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSULTATION_STATUS_FILTER_ACTION_TYPE.GET_CONSULTATION_STATUS:
      return {
        ...state,
        consultationStatus: action.payload,
      };
    case CONSULTATION_STATUS_FILTER_ACTION_TYPE.GET_WHERE_COMING:
      return {
        ...state,
        whereComing: action.payload,
      };
    case CONSULTATION_STATUS_FILTER_ACTION_TYPE.GET_CONSULTATION_COURSEID:
      return {
        ...state,
        courseId: action.payload,
      };
    case CONSULTATION_STATUS_FILTER_ACTION_TYPE.CLEAR_CONSULTATION_COURSEID:
      return {
        ...state,
        courseId: null,
      };
    default:
      return state;
  }
};
