import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import { changePasswordReducer } from "./reducers/changePasswordReducer";
import datePickerReducer from "./reducers/datepickerReducer";
import notificationsReducer from "./reducers/notificationsReducer";
import { dropdownReducer } from "./reducers/dropdownReducer";
import { dropdownNameErrReducer } from "./reducers/dropdownNameErrReducer";
import { userReducer } from "./reducers/userReducer";
import { teacherPaginationReducer } from "./reducers/teachersPaginationReducer";
import { searchValuesReducer } from "./reducers/searchValuesReducer";
import { StudentsPaginationReducer } from "./reducers/studentsPaginationReducer";
import { coursesPaginationReducer } from "./reducers/coursesPaginationReducer";
import { roomsPaginationReducer } from "./reducers/roomsPaginationReducer";
import forgotPasswordReducer from "./reducers/forgetPasswordReducer";
import { allCoursesReducer } from "./reducers/allCoursesReducer";
import { funcComponentReducer } from "./reducers/funcComponentReducer";
import { coursesModalReducer } from "./reducers/coursesModalReducer";
import { studentsModalReducer } from "./reducers/studentsModalReducer";
import { teachersModalReducer } from "./reducers/teachersModalReducer";
import { sidebarOpenReducer } from "./reducers/sidebarOpenReducer";
import { tuitionFeeDataPaginationReducer } from "./reducers/tuitionFeePaginationReducer";
import { tuitionFeeModalReducer } from "./reducers/tuitionFeeModalReducer";
import { consultationPaginationReducer } from "./reducers/consultationPaginationReducer";
import { consultationModalReducer } from "./reducers/consultationModalReducer";
import { groupModalReducer } from "./reducers/groupModalReducer";
import { workerModalReducer } from "./reducers/workerModalReducer";
import { workersPaginationReducer } from "./reducers/workersPaginationReducer";
import { profileImageReducer } from "./reducers/profileImagesReducer";
import { financeReducer } from "./reducers/financeReducer";
import { expensesReducer } from "./reducers/expensesPaginationReducer";
import { incomeReducer } from "./reducers/incomeReducer";
import { expensesModalReducer } from "./reducers/expensesModalReducer";
import { incomesModalReducer } from "./reducers/incomesModalReducer";
import { financeFilterReducer } from "./reducers/financeFilterReducer";
import { studentStatusReducer } from "./reducers/studentStatusReducer";
import { teacherStatusReducer } from "./reducers/teacherStatusReducer";
import { careerModalReducer } from "./reducers/careerModalReducer";
import { careerPaginationReducer } from "./reducers/careerPaginationReducer";
import { syllabusModalReducer } from "./reducers/syllabusModalReducer";
import { syllabusPaginationReducer } from "./reducers/syllabusPaginationReducer";
import { syllabusCourseReducer } from "./reducers/syllabusCourseReducer";
import { lessonTableModalReducer } from "./reducers/lessonTableModalReducer";
import { lessonTablePaginationReducer } from "./reducers/lessonTablePaginationReducer";
import { groupsPaginationReducer } from "./reducers/groupsPaginationReducer";
import { dropdownGroupReducer } from "./reducers/dropdownGroupReducer";
import mentorsReducer from "./reducers/mentorsReducer";
import { salesReducer } from "./reducers/salesReducer";
import { leadReducer } from "./reducers/leadReducer";
import { leadModalReducer } from "./reducers/leadModalReducer";
import { eventsPaginationReducer } from "./reducers/eventsPaginationReducer";
import { eventModalReducer } from "./reducers/eventModalReducer";
import { dashboardReducer } from "./reducers/dashboardReducer";
import { dropdownTeacherReducer } from "./reducers/dropdownTeacherReducer";
import { paymentStatusReducer } from "./reducers/paymentStatusReducer";
import { weeksBetweenSelectedDatesReducer } from "./reducers/weeksBetweenSelectedDateReducer";
import { tableTypeReducer } from "./reducers/tableTypeReducer";
import { paginationPageNumberReducer } from "./reducers/paginationPageNumber";
import { mainPageTypeReducer } from "./reducers/mainpageTypeReducer";
import { downloadExcelReducer } from "./reducers/downloadExcelReducer";
import { diplomaPaginationReducer } from "./reducers/diplomaPaginationReducer";
import { diplomaModalReducer } from "./reducers/diplomaModalReducer";
import { studentGroupStatusReducer } from "./reducers/studentGroupStatusReducer";
import { tuitionFeePaymentReducer } from "./reducers/tuitionFeePaymentReducer";
import { roomsModalReducer } from "./reducers/roomsModalReducer";
import { consultationStatusReducer } from "./reducers/consultationStatusReducer";
import { filterReducer } from "./reducers/filterReducer";
import { allGroupsReducer } from "./reducers/allGroupsReducer";
import { selectedGroupsReducer } from "./reducers/selectedGroupsReducer";
import { reportFilterReducer } from "./reducers/reportFilterReducer";
import { reportReducer } from "./reducers/reportReducer";
import { whereHeardModalReducer } from "./reducers/whereHeardModalReducer";
import { whereHeardReducer } from "./reducers/whereHeardReducer";
import { updatesReducer } from "./reducers/updatesReducer";
import { udpatesModalReducer } from "./reducers/updatesModalReducer";

