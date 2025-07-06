import { CAREER_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  careerData: [],
  currentLength: 0,
  hasMore: true,
  loading: false,
};

export const careerPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAREER_ALL_ACTIONS_TYPE.GET_ALL_CAREERS:
      return {
        ...state,
        careerData: action.payload,
        // loading: false,
      };
    case CAREER_ALL_ACTIONS_TYPE.GET_ACTIVE_CAREER:
      return {
        ...state,
        careerData: action.payload,
        loading: false,
      };
    case CAREER_ALL_ACTIONS_TYPE.CAREER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CAREER_ALL_ACTIONS_TYPE.GET_CAREER_PAGINATION:
      return {
        ...state,
        careerData: [...state.careerData, ...action.payload.careers],
        currentLength: action.payload.currentLength,
        hasMore: !(action.payload.careers.length < 20),
      };
    case CAREER_ALL_ACTIONS_TYPE.RESET_CAREER_PAGINATION:
      return {
        ...state,
        careerData: [],
        hasMore: true,
        currentLength: 0,
      };
    case CAREER_ALL_ACTIONS_TYPE.UPDATE_CAREER:
      return {
        ...state,
        careerData: state.careerData.map((student) =>
          student._id === action.payload._id ? action.payload : student
        ),
      };
    case CAREER_ALL_ACTIONS_TYPE.DELETE_CAREER:
      return {
        ...state,
        careerData: state.careerData.filter(
          (teacher) => teacher._id !== action.payload
        ),
      };
    case CAREER_ALL_ACTIONS_TYPE.GET_CAREER_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
