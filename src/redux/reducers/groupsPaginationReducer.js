import { GROUP_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  groupData: [],
  groupsByMore: [],
  totalLength: 0,
  hasMore: true,
  loading: false,
  loadingAll: false,
};

export const groupsPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_ALL_ACTIONS_TYPE.GET_ALL_GROUPS:
      return {
        ...state,
        groupData: action.payload,
        // loading: false,
      };
    case GROUP_ALL_ACTIONS_TYPE.GROUP_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GROUP_ALL_ACTIONS_TYPE.GET_GROUP_PAGINATION:
      return {
        ...state,
        groupData: [...state.groupData, ...action.payload.groupData],
        totalLength: action.payload.totalLength,
        hasMore: !(action.payload.groupData.length < 20),
      };
    case GROUP_ALL_ACTIONS_TYPE.RESET_GROUP_PAGINATION:
      return {
        ...state,
        groupData: [],
        totalLength: 0,
        hasMore: true,
      };
    case GROUP_ALL_ACTIONS_TYPE.GET_MORE_GROUP_ALL_ADD:
      return {
        ...state,
        groupsByMore: action.payload?.groups,
      };
    case GROUP_ALL_ACTIONS_TYPE.GET_MORE_GROUP_ALL:
      return {
        ...state,
        groupsByMore: [...state.groupsByMore, ...action.payload?.groups],
      };
    case GROUP_ALL_ACTIONS_TYPE.GROUP_LOADING_ALL:
      return {
        ...state,
        loadingAll: action.payload,
      };
    case GROUP_ALL_ACTIONS_TYPE.CREATE_GROUP:
      return {
        ...state,
        groupData: [action.payload, ...state.groupData],
        totalLength: state.totalLength + 1,
      };
    case GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP:
      return {
        ...state,
        groupData: state.groupData.map((teacher) =>
          teacher._id === action.payload._id ? action.payload : teacher
        ),
      };
    case GROUP_ALL_ACTIONS_TYPE.DELETE_GROUP:
      return {
        ...state,
        groupData: state.groupData.filter(
          (group) => group._id !== action.payload
        ),
        totalLength: state.totalLength - 1,
      };
    case GROUP_ALL_ACTIONS_TYPE.GET_GROUP_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
