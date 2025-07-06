import { SYLLABUS_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  syllabusData: [],
  totalLength: 0,
  hasMore: true,
  loading: false,
};

export const syllabusPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYLLABUS_ALL_ACTIONS_TYPE.GET_ALL_SYLLABUS:
      return {
        ...state,
        syllabusData: action.payload,
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.GET_ACTIVE_SYLLABUS:
      return {
        ...state,
        syllabusData: action.payload,
        loading: false,
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.SYLLABUS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.GET_SYLLABUS_PAGINATION:
      return {
        ...state,
        syllabusData: [...state.syllabusData, ...action.payload.syllabusData],
        totalLength: action.payload.totalLength,
        hasMore: !(action.payload.syllabusData.length < 20),
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.CREATE_SYLLABUS:
      // console.log(action.payload);
      return {
        ...state,
        syllabusData: [action.payload, ...state.syllabusData].sort(
          (a, b) => a.orderNumber - b.orderNumber
        ),
        totalLength: state.totalLength + 1,
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.RESET_SYLLABUS_PAGINATION:
      return {
        ...state,
        syllabusData: [],
        totalLength: 0,
        hasMore: true,
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.UPDATE_SYLLABUS:
      return {
        ...state,
        syllabusData: state.syllabusData.map((teacher) =>
          teacher._id === action.payload._id ? action.payload : teacher
        ),
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.DELETE_SYLLABUS:
      return {
        ...state,
        syllabusData: state.syllabusData.filter(
          (syllabus) => syllabus._id !== action.payload
        ),
        totalLength: state.totalLength - 1,
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.GET_SYLLABUS_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
