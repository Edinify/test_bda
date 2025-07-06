import { DROPDOWN_GROUP_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  selectedGroup: '',
  GroupId:''
};

export const dropdownGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case DROPDOWN_GROUP_ACTIONS_TYPE.SELECT_GROUP:
      return {
        selectedGroup: action.payload
      };
      case DROPDOWN_GROUP_ACTIONS_TYPE.CLEAR_GROUP:
      return {
        selectedGroup: "",
        GroupId:''
      };
      case DROPDOWN_GROUP_ACTIONS_TYPE.SE:
      return {
        GroupId: ""
      };
    default:
      return state;
  }
};
