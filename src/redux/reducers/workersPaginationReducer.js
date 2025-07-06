import { WORKER_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  workers: [],
  totalLength: 0,
  hasMore: true,
  totalPages: 1,
  lastPage: "",
  loading: false,
};

export const workersPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case WORKER_ALL_ACTIONS_TYPE.GET_ALL_WORKERS:
      return {
        ...state,
        workers: action.payload,
        // loading: false,
      };
    case WORKER_ALL_ACTIONS_TYPE.GET_ACTIVE_WORKER:
      return {
        ...state,
        workers: action.payload,
        loading: false,
      };
    case WORKER_ALL_ACTIONS_TYPE.WORKER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case WORKER_ALL_ACTIONS_TYPE.GET_WORKER_PAGINATION:
      return {
        ...state,
        workers: [...state.workers, ...action.payload.workers],
        totalLength: action.payload.totalLength,
        hasMore: !(action.payload.workers.length < 20),
      };
    case WORKER_ALL_ACTIONS_TYPE.CREATE_WORKER:
      return {
        ...state,
        workers: [action.payload, ...state.workers],
        totalLength: state.totalLength + 1,
      };
    case WORKER_ALL_ACTIONS_TYPE.RESET_WORKER_PAGINATION:
      return {
        ...state,
        workers: [],
        totalLength: 0,
        hasMore: true,
      };
    case WORKER_ALL_ACTIONS_TYPE.UPDATE_WORKER:
      return {
        ...state,
        workers: state.workers.map((teacher) =>
          teacher._id === action.payload._id ? action.payload : teacher
        ),
      };
    case WORKER_ALL_ACTIONS_TYPE.DELETE_WORKER:
      return {
        ...state,
        workers: state.workers.filter(
          (worker) => worker._id !== action.payload
        ),
        totalLength: state.totalLength - 1,
      };
    case WORKER_ALL_ACTIONS_TYPE.GET_WORKER_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
