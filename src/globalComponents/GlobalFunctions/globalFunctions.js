import { useDispatch, useSelector } from "react-redux";
import  DashboardIcon  from "../../assets/icons/dashboardIcon.svg?react";
import  MainPanelIcon  from "../../assets/icons/mainPanelIcon.svg?react";
import  CoursesIcon  from "../../assets/icons/coursesIcon.svg?react";
import  TeachersIcon  from "../../assets/icons/teachersIcon.svg?react";
import  StudentsIcon  from "../../assets/icons/studentsIcon.svg?react";
import  AdvertisingIcon  from "../../assets/icons/advertising.svg?react";
import  TableIcon  from "../../assets/icons/tableIcon.svg?react";
import  EventIcon  from "../../assets/icons/sidebar/events.svg?react";
import  SalaryIcon  from "../../assets/icons/salaryIcon.svg?react";
import  ExpensesIcon  from "../../assets/icons/expensenIcon.svg?react";
import  IncomesIcon  from "../../assets/icons/incomesIcon.svg?react";
import  FeedBacksIcon  from "../../assets/icons/sidebar/feedbacks-icon.svg?react";
import  AdminIcon  from "../../assets/icons/sidebar/users-01.svg?react";
import  GroupIcon  from "../../assets/icons/sidebar/group-svgrepo-com.svg?react";
import  RoomIcon  from "../../assets/icons/room-icon.svg?react";
import  CareerIcon  from "../../assets/icons/sidebar/work-case-filled-svgrepo-com (1).svg?react";
import  SyllabusIcon  from "../../assets/icons/sidebar/syllabus-svgrepo-com.svg?react";
import  DiplomaIcon  from "../../../src/assets/icons/sidebar/diploma.svg?react";
import  SalesIcon  from "../../assets/icons/sidebar/sales.svg?react";
import  ReportIcon  from "../../assets/icons/sidebar/report.svg?react";

import {
  WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE,
  MAIN_PAGE_TYPE_ACTION_TYPE,
  MODAL_LESSON_ACTION_TYPE,
  DROPDOWN_ERROR_TYPE,
} from "../../redux/actions-type";

