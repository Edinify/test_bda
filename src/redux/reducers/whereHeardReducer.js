import { WHERE_HEARD_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  whereHeardData: [],
  activeWhereData:[],
  loading:false
};

export const whereHeardReducer = (state = initialState, action) => {
  switch (action.type) {
    case WHERE_HEARD_ALL_ACTIONS_TYPE.GET_ALL_WHERE_COMING:
      return {
        ...state,
        whereHeardData: action.payload,
      };
    case WHERE_HEARD_ALL_ACTIONS_TYPE.GET_ACTIVE_WHERE_COMING:
      return {
        ...state,
        activeWhereData: action.payload,
      };
      case WHERE_HEARD_ALL_ACTIONS_TYPE.WHERE_LOADING:
        return{
          ...state,
          loading:action.payload
        }
    case WHERE_HEARD_ALL_ACTIONS_TYPE.CREATE_WHERE_COMING:
      return {
        ...state,
        whereHeardData: [action.payload, ...state.whereHeardData],
      };
    case WHERE_HEARD_ALL_ACTIONS_TYPE.UPDATE_WHERE_COMING:
      return {
        ...state,
        whereHeardData: state.whereHeardData.map((whereHeard) =>
          whereHeard?._id === action.payload._id ? action.payload : whereHeard
        ),
      };

    default:
      return state;
  }
};