const initialState = {};
const reducers = combineReducers({
  dashboardData: dashboardReducer,
  teachersPagination: teacherPaginationReducer,
  coursesPagination: coursesPaginationReducer,
  roomsPagination: roomsPaginationReducer,
  eventsPagination: eventsPaginationReducer,
  studentsPagination: StudentsPaginationReducer,
  auth: authReducer,
  changePass: changePasswordReducer,
  datepicker: datePickerReducer,
  notifications: notificationsReducer,
  dropdownName: dropdownReducer,
  dropdownNameError: dropdownNameErrReducer,
  user: userReducer,
  profileImg: profileImageReducer,
  searchValues: searchValuesReducer,
  forgetPassword: forgotPasswordReducer,
  allCourses: allCoursesReducer,
  allGroups: allGroupsReducer,
  funcComponent: funcComponentReducer,
  coursesModal: coursesModalReducer,
  roomsModal: roomsModalReducer,
  eventModal: eventModalReducer,
  studentsModal: studentsModalReducer,
  teachersModal: teachersModalReducer,
  openSidebar: sidebarOpenReducer,
  tuitionFeePagination: tuitionFeeDataPaginationReducer,
  tuitionFeeModal: tuitionFeeModalReducer,
  consultationPagination: consultationPaginationReducer,
  consultationModal: consultationModalReducer,
  consultationStatus: consultationStatusReducer,
  workerModal: workerModalReducer,
  workersPagination: workersPaginationReducer,
  groupModal: groupModalReducer,
  groupsPagination: groupsPaginationReducer,
  lessonTableModal: lessonTableModalReducer,
  lessonTablePagination: lessonTablePaginationReducer,
  syllabusModal: syllabusModalReducer,
  syllabusPagination: syllabusPaginationReducer,
  syllabusCourse: syllabusCourseReducer,
  careerModal: careerModalReducer,
  careerPagination: careerPaginationReducer,
  financeData: financeReducer,
  salesData: salesReducer,
  expensesData: expensesReducer,
  incomes: incomeReducer,
  leads: leadReducer,
  expensesModal: expensesModalReducer,
  incomesModal: incomesModalReducer,
  leadModal: leadModalReducer,
  financeDateFilter: financeFilterReducer,
  studentStatus: studentStatusReducer,
  studentGroupStatus: studentGroupStatusReducer,
  teacherStatus: teacherStatusReducer,
  dropdownGroup: dropdownGroupReducer,
  dropdownTeacher: dropdownTeacherReducer,
  mentors: mentorsReducer,
  paymentStatus: paymentStatusReducer,
  weeksBetweenSelectedDates: weeksBetweenSelectedDatesReducer,
  tableType: tableTypeReducer,
  pageNumber: paginationPageNumberReducer,
  mainpageType: mainPageTypeReducer,
  downloadExcel: downloadExcelReducer,
  diplomaPagination: diplomaPaginationReducer,
  diplomaModal: diplomaModalReducer,
  tuitionFeePayment: tuitionFeePaymentReducer,
  filter: filterReducer,
  selectedGroups:selectedGroupsReducer,
  reportDateFilter:reportFilterReducer,
  reportDatas:reportReducer,
  whereHeardModal:whereHeardModalReducer,
  whereHeard:whereHeardReducer,
  updatesData:updatesReducer,
  updatesModal:udpatesModalReducer
});
// test

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
