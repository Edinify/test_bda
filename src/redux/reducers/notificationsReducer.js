import { NOTIFICATION_ACTION_TYPE } from "../actions-type";

const initialState={
  notifications:[],
  loading:false
}

const notificationsReducer = (state =initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_ACTION_TYPE.GET_NOTIFICATION:
      return {
        ...state,
        notifications: action.payload,
        // loading:action.payload
      };
    case NOTIFICATION_ACTION_TYPE.NOTIFICATION_LOADING:
      return{
        ...state,
        loading:action.payload
      }

    default:
      return state;
  }
};

export default notificationsReducer;
