import { TUITION_FEE_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  tuitionFeeModalData: {},
  tuitionFeeOpenModal: false,
  tuitionFeeModalLoading: false,
  openConfirmModal: false,
};

export const tuitionFeeModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TUITION_FEE_MODAL_ACTION_TYPE.GET_TUITION_FEE_MODAL:
      return {
        ...state,
        tuitionFeeModalData: action.payload.data,
        tuitionFeeOpenModal: action.payload.openModal,
        openConfirmModal: action.payload.confirmModal,
      };
    case TUITION_FEE_MODAL_ACTION_TYPE.TUITION_FEE_OPEN_MODAL:
      return {
        ...state,
        tuitionFeeOpenModal: action.payload,
      };
    case TUITION_FEE_MODAL_ACTION_TYPE.TUITION_FEE_MODAL_LOADING:
      return {
        ...state,
        tuitionFeeModalLoading: action.payload,
      };
    case TUITION_FEE_MODAL_ACTION_TYPE.UPDATE_TUITION_FEE_PAYMENTS:
      return {
        ...state,
        tuitionFeeModalData: action.payload.data,
        tuitionFeeOpenModal: action.payload.openModal,
        openConfirmModal: action.payload.openConfirmModal,
      };
    case TUITION_FEE_MODAL_ACTION_TYPE.CLOSE_CONFIRM_MODAL:
      return {
        ...state,
        tuitionFeeModalData: {},
        tuitionFeeOpenModal: false,
        openConfirmModal: false,
        tuitionFeeModalLoading: false,
      };
    default:
      return state;
  }
};
