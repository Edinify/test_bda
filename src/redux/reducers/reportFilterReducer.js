import { REPORT_FILTER_ACTION_TYPE } from "../actions-type";

const initialState = {
  reportDateSelectedOption: "",
  reportChooseDate: "",
  reportMonthFilter: "",

  consultationStatisticSelectedOption: "",
  consultationStatisticChooseDate: "",
  consultationStatisticMonthFilter: "",

  studentsCountContractStatusSelectedOption: "",
  studentsCountContractStatusChooseDate: "",
  studentsCountContractStatusMonthFilter: "",

  salesDivitionDateSelectedOption: "",
  salesDivitionChooseDate: "",
  salesDivitionMonthFilter: "",
};

export const reportFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_FILTER_ACTION_TYPE.GET_REPORT_CHOOSE_DATE_FILTER:
      return {
        ...state,
        reportChooseDate: action.payload?.reportChooseDate,
        reportMonthFilter: "",
      };
    case REPORT_FILTER_ACTION_TYPE.GET_REPORT_MONTHS_FILTER:
      return {
        ...state,
        reportChooseDate: "",
        reportMonthFilter: action.payload.reportMonthFilter,
      };
    case REPORT_FILTER_ACTION_TYPE.GET_REPORT_DATE_SELECTED_OPTION:
      return {
        ...state,
        reportDateSelectedOption: action.payload,
      };

    case REPORT_FILTER_ACTION_TYPE.GET_CONSULTATION_STATISTICS_CHOOSE_DATE_FILTER:
      return {
        ...state,
        consultationStatisticChooseDate:
          action.payload.consultationStatisticChooseDate,
        consultationStatisticMonthFilter: "",
      };
    case REPORT_FILTER_ACTION_TYPE.GET_CONSULTATION_STATISTICS_DATE_SELECTED_OPTION:
      return {
        ...state,
        consultationStatisticSelectedOption: action.payload,
      };
    case REPORT_FILTER_ACTION_TYPE.GET_CONSULTATION_STATISTICS_MONTH_FILTER:
      return {
        ...state,
        consultationStatisticChooseDate: "",
        consultationStatisticMonthFilter:
          action.payload.consultationStatisticMonthFilter,
      };

    case REPORT_FILTER_ACTION_TYPE.GET_STUDENTS_COUNT_CONTRACT_STATUS_CHOOSE_DATE_FILTER:
      return {
        ...state,
        studentsCountContractStatusChooseDate:
          action.payload.studentsCountContractStatusChooseDate,
        studentsCountContractStatusMonthFilter: "",
      };
    case REPORT_FILTER_ACTION_TYPE.GET_STUDENTS_COUNT_CONTRACT_STATUS_DATE_SELECTED_OPTION:
      return {
        ...state,
        studentsCountContractStatusSelectedOption: action.payload,
      };
    case REPORT_FILTER_ACTION_TYPE.GET_STUDENTS_COUNT_CONTRACT_STATUS_MONTH_FILTER:
      return {
        ...state,
        studentsCountContractStatusChooseDate: "",
        studentsCountContractStatusMonthFilter:
          action.payload.studentsCountContractStatusMonthFilter,
      };

    case REPORT_FILTER_ACTION_TYPE.GET_SALES_DIVITION_CHOOSE_DATE_FILTER:
      return {
        ...state,
        salesDivitionChooseDate: action.payload.salesDivitionChooseDate,
        salesDivitionMonthFilter: "",
      };
    case REPORT_FILTER_ACTION_TYPE.GET_SALES_DIVITION_DATE_SELECTED_OPTION:
      return {
        ...state,
        salesDivitionDateSelectedOption: action.payload,
      };
    case REPORT_FILTER_ACTION_TYPE.GET_SALES_DIVITION_MONTH_FILTER:
      return {
        ...state,
        salesDivitionChooseDate: "",
        salesDivitionMonthFilter: action.payload.salesDivitionMonthFilter,
      };

    default:
      return state;
  }
};