export function useCustomHook() {
  const dispatch = useDispatch();
  const startWeek = new Date();
  startWeek.setDate(
    startWeek.getDate() -
      (startWeek.getDay() === 0 ? 7 : startWeek.getDay()) +
      1
  );

  const { dashboardweek } = useSelector((state) => state.dashboardData);
  startWeek.setHours(0, 0, 0, 0);
  const endWeek = new Date();
  endWeek.setDate(startWeek.getDate() + 6);
  endWeek.setHours(0, 0, 0, 0);
  const weeksArr = ["", "B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş.", "B."];
  const weeksArrFullName = [
    "Bazar",
    "Bazar ertəsi",
    "Çərşənbə axşamı",
    "Çərşənbə",
    "Cümə axşamı",
    "Cümə",
    "Şənbə",
  ];

  const lessonHours = dashboardweek;

  const lessonStatusList = [
    { name: "Gözləyir", key: "unviewed" },
    { name: "Keçirilib", key: "confirmed" },
    { name: "Ləğv edilib", key: "cancelled" },
  ];

  const mentorHourList = [
    { name: "Keçirilib", key: "confirmed" },
    { name: "Keçirilməyib", key: "cancelled" },
  ];
  const fineTypeList = [
    { name: "Şifahi xəbərdarlıq", key: "verbalWarning" },
    { name: "Yazılı xəbərdarlıq", key: "writtenWarning" },
    { name: "Töhmət", key: "rebuke" },
    { name: "Şiddətli töhmət", key: "severeRebuke" },
  ];
  const whereComingList = [
    { name: "İnstagram Sponsorlu", key: "instagramSponsor" },
    { name: "İnstagram standart", key: "instagramStandart" },
    { name: "İnstruktor Tövsiyyəsi", key: "instructorRecommend" },
    { name: "Dost Tövsiyyəsi", key: "friendRecommend" },
    { name: "Sayt", key: "site" },
    { name: "Tədbir", key: "event" },
    { name: "AİESEC", key: "AİESEC" },
    { name: "PO COMMUNİTY", key: "POCOMMUNİTY" },
    { name: "Köhnə tələbə", key: "oldStudent" },
    { name: "Staff tövsiyyəsi", key: "staffRecommend" },
    { name: "SMS REKLAMI", key: "smsAd" },
    { name: "PROMOKOD", key: "promocode" },
    { name: "Resale", key: "resale" },
    { name: "Whatsapp", key: "whatsapp" },
    { name: "Facebook", key: "facebook" },
    { name: "Zəng", key: "call" },
    { name: "Digər", key: "other" },
  ];

  const salesTypeList = [
    { name: "B2B", key: "B2B" },
    { name: "B2C", key: "B2C" },
    { name: "B2G", key: "B2G" },
  ];

  const whereForDate = [
    { key: "forSales", name: "Satış tarixi" },
    { key: "forConsultation", name: "Konsultasiya tarixi" },
    { key: "forContactDate", name: "Əlaqə  tarixi" },
  ];
  const whereSendList = [
    { name: "Satış", key: "sale" },
    { name: "Technest İnside", key: "technestInside" },
    { name: "Dövlət Məşğulluq Agentliyi", key: "DMA" },
    { name: "Azərbaycan Respublikası Mədəniyyət Nazirliyi", key: "ARMN" },
    { name: "Təhsilin İnkişafı Fondu", key: "TIF" },
    { name: "Azərbaycan Respublikası Elm və Təhsil Nazirliyi", key: "ARETN" },
    { name: "Technest university", key: "technestUniversity" },
    { name: "Future leaders", key: "futureLeaders" },
    { name: "Code for Future", key: "codeForFuture" },
    { name: "Digər", key: "other" },
  ];
  const personaList = [
    { name: "Həvəsli", key: "enthusiastic" },
    { name: "Narazı", key: "dissatisfied" },
    { name: "Müşahidəçi", key: "contractor" },
    { name: "Demaqoq", key: "demagog" },
    { name: "Ekstravert", key: "extrovert" },
    { name: "İntrovert", key: "introvert" },
    { name: "Ailəcanlı", key: "familyFriendly" },
  ];
  const discountReasonList = [
    { name: "Teknest", key: "technest" },
    { name: "Tələbə plus kartı", key: "plus-card" },
    { name: "Digər", key: "other" },
  ];
  const constStatusList = [
    { name: "Yeni lead", key: "new-lead" },
    { name: "Konsultasiya istəyir", key: "appointed" },
    { name: "Satıldı", key: "sold" },
    { name: "İmtina", key: "cancelled" },
    { name: "Düşünür", key: "thinks" },
    { name: "Zəngi açmadı", key: "not-open-call" },
    { name: "Zəng çatmır", key: "call-missing" },
    { name: "Whatsappda məlumat", key: "whatsapp_info" },
  ];
  const cancelReasonList = [
    { name: "Maddi", key: "financial" },
    { name: "Vaxt Uyğunsuzluğu", key: "timeMismatch" },
    { name: "Təlimçi seçimi", key: "teacherSelection" },
    { name: "Qərarsızlıq", key: "indecision" },
  ];
  const knowledgeList = [
    { name: "Ekspert", key: "master" },
    { name: "Yaxşı", key: "good" },
    { name: "Orta", key: "normal" },
    { name: "Zəif", key: "weak" },
    { name: "Sıfır", key: "zero" },
  ];
  const paymentTypeList = [
    // { name: "Tam ödəniş", key: 1 },
    // { name: "Dərs müddətində", key: "duringLesson" },
    // { name: "11 hissəli", key: "2part" },

    { name: "Tam", key: 1 },
    { name: "Tədris müddəti", key: 2 },
    { name: "10 hissəli", key: 3 },

    // { name: "Seçim yoxdur", key: "noChoice" },
    // { name: "Kredit Kart Birbaşa", key: "creditCardDirect" },
    // { name: "Kredit Kart 10 ay", key: "creditCard10Months" },
    // { name: "Kredit kart hissəli", key: "creditCardInstallment" },
    // { name: "Teknest 70%", key: "technest70" },
    // { name: "Teknest 90%", key: "technest90" },
    // { name: "Teknest 100%", key: "technest100" },
  ];
  const tuitionFeeHeadList = [
    { key: "groupNumber", title: "Qrup Nömrəsi" },
    { key: "instructor", title: "İnstruktor" },
    { key: "status", title: "Status" },
    { key: "contractType", title: "Müqavilə növü" },
    { key: "price", title: "Məbləğ" },
    { key: "discount", title: "Endirim %" },
    { key: "finalPrice", title: "Yekun Məbləğ" },
    { key: "amountPaid", title: "Ödənilmiş məbləğ" },
    { key: "remainder", title: "Qalıq" },
    { key: "studentName", title: "Tələbənin adı" },
    { key: "fin", title: "Fin kodu" },
    { key: "phone", title: "Nömrəsi" },
    { key: "startDate", title: "Dərs baş. tarixi" },
  ];
  const generalProfileList = [
    {
      id: 1,
      name: "İdarəetmə paneli",
      key: "dashboard",
      icon: DashboardIcon,
    },
    { id: 2, name: "Hesabatlar", key: "report", icon: ReportIcon },
    { id: 3, name: "Cədvəl", key: "lessonTable", icon: TableIcon },
    { id: 4, name: "Tələbələr", key: "students", icon: StudentsIcon },
    { id: 5, name: "Təlimçilər", key: "teachers", icon: TeachersIcon },
    { id: 6, name: "Fənlər", key: "courses", icon: CoursesIcon },
    { id: 7, name: "Sillabus", key: "syllabus", icon: SyllabusIcon },
    { id: 8, name: "Qruplar", key: "groups", icon: GroupIcon },
    { id: 9, name: "Otaqlar", key: "room", icon: RoomIcon },
    { id: 10, name: "Təhsil haqqı", key: "tuitionFee", icon: ExpensesIcon },
    { id: 11, name: "Karyera", key: "career", icon: CareerIcon },
    {
      id: 12,
      name: "Konsultasiya",
      key: "consultation",
      icon: MainPanelIcon,
    },
    { id: 13, name: "Satış", key: "sales", icon: SalesIcon },
    { id: 14, name: "Tədbirlər", key: "events", icon: EventIcon },
    { id: 15, name: "Əməkdaşlar", key: "workers", icon: AdminIcon },
    { id: 16, name: "Diploma Cədvəli", key: "diploma", icon: DiplomaIcon },
    {
      id: 17,
      name: "Reklam növləri",
      key: "whereHeard",
      icon: AdvertisingIcon,
    },
  ];

  const generalProfilePowerList = [
    {
      name: "Tam-səlahiyyətli",
      key: "all",
      info: "Səhifədə mövcud olan bütün xüsusiyyətlərdən istifadə edə bilər.",
    },
    {
      name: "Yarım-səlahiyyətli",
      key: "update",
      info: "Məlumatları yalnız görə bilər və yeniləyə bilər. Yenilədikdə isə tam-səlahiyyətli istifadəçidən təsdiq almalıdır.",
    },
    {
      name: "Heç biri",
      key: "only-show",
      info: "Məlumatları yalnız görə bilər",
    },
  ];

  const careerModalWorkStatusList = [
    { name: "İşləyir", key: "employed" },
    { name: "Tələbədir", key: "student" },
    { name: "İşsizdir", key: "unemployed" },
  ];

  const diplomaDegrees = [
    { name: "Sertifikat", key: "certificate" },
    { name: "Adi diplom", key: "simple" },
    { name: "Şərəf diplomu", key: "honor" },
    { name: "Yoxdur", key: "none" },
  ];

  const diplomaStatus = [
    { name: "Yoxdur", key: "none" },
    { name: "Dizayna göndərilib", key: "send-design" },
    { name: "Dizayn olunub", key: "designed" },
    { name: "Çapa göndərildi", key: "send-print" },
    { name: "Akademiyadadır", key: "in-academy" },
    { name: "Diplom verilib", key: "awarded" },
  ];

  const studentStatus = [
    { key: "graduate", value: "Məzun" },
    { key: "continue", value: "Davam edir" },
    { key: "stopped", value: "Dayandırdı" },
    { key: "freeze", value: "Dondurdu" },
    { key: "waiting", value: "Gözləmədə" },
    { key: "debtor-graduate", value: "Borclu məzun" },
  ];

  const tuitionStatusData = [
    { key: "waiting", name: "Gözləmədə" },
    { key: "continue", name: "Davam edir (Ümumi)" },
    { key: "graduate", name: "Məzun (Ümumi)" },
    { key: "stopped", name: "Dayandırdı (Ümumi)" },
    { key: "freeze", name: "Dondurdu (Ümumi)" },
    { key: "debtor-graduate", name: "Borclu məzun" },
    { key: "debtor-continue", name: "Borclu davam edir" },
    { key: "debtor-freeze", name: "Borclu dondurdu" },
    { key: "debtor-stopped", name: "Borclu dayandırdı" },
  ];

  const getWeeksBetweenDates = (start, end) => {
    let weeksList = [];
    const startDate = new Date(start);
    const endDate = new Date(end);
    let startWeek = new Date(startDate);
    let endWeek = new Date(startDate);

    if (endWeek.getDay() > 0) {
      endWeek.setDate(startDate.getDate() + (7 - startDate.getDay()));
    }

    const lastWeekEndDay = new Date(endDate);

    if (lastWeekEndDay.getDay() > 0) {
      lastWeekEndDay.setDate(
        lastWeekEndDay.getDate() + (7 - lastWeekEndDay.getDay())
      );
    }
    lastWeekEndDay.setDate(lastWeekEndDay.getDate() + 1);

    while (lastWeekEndDay > endWeek) {
      weeksList.push({
        startWeek: startWeek.toString(),
        endWeek: endWeek.toString(),
        allWeekDays: {
          monday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 6)
          ).toString(),
          tuesday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 5)
          ).toString(),
          wednesday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 4)
          ).toString(),
          thursday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 3)
          ).toString(),
          friday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 2)
          ).toString(),
          saturday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 1)
          ).toString(),
          sunday: endWeek.toString(),
        },
      });

      if (startWeek.getDay() === 0) {
        startWeek.setDate(startWeek.getDate() + 1);
      } else {
        startWeek.setDate(startWeek.getDate() + (8 - startWeek.getDay()));
      }

      endWeek.setDate(endWeek.getDate() + 7);
    }

    weeksList.at(-1).endWeek = endDate.toString();

    dispatch({
      type: WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE.GET_SELECTED_DATES,
      payload: weeksList,
    });
  };
  const changeMainPageType = (type) => {
    dispatch({
      type: MAIN_PAGE_TYPE_ACTION_TYPE.GET_MAIN_PAGE_TYPE,
      payload: type,
    });
  };
  const createLessonModal = (data) => {
    dispatch({
      type: MODAL_LESSON_ACTION_TYPE.SET_MODAL_LESSON,
      payload: data,
    });
  };
  const clearLessonModal = () => {
    dispatch({
      type: MODAL_LESSON_ACTION_TYPE.SET_MODAL_LESSON,
      payload: { modalLesson: {}, openModal: false },
    });
  };
  const changeDropdownNameErr = (value) => {
    dispatch({ type: DROPDOWN_ERROR_TYPE.GET_DROPDOWN_ERROR, payload: value });
  };

  return {
    startWeek,
    endWeek,
    lessonHours,
    weeksArr,
    weeksArrFullName,
    fineTypeList,
    tuitionFeeHeadList,
    whereComingList,
    generalProfileList,
    generalProfilePowerList,
    paymentTypeList,
    discountReasonList,
    personaList,
    knowledgeList,
    cancelReasonList,
    constStatusList,
    lessonStatusList,
    whereSendList,
    careerModalWorkStatusList,
    getWeeksBetweenDates,
    changeMainPageType,
    createLessonModal,
    clearLessonModal,
    changeDropdownNameErr,
    diplomaDegrees,
    diplomaStatus,
    studentStatus,
    whereForDate,
    tuitionStatusData,
    salesTypeList,
  };
}
