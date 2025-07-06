import { DIPLOMA_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  diplomasData: [],
  currentLength: 0,
  hasMore: true,
  loading: false,
};

export const diplomaPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case DIPLOMA_ALL_ACTIONS_TYPE.DIPLOMA_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case DIPLOMA_ALL_ACTIONS_TYPE.GET_DIPLOMA_PAGINATION:
      console.log(action.payload, "payload in diplomas pagination");
      return {
        ...state,
        diplomasData: [...state.diplomasData, ...action.payload.diplomas],
        currentLength: action.payload.currentLength,
        hasMore: !(action.payload.diplomas.length < 20),
      };
    case DIPLOMA_ALL_ACTIONS_TYPE.RESET_DIPLOMA_PAGINATION:
      return {
        ...state,
        diplomasData: [],
        hasMore: true,
        currentLength: 0,
      };
    case DIPLOMA_ALL_ACTIONS_TYPE.UPDATE_DIPLOMA:
      return {
        ...state,
        diplomasData: state.diplomasData.map((diploma) =>
          diploma._id.toString() === action.payload._id.toString() &&
          diploma.group._id.toString() === action.payload.group._id.toString()
            ? action.payload
            : diploma
        ),
      };
    default:
      return state;
  }
};
