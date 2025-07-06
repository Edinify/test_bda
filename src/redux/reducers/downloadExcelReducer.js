import { DOWNLOAD_EXCEL_ACTION_TYPE } from "../actions-type";

const initialState = {
  loading: false,
};

export const downloadExcelReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOWNLOAD_EXCEL_ACTION_TYPE.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
