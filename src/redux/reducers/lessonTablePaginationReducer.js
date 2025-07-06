import { LESSON_TABLE_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  lessonTableData: [],
  confirmedCount: 0,
  cancelledCount: 0,
  unviewedCount: 0,
  hasMore: true,
  loading: false,
  totalLength:0,
  status: "",
};

export const lessonTablePaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LESSON_TABLE_ALL_ACTIONS_TYPE.LESSON_TABLE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_TABLE_PAGINATION:
      return {
        ...state,
        lessonTableData: [...state.lessonTableData, ...action.payload.lessons],
        hasMore: !(action.payload.lessons.length < 20),
        confirmedCount: action.payload.confirmedCount,
        cancelledCount: action.payload.cancelledCount,
        unviewedCount: action.payload.unviewedCount,
        totalLength:action.payload.totalLength
      };

    case LESSON_TABLE_ALL_ACTIONS_TYPE.CREATE_LESSON_TABLE:
      return {
        ...state,
        lessonTableData: [action.payload],
        hasMore: false,
        unviewedCount: state.unviewedCount + 1,
        totalLength:state.totalLength+1
      };
    case LESSON_TABLE_ALL_ACTIONS_TYPE.UPDATE_LESSON_TABLE:
      return {
        ...state,
        lessonTableData: state.lessonTableData.map((lesson) =>
          lesson._id === action.payload.lesson._id
            ? action.payload.lesson
            : lesson
        ),
        confirmedCount: action.payload.confirmedCount,
        cancelledCount: action.payload.cancelledCount,
        unviewedCount: action.payload.unviewedCount,
      };
    case LESSON_TABLE_ALL_ACTIONS_TYPE.RESET_LESSON_TABLE:
      return {
        ...state,
        lessonTableData: [],
        totalLength:0,
        hasMore: true,
      };
    case LESSON_TABLE_ALL_ACTIONS_TYPE.DELETE_LESSON_TABLE:
      return {
        ...state,
        lessonTableData: state.lessonTableData.filter(
          (teacher) => teacher._id !== action.payload.deletedLesson._id
        ),
        confirmedCount: action.payload.confirmedCount,
        cancelledCount: action.payload.cancelledCount,
        unviewedCount: action.payload.unviewedCount,
        totalLength:state.totalLength-1
      };
    case LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_TABLE_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    case LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
