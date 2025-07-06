import { REPORT_ACTION_TYPE } from "../actions-type";

const initialState = {
  totalAmountSumContinuesStudents: "",
  totalDebtContinueStudents: "",
  totalDebtDisabledStudents: "",
  totalAmountSumWaitingStudents: "",
  continuesStudentsCountForCourse: [],
  studentsIncomes: {},
  soldConsultationsCount: [],
  waitinGroupsWithStudentsCount: [],
  subtitutedLessonsCount: [],
  consultationStatistics: {},
  studentsCountAndTotalContractAmountStatus: [],
  totalStudentsPayments: [],
  studentsSalesType:[]
};

export const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_ACTION_TYPE.GET_TOTAL_AMOUNT_SUM_CONTINUES_STUDENTS:
      return {
        ...state,
        totalAmountSumContinuesStudents: action.payload,
      };
    case REPORT_ACTION_TYPE.GET_TOTAL_DEBT_CONTINUES_STUDENTS:
      return {
        ...state,
        totalDebtContinueStudents: action.payload,
      };
    case REPORT_ACTION_TYPE.GET_TOTAL_DEBT_DISABLED_STUDENTS:
      return {
        ...state,
        totalDebtDisabledStudents: action.payload,
      };
    case REPORT_ACTION_TYPE.GET_TOTAL_AMOUNT_SUM_WAITING_STUDENTS:
      return {
        ...state,
        totalAmountSumWaitingStudents: action.payload,
      };
    case REPORT_ACTION_TYPE.GET_CONTINUES_STUDENTS_COUNT_COURSE:
      return {
        ...state,
        continuesStudentsCountForCourse: action.payload,
      };
    case REPORT_ACTION_TYPE.GET_STUDENTS_INCOMES:
      return {
        ...state,
        studentsIncomes: action.payload,
      };
    case REPORT_ACTION_TYPE.GET_SOLD_CONSULTATION_COUNT_BY_COURSE:
      return {
        ...state,
        soldConsultationsCount: action.payload,
      };
    case REPORT_ACTION_TYPE.GET_WAITING_GROUPS_WITH_STUDENTS_COUNT:
      return {
        ...state,
        waitinGroupsWithStudentsCount: action.payload,
      };
    case REPORT_ACTION_TYPE.GET_SUBSTITUTED_LESSONS_COUNT:
      return {
        ...state,
        subtitutedLessonsCount: action.payload,
      };
    case REPORT_ACTION_TYPE.GET_CONSULTATION_STATISTICS:
      return {
        ...state,
        consultationStatistics: action.payload,
      };
    case REPORT_ACTION_TYPE.GET_STUDENTS_COUNT_AND_TOTAL_CONTRACT_STATUS:
      return {
        ...state,
        studentsCountAndTotalContractAmountStatus: action.payload,
      };
    case REPORT_ACTION_TYPE.GET_TOTAL_STUDENTS_PAYMENTS:
      return {
        ...state,
        totalStudentsPayments: action.payload,
      };
      case REPORT_ACTION_TYPE.GET_STUDENTS_COUNT_SALES_TYPE:
        return{
          ...state,
          studentsSalesType:action.payload
        }

    default:
      return state;
  }
};
