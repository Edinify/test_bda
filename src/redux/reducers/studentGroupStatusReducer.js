import { STUDENT_GROUP_STATUS_FILTER_ACTION_TYPE } from "../actions-type";

const initialState = {
  status: "",
};

export const studentGroupStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_GROUP_STATUS_FILTER_ACTION_TYPE.GET_STUDENT_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
