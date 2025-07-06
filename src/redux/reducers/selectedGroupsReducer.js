import { SELECTED_GROUPS_ACTION_TYPE } from "../actions-type";

const initialState = {
  selectedGroups: [],
  selectedCourses:[],
};

export const selectedGroupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_GROUPS_ACTION_TYPE.GET_SELECTED_GROUPS:
      return {
        ...state,
        selectedGroups: action.payload,
      };
      case SELECTED_GROUPS_ACTION_TYPE.SELECTED_COURSES:
        return{
          ...state,
          selectedCourses:action.payload
        }
    default:
      return state;
  }
};
