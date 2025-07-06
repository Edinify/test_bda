import { CONSULTATION_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  consultationModalData: {},
  consultationOpenModal: false,
  consultationModalLoading: false,
  openConfirmModal: false,
  firstStep: true,
  secondStep: false,
};

export const consultationModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL:
      console.log(
        action.payload,
        "modal data in reducerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
      );
      return {
        ...state,
        consultationModalData: action.payload.data,
        consultationOpenModal: action.payload.openModal,
        firstStep: action.payload.firstStep,
        secondStep: action.payload.secondStep,
      };
    case CONSULTATION_MODAL_ACTION_TYPE.CONSULTATION_OPEN_MODAL:
      return {
        ...state,
        consultationOpenModal: action.payload,
      };
    case CONSULTATION_MODAL_ACTION_TYPE.CONSULTATION_MODAL_LOADING:
      return {
        ...state,
        consultationModalLoading: action.payload,
      };
    case CONSULTATION_MODAL_ACTION_TYPE.CLOSE_CONSULTATION_CONFIRM_MODAL:
      return {
        ...state,
        ...initialState,
      };
    case CONSULTATION_MODAL_ACTION_TYPE.OPEN_CONSULTATION_CONFIRM_MODAL:
      return {
        ...state,
        consultationModalData: action.payload.data,
        consultationOpenModal: action.payload.openModal,
        openConfirmModal: action.payload.confirmModal,
      };
    default:
      return state;
  }
};
