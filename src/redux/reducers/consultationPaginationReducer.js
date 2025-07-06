import { CONSULTATION_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  consultationData: [],
  consultationDataByMore: [],
  totalLength: 0,
  hasMore: true,
  loading: false,
  loadingAll: false,
};

export const consultationPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSULTATION_ALL_ACTIONS_TYPE.GET_MORE_CONSULTATION_ALL_ADD:
      return {
        ...state,
        consultationDataByMore: action.payload?.consultationData,
      };
    case CONSULTATION_ALL_ACTIONS_TYPE.GET_MORE_CONSULTATION_ALL:
      return {
        ...state,
        consultationDataByMore: [
          ...state.consultationDataByMore,
          ...action.payload?.consultationData,
        ],
      };
    case CONSULTATION_ALL_ACTIONS_TYPE.GET_CONSULTATION_PAGINATION:
      return {
        ...state,
        consultationData: [
          ...state.consultationData,
          ...action.payload.consultations,
        ],
        totalLength: action.payload.totalLength,
        hasMore: !(action.payload.consultations.length < 20),
      };
    case CONSULTATION_ALL_ACTIONS_TYPE.RESET_CONSULTATION_PAGINATION:
      return {
        ...state,
        consultationData: [],
        totalLength: 0,
        hasMore: true,
      };
    case CONSULTATION_ALL_ACTIONS_TYPE.CONSULTATION_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CONSULTATION_ALL_ACTIONS_TYPE.CONSULTATION_LOADING_ALL:
      return {
        ...state,
        loadingAll: action.payload,
      };
    case CONSULTATION_ALL_ACTIONS_TYPE.CREATE_CONSULTATION:
      return {
        ...state,
        consultationData: [action.payload, ...state.consultationData],
        totalLength: state.totalLength + 1,
      };
    case CONSULTATION_ALL_ACTIONS_TYPE.UPDATE_CONSULTATION:
      return {
        ...state,
        consultationData: state.consultationData.map((student) =>
          student._id === action.payload._id ? action.payload : student
        ),
      };
    case CONSULTATION_ALL_ACTIONS_TYPE.DELETE_CONSULTATION:
      return {
        ...state,
        consultationData: state.consultationData.filter(
          (student) => student._id !== action.payload
        ),
        totalLength: state.totalLength - 1,
      };
    case CONSULTATION_ALL_ACTIONS_TYPE.GET_CONSULTATION_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
