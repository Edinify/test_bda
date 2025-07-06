import { TABLE_TYPE_ACTION_TYPE } from "../actions-type";

export const tableTypeReducer = (state = { tableType: "" }, action) => {
  switch (action.type) {
    case TABLE_TYPE_ACTION_TYPE.GET_TABLE_TYPE:
      return {
        tableType: action.payload,
      };
    default:
      return state;
  }
};
