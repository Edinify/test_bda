import {  WHERE_HEARD_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  whereHeardModalData: { name: "" },
  whereHeardOpenModal: false,
  whereHeardModalLoading: false,
  openConfirmModal: false,
};

export const whereHeardModalReducer = (state = initialState, action) => {
  switch (action.type) {
    // case COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL:
    case WHERE_HEARD_MODAL_ACTION_TYPE.GET_WHERE_HEARD_MODAL:
      return {
        ...state,
        whereHeardModalData: action.payload.data,
        whereHeardOpenModal: action.payload.openModal,
              };
    case WHERE_HEARD_MODAL_ACTION_TYPE.WHERE_HEARD_OPEN_MODAL:
      return {
        ...state,
        whereHeardOpenModal: action.payload,
      };
    case WHERE_HEARD_MODAL_ACTION_TYPE.WHERE_HEARD_MODAL_LOADING:
      return {
        ...state,
        whereHeardModalLoading: action.payload,
      };
    case WHERE_HEARD_MODAL_ACTION_TYPE.CLOSE_WHERE_HEARD_CONFIRM_MODAL:
      return {
        ...state,
        ...initialState,
      };
    case WHERE_HEARD_MODAL_ACTION_TYPE.OPEN_WHERE_HEARD_CONFIRM_MODAL:
      return {
        ...state,
        whereHeardModalData: action.payload.data,
        whereHeardOpenModal: action.payload.openModal,
        openConfirmModal: action.payload.confirmModal,
      };
    default:
      return state;
  }
};
