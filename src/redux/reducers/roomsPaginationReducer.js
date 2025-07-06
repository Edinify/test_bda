import { ROOMS_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  rooms: [],
  totalLength: 0,
  hasMore: true,
  loading: false,
};

export const roomsPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOMS_ALL_ACTIONS_TYPE.GET_ALL_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case ROOMS_ALL_ACTIONS_TYPE.ROOM_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ROOMS_ALL_ACTIONS_TYPE.GET_ROOMS_PAGINATION:
      return {
        ...state,
        rooms: [...state.rooms, ...action.payload.rooms],
        hasMore: !(action.payload.rooms.length < 20),
      };
    case ROOMS_ALL_ACTIONS_TYPE.CREATE_ROOM:
      return {
        ...state,
        rooms: [action.payload, ...state.rooms],
      };
    case ROOMS_ALL_ACTIONS_TYPE.RESET_ROOMS_PAGINATION:
      return {
        ...state,
        rooms: [],
        hasMore: true,
      };
    case ROOMS_ALL_ACTIONS_TYPE.UPDATE_ROOM:
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === action.payload._id ? action.payload : room
        ),
      };
    case ROOMS_ALL_ACTIONS_TYPE.DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter((course) => course._id !== action.payload),
      };
    case ROOMS_ALL_ACTIONS_TYPE.GET_ROOM_LAST_PAGE:
      return {
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
