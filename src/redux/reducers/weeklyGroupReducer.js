import {
  GROUP_WEEKLY_ACTION_TYPE
} from "../actions-type";

const initialState = {
  weeklyGroupData: {},
};

export const weeklyGroupData = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_WEEKLY_ACTION_TYPE.GET_GROUP_WEEKLY_TABLE:
      return {
        ...state,
        weeklyGroupData: action.payload
      };
    default:
      return state;
  }
};
