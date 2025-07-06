import { STUDENTS_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  students: [],
  studentsByCourse: [],
  studentsByMore: [],
  totalLength: 0,
  hasMore: true,
  lastPage: "",
  loading: false,
  loadingAll: false,
};

export const StudentsPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_BY_COURSE_ADD:
      return {
        ...state,
        studentsByCourse: action.payload?.students,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_BY_COURSE:
      return {
        ...state,
        studentsByCourse: [
          ...state.studentsByCourse,
          ...action.payload?.students,
        ],
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_ALL_ADD:
      return {
        ...state,
        studentsByMore: action.payload?.students,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_ALL:
      return {
        ...state,
        studentsByMore: [...state.studentsByMore, ...action.payload?.students],
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_STUDENT_PAGINATION:
      return {
        ...state,
        students: [...state.students, ...action.payload.students],
        totalLength: action.payload.totalLength,
        hasMore: !(action.payload.students.length < 10),
      };
    case STUDENTS_ALL_ACTIONS_TYPE.RESET_STUDENT_PAGINATION:
      return {
        ...state,
        students: [],
        totalLength: 0,
        hasMore: true,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.STUDENT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.STUDENT_LOADING_ALL:
      return {
        ...state,
        loadingAll: action.payload,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.CREATE_STUDENT:
      return {
        ...state,
        students: [action.payload, ...state.students],
        totalLength: state.totalLength + 1,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student
        ),
      };
    case STUDENTS_ALL_ACTIONS_TYPE.DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          (student) => student._id !== action.payload
        ),
        totalLength: state.totalLength - 1,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_STUDENT_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
