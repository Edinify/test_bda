import React, { useEffect, useState } from "react";
import  CloseIcon  from "../../assets/images/howToUse/x-close.svg";
import  RuleIcon  from "../../assets/images/howToUse/Zest illustrations 1.svg";
import  BackIcon  from "../../assets/icons/back-icon.svg";
// import DashboardUse from "./components/DashboardUse/DashboardUse";
import Dashboard1 from "../../assets/images/howToUse/dashboardUse/Dashboard 1 1.jpg";
import Dashboard2 from "../../assets/images/howToUse/dashboardUse/Dashboard 2 1.jpg";
import Dashboard3 from "../../assets/images/howToUse/dashboardUse/Dashboard 3 1.jpg";
import Dashboard4 from "../../assets/images/howToUse/dashboardUse/Dashboard 4 1.jpg";
import Dashboard5 from "../../assets/images/howToUse/dashboardUse/Dashboard 5 1.jpg";
import Dashboard6 from "../../assets/images/howToUse/dashboardUse/Dashboard 6 1.jpg";
import Unviewed from "../../assets/images/howToUse/unviewed/Hover 1.jpg";
import ChoosePage3 from "../../assets/images/howToUse/page3/Choose week 1.png";
import Modal1 from "../../assets/images/howToUse/page3/Modal 1.png";
import ChoosePage4 from "../../assets/images/howToUse/page4/Choosed 1.png";
import EditPage4 from "../../assets/images/howToUse/page4/Edit lesson 1.png";
import TeacherModalImg from "../../assets/images/howToUse/page5/Teachers 1.png";
import AddModalImg from "../../assets/images/howToUse/page5/Add 1.png";
import EditModalImg from "../../assets/images/howToUse/page5/Teachers 1 1.png";
import IncomeImg1 from "../../assets/images/howToUse/page6/Income 5.png";
import IncomeImg2 from "../../assets/images/howToUse/page6/Income 1 1.png";
import BonusImg from "../../assets/images/howToUse/page7/Bonus 1.png";
import AddBonusImg from "../../assets/images/howToUse/page7/Add bonus 1.png";
import BonusImg2 from "../../assets/images/howToUse/page7/Bonus 1 1.png";
import FeedbackImg from "../../assets/images/howToUse/page8/Teacher 11.png";
//  tablet images
import DashboardTablet1 from "../../assets/images/howToUse/dashboardUse/Tablet 1 1.png";
import DashboardTablet2 from "../../assets/images/howToUse/dashboardUse/Tablet 2 1.png";
import DashboardTablet3 from "../../assets/images/howToUse/dashboardUse/Tablet 3 1.png";
import DashboardTablet4 from "../../assets/images/howToUse/dashboardUse/Tablet 4 1.png";
import DashboardTablet5 from "../../assets/images/howToUse/dashboardUse/Tablet 5 1.png";
import DashboardTablet6 from "../../assets/images/howToUse/dashboardUse/Tablet 6 1.png";
import UnviewedTablet from "../../assets/images/howToUse/unviewed/Tablet 7 1.png"
import ChoosePage3Tablet1 from "../../assets/images/howToUse/page3/Tablet 1 2.png"
import ModalTablet2 from "../../assets/images/howToUse/page3/Tablet 2 2.png"
import ChoosePage4Tablet1 from "../../assets/images/howToUse/page4/Tablet 3 2.png"
import EditPage4Tablet2 from "../../assets/images/howToUse/page4/Tablet 4 2.png"
import TeacherModalImgTablet1  from "../../assets/images/howToUse/page5/Tablet 5 2.png"
import AddModalImgTablet2  from "../../assets/images/howToUse/page5/Tablet 6 2.png"
import EditModalImgTablet3  from "../../assets/images/howToUse/page5/Tablet 7 2.png"
import IncomeImg1Tablet1 from "../../assets/images/howToUse/page6/Tablet 8 1.png"
import IncomeImg2Tablet2 from "../../assets/images/howToUse/page6/Tablet 9 1.png"
import BonusImgTablet1 from "../../assets/images/howToUse/page7/Tablet 10 1.png"
import AddBonusImgTablet2 from "../../assets/images/howToUse/page7/Tablet 10.png"
import BonusImg2Tablet3 from "../../assets/images/howToUse/page7/Tablet 11 1.png"
import FeedbackTabletImg from "../../assets/images/howToUse/page8/Tablet 12.png";
// 

