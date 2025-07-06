import { UPDATES_ALL_ACTION_TYPE } from "../actions-type";

const initialState = {
  allUpdates: [],
  status:""
};

export const updatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATES_ALL_ACTION_TYPE.GET_ALL_UPDATES:
      return {
        ...state,
        allUpdates: action.payload,
      };
      case UPDATES_ALL_ACTION_TYPE.CHANGE_UPDATES_STATUS:
        return{
          ...state,
          status:action.payload
        }

    default:
      return state;
  }
};
