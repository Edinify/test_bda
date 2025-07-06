import { EVENTS_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  data: [],
  events: [],
  totalLength: 0,
  hasMore: true,
  loading: false,
};

export const eventsPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENTS_ALL_ACTIONS_TYPE.GET_EVENT:
      return {
        ...state,
        events: action.payload,
        // loading:action.payload.loading
      };

    case EVENTS_ALL_ACTIONS_TYPE.EVENT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case EVENTS_ALL_ACTIONS_TYPE.GET_EVENTS_PAGINATION:
      return {
        ...state,
        events: [...state.events, ...action.payload.events],
        totalLength: action.payload.totalLength,
        hasMore: !(action.payload.events.length < 10),
      };
    case EVENTS_ALL_ACTIONS_TYPE.CREATE_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
        totalLength: state.totalLength + 1,
      };
    case EVENTS_ALL_ACTIONS_TYPE.RESET_EVENTS_PAGINATION:
      return {
        ...state,
        events: [],
        totalLength: 0,
        hasMore: true,
      };
    case EVENTS_ALL_ACTIONS_TYPE.UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
      };
    case EVENTS_ALL_ACTIONS_TYPE.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
        totalLength: state.totalLength - 1,
      };
    case EVENTS_ALL_ACTIONS_TYPE.GET_EVENTS_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