//  mobile images 
import DashboardMobile1 from "../../assets/images/howToUse/dashboardUse/Mobile 1 1.png";
import DashboardMobile2 from "../../assets/images/howToUse/dashboardUse/Mobile 2 1.png";
import DashboardMobile3 from "../../assets/images/howToUse/dashboardUse/Mobile 3 1.png";
import DashboardMobile4 from "../../assets/images/howToUse/dashboardUse/Mobile 4 1.png";
import DashboardMobile5 from "../../assets/images/howToUse/dashboardUse/Mobile 5 1.png";
import DashboardMobile6 from "../../assets/images/howToUse/dashboardUse/Mobile 6 1.png";
import UnviewedMobile from "../../assets/images/howToUse/unviewed/Mobile 7.png"
import ChoosePage3Mobile1 from "../../assets/images/howToUse/page3/Mobile 7 1.png"
import ModalMobile2 from "../../assets/images/howToUse/page3/Mobile 8 1.png"
import ChoosePage4Mobile1 from "../../assets/images/howToUse/page4/Mobile 9 1.png"
import EditPage4Mobile2 from "../../assets/images/howToUse/page4/Mobile 10 1.png"
import TeacherModalImgMobile1  from "../../assets/images/howToUse/page5/Mobile 11 1.png"
import AddModalImgMobile2  from "../../assets/images/howToUse/page5/Mobile 12 1.png"
import EditModalImgMobile3  from "../../assets/images/howToUse/page5/Mobile 13 1.png"
import IncomeImg1Mobile1 from "../../assets/images/howToUse/page6/Mobile 14.png"
import IncomeImg2Mobile2 from "../../assets/images/howToUse/page6/Mobile 1 5.png"
import BonusImgMobile1 from "../../assets/images/howToUse/page7/Mobile 2 2.png"
import AddBonusImgMobile2 from "../../assets/images/howToUse/page7/Mobile 3 2.png"
import BonusImg2Mobile3 from "../../assets/images/howToUse/page7/Mobile 4 2.png"
import FeedbackMobileImg from "../../assets/images/howToUse/page8/Mobile 5 2.png";
// 



import "./howToUse.css";
import Search from "./components/Search/Search";

