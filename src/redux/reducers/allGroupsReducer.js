import { ALL_GROUPS_ACTION } from "../actions-type";
const initialState = {
  allGroups: [],
};

export const allGroupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_GROUPS_ACTION.GET_ALL_GROUPS:
      return {
        ...state,
        allGroups: action.payload,
      };
    default:
      return state;
  }
};