const HowToUse = ({ setHowToUse, howToUse }) => {
  const [selectedRuleId, setSelectedRuleId] = useState(null);
  const [openDashUse, setOpenDashUse] = useState(false);

  const ruleData = [
    { id: 1, text: "İdarə panelinin istifadəsi" },
    { id: 2, text: "Baxılmamış dərslərə necə baxa bilərəm?" },
    { id: 3, text: "Dərslərə hardan nəzarət edə bilərəm?" },
    { id: 4, text: "Dərs cədvəli hardan yazılır və ya dəyişdirilir?" },
    { id: 5, text: "Fənn, Təlimçi və tələbələr necə əlavə edilir?" },
    { id: 6, text: "Müəssisəmin maliyyəsinə hardan nəzarət edə bilərəm?" },
    { id: 7, text: "Təlimçilərə bonus və cərimələr hardan yazılır?" },
    {
      id: 8,
      text: "Təlimçi və tələbələrin geri dönüşlərinə hardan baxa bilərəm?",
    },
  ];

  const allRulesData = {
    page1Data: [
      {
        id: 1,
        text: "Solda yerləşdirilmiş bölümdə təsdiqlənmiş, ləğv edilmiş və baxılmamış dərslərin sayları göstərilmişdir.",
        img: Dashboard1,
        tabletImg: DashboardTablet1,
        mobileImg:DashboardMobile1
      },
      {
        id: 2,
        text: "Sağda yerləşdirilmiş bölümdə isə aylıq maliyyə göstəriciləri göstərilmişdir.",
        img: Dashboard2,
        tabletImg: DashboardTablet2,
        mobileImg:DashboardMobile2
      },
      {
        id: 3,
        text: "Tələbələrin sayı” bölümündə müəssisənizdə təhsil alan tələbə sayının statistikası göstərilmişdir.",
        img: Dashboard3,
        tabletImg: DashboardTablet3,
        mobileImg:DashboardMobile3
      },
      {
        id: 4,
        text: "“Sinif statistikası” bölümündə seçilmiş tarix aralığına əsasən müəssisənizdə tədris edilən dərslərin statistik payı göstərilmişdir.",
        img: Dashboard4,
        tabletImg: DashboardTablet4,
        mobileImg:DashboardMobile4
      },
      {
        id: 5,
        text: "“Bizi haradan eşidiblər?” bölümündə seçilmiş tarix aralığına əsasən müəssisənizə gələn tələbələrin sizi hardan referans aldığı haqqında statistika göstərilmişdir.",
        img: Dashboard5,
        tabletImg: DashboardTablet5,
        mobileImg:DashboardMobile5
      },
      {
        id: 6,
        text: "“Liderlər lövhəsi” bölümündə admin və tələbələrin verdiyi qiymətləndirməyə və ya keçilən dərs sayına əsəasən Təlimçilərin sıralamaları verilmişdir.",
        img: Dashboard6,
        tabletImg: DashboardTablet6,
        mobileImg:DashboardMobile6
      },
      {
        id: 7,
        text: "Hər bir məlumat kutusunun sağ-yuxarı kənarında yerləşdirilmiş təqvim ikonuna klikləyərək məlumatların hansı tarix aralığına əsasən göstərilə biləcəyini seçə bilərsiniz.",
      },
    ],
    page2Data: [
      {
        id: 1,
        img: Unviewed,
        tabletImg:UnviewedTablet,
        mobileImg:UnviewedMobile
      },
    ],
    page3Data: [
      {
        id: 1,
        text: "Cədvəlin yuxarısında yerləşdirilmiş tab-dan Təlimçi və tələbəlirin dərs cədvəlinə keçid edilir.",
        text2: "Defolt olaraq cari həftənin cədvəli açılır.",
        text3: "Seçilmiş tarix aralığına əsasən bütün dərslərə baxıla bilir",
        text4:
          "Dərslərin 3 statusu mövcuddur: Baxılmamış, Təsdiqlənmiş və Ləğv edilmiş",
        img: ChoosePage3,
        tabletImg:ChoosePage3Tablet1,
        mobileImg:ChoosePage3Mobile1
      },
      {
        id: 2,
        text: "Hər hansı dərsə klikləyərək dərs detalları ilə tanış olub statusu dəyişdirə, düzəliş edə və Təlimçii qiymətləndirilə bilərsiniz.",
        img: Modal1,
        tabletImg:ModalTablet2,
        mobileImg:ModalMobile2
      },
    ],
    page4Data: [
      {
        id: 1,
        text: "Əsas və cari cədvəllər mövcuddur.",
        text2:
          "Cari cədvəl həftə sonu “Yenilə” düyməsinə kliklənərək əsas cədvəldən kopyalanaraq yenilənir.",
        text3:
          "Cari cədvəldə edilən dəyişikliklər yalnız olduğunuz həftənin cədvəlini yeniləyir.",
        text4:
          "Əsas cədvəldə edilən dəyişikliklər isə olduğunuz həftədən sonrakı həftənin cədvəlini yeniləyir.",
        text5: "Yuxarıdan Təlimçini seçərək dərsləri əlavə edə bilərsiniz",
        img: ChoosePage4,
        tabletImg:ChoosePage4Tablet1,
        mobileImg:ChoosePage4Mobile1
      },
      {
        id: 2,
        text: "Dərs əlavə edə bilmək üçün boş xanalardan hər hansı birinə klikləməyiniz kifayətdir. Mövcud dərsdə dəyişiklilər edə bilmk üçün isə həmin dərsin üzərinə klikləməyiniz kifayətdir.Açılmış pəncərədən seçilmiş fənnə uyğun olaraq həmin dərsə tələbələri əlavə edə bilərsiniz.",
        img: EditPage4,  
         tabletImg:EditPage4Tablet2,
         mobileImg:EditPage4Mobile2

      },
    ],
    page5Data: [
      {
        id: 1,
        text: "Yuxarı sağda yerləşdirilimiş “Əlavə et” düyməsinə klikləyin açılmış pəncərədən uyğun məlumatları doldurarq əlavə edə bilərsiniz.",
        img: TeacherModalImg,
        img2: AddModalImg,
        tabletImg:TeacherModalImgTablet1,
        tabletImg2:AddModalImgTablet2,
        mobileImg:TeacherModalImgMobile1,
        mobileImg2:AddModalImgMobile2

      },
      {
        id: 2,
        text: "Əgər mövcud fənn,  və ya tələbədə dəyişiklik etmək istəyirsinizsə üç nöqtəyə klikləyərək “Yenilə”-ni seçərək lazimi dəyişiklikləri edə bilərsiniz.",
        img: EditModalImg,
        tabletImg:EditModalImgTablet3,
        mobileImg:EditModalImgMobile3
      },
    ],
    page6Data: [
      {
        id: 1,
        text: "Seçilmiş tarixə uyğun olaraq mədaxil, xərc, dövriyyə və qazancınıza nəzər yetirə bilərsiniz.",
        img: IncomeImg1,
        tabletImg:IncomeImg1Tablet1,
        mobileImg:IncomeImg1Mobile1
      },
      {
        id: 2,
        text: "Mədaxil və xərclər əlavə edə və ya düzəlişlər edə bilərsiniz.",
        text2:
          "Burada siz mədaxil və ya xərcin kateqoriyasına, təyinatına, dəyərinə və tarixinə baxa bilərsiniz.",
        img: IncomeImg2,
        tabletImg:IncomeImg2Tablet2,
        mobileImg:IncomeImg2Mobile2
      },
    ],
    page7Data: [
      {
        id: 1,
        text: "Yuxarı sağda yerləşdirilimiş “Əlavə et” düyməsinə klikləyin açılmış pəncərədən uyğun məlumatları doldurarq bonus və ya cərimələr yaza edə bilərsiniz.",
        img: BonusImg,
        img2: AddBonusImg,
        tabletImg:BonusImgTablet1,
        tabletImg2:AddBonusImgTablet2,
        mobileImg:BonusImgMobile1,
        mobileImg2:AddBonusImgMobile2
      },
      {
        id: 2,
        text: "Əgər mövcud bonus və ya cəriməyə dəyişiklik etmək istəyirsinizsə üç nöqtəyə klikləyərək “Yenilə”-ni seçərək lazimi dəyişiklikləri edə bilərsiniz.",
        img: BonusImg2,
        tabletImg:BonusImg2Tablet3,
        mobileImg:BonusImg2Mobile3
      },
    ],
    page8Data: [
      {
        id: 1,
        text: "Burada siz rəylərin kim haqqında və tarixinə baxa bilərsiniz.",
        img: FeedbackImg,
        tabletImg:FeedbackTabletImg,
        mobileImg:FeedbackMobileImg
      },
    ],
  };

  return (
    <div className="how-to-use">
      <div className={`how-to-use-header-con ${openDashUse ? "active" : ""}`}>
        <div className="how-to-use-header">
          <div className="how-to-use-head">
            <div className="how-to-use-back-mobile">
              <BackIcon onClick={() => setHowToUse(false)}  />
            </div>
            <h2>Necə işləyir?</h2>
            <div className="how-to-use-close-icon">
              <CloseIcon onClick={() => setHowToUse(false)} />
            </div>
          </div>
          <div className="how-to-use-search">
            <Search />
          </div>
          <div className="how-to-use-rule-con">
            <div className="rule-con">
              <RuleIcon />
              <div className="rule-about">
                <h2>Qaydalara baxış</h2>
                <p>Gözdən keçirərək təcrübənizi artırın</p>
              </div>
            </div>
          </div>
          <div className="rule-context-con">
            {ruleData.map((rule) => (
              <div className="rule-context" key={rule.id}>
                <p>{rule.text}</p>
                <svg
                  onClick={() => {
                    setOpenDashUse(true);
                    setSelectedRuleId(rule.id);
                  }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Icons/Line/Arrows/chevron-right">
                    <path
                      id="Icon"
                      d="M9 18L15 12L9 6"
                      stroke="#717171"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
      {openDashUse && (
        <DashboardUse
          allRulesData={allRulesData}
          selectedRuleId={selectedRuleId}
          setHowToUse={setHowToUse}
          setOpenDashUse={setOpenDashUse}
        />
      )}
    </div>
  );
};

export default HowToUse;
