import React from "react";
import  CloseIcon  from "../../../../assets/images/howToUse/x-close.svg?react";
import  BackIcon  from "../../../../assets/icons/back-icon.svg?react";

import Search from "../Search/Search";

const DashboardUse = ({
  allRulesData,
  setHowToUse,
  setOpenDashUse,
  selectedRuleId,
}) => {
  const ruleContent = {
    1: {
      title: "İdarə panelinin istifadəsi",
      content:
        "İdarə paneli müəssisənizin ümumi statistik məlumatların alınması üçün nəzərdə tutulmuşdur.",
    },
    2: {
      title: "Baxılmamış dərslərə necə baxa bilərəm?",
      content:
        " İdarə panelində “Baxılmamış dərslər”ə klikləyin və açılmış pəncərədə göstərilmiş cədvəldən hər hansı baxılmamışdərslərdən birinə klikləyərək detalları ilə tanış olubstatusunu dəyişə bilərsiniz.",
    },
    3: {
      title: "Dərslərə hardan nəzarət edə bilərəm?",
      content: "“Davamiyyət” bölümündə bütün dərslərə nəzarət edə bilərsiniz.",
    },
    4: {
      title: "Dərs cədvəli hardan yazılır və ya dəyişdirilir?",
      content:
        " “Cədvəl” bölümündə dərs cədvəli yaza və düzəlişlər edə bilərsiniz.",
    },
    5: {
      title: "Fənn, Təlimçi və tələbələr necə əlavə edilir?",
      content:
        "“Fənlər”, “Müəllumlər”, “Tələbələr” bölümlərindən biriniseçərək əlavə edə və düzəlişlər edə bilərsiniz.",
    },
    6: {
      title: "Müəssisəmin maliyyəsinə hardan nəzarət edə bilərəm?",
      content:
        "“Maliyyə” bölümündə müəssisənizin maliyyəsinə nəzarət edə bilərsiniz.",
    },
    7: {
      title: "Təlimçilərə bonus və cərimələr hardan yazılır?",
      content:
        " “Həvəsləndirmə” bölümündə Təlimçilərə bonus və cərimələr yaza və ya düzəlişlər edə bilərsiniz.",
    },
    8: {
      title: "Təlimçi və tələbələrin geri dönüşlərinə hardan baxa bilərəm?",
      content:
        "“Rəylər” bölümündə Təlimçilər və tələbələrin rəylərinə nəzər yetirə bilərsiniz.",
    },
  };
  return (
    <div className="dashboard-use">
      <div className="how-to-use-header-con">
        <div className="how-to-use-header">
          <div className="how-to-use-head">
            <div className="back">
              <BackIcon
                onClick={() => {
                  setHowToUse(true);
                  setOpenDashUse(false);
                }}
              />
              <h2>Geri</h2>
            </div>
            <div className="how-to-use-close-icon">
              <CloseIcon onClick={() => setHowToUse(false)} />
            </div>
          </div>
          <div className="how-to-use-search">
            <Search />
          </div>
          <div className="dash-context">
            {selectedRuleId && (
              <>
                <h2>{ruleContent[selectedRuleId].title}</h2>
                {ruleContent[selectedRuleId].content && (
                  <p>{ruleContent[selectedRuleId].content}</p>
                )}
              </>
            )}
          </div>
          <div className="rule-context-con">
            {selectedRuleId === 1 &&
              allRulesData?.page1Data?.map((rule) => (
                <div className="rule-context" key={rule.id}>
                  <ul>
                    <li>{rule.text}</li>
                  </ul>
                  <div className="how-to-use-imgs desktop ">
                    {rule.img && <img src={rule.img} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs tablet ">
                    {rule.img && <img src={rule.tabletImg} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs mobile ">
                    {rule.img && <img src={rule.mobileImg} alt="/" />}
                  </div>
                </div>
              ))}
            {selectedRuleId === 2 &&
              allRulesData?.page2Data?.map((rule) => (
                <div className="rule-context" key={rule.id}>
                  <p>{rule.text}</p>
                  <div className="how-to-use-imgs desktop ">
                    {rule.img && <img src={rule.img} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs tablet ">
                    {rule.img && <img src={rule.tabletImg} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs mobile ">
                    {rule.img && <img src={rule.mobileImg} alt="/" />}
                  </div>
                </div>
              ))}
            {selectedRuleId === 3 &&
              allRulesData?.page3Data?.map((rule) => (
                <div className="rule-context" key={rule.id}>
                  <ul>
                    <li>{rule.text}</li>
                    {rule.text2 && <li>{rule.text2}</li>}
                    {rule.text3 && <li>{rule.text3}</li>}
                    {rule.text4 && <li>{rule.text4}</li>}
                  </ul>
                  <div className="how-to-use-imgs desktop ">
                    {rule.img && <img src={rule.img} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs tablet ">
                    {rule.img && <img src={rule.tabletImg} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs mobile ">
                    {rule.img && <img src={rule.mobileImg} alt="/" />}
                  </div>
                </div>
              ))}
            {selectedRuleId === 4 &&
              allRulesData?.page4Data?.map((rule) => (
                <div className="rule-context" key={rule.id}>
                  <ul>
                    <li>{rule.text}</li>
                    {rule.text2 && <li>{rule.text2}</li>}
                    {rule.text3 && <li>{rule.text3}</li>}
                    {rule.text4 && <li>{rule.text4}</li>}
                    {rule.text5 && <li>{rule.text5}</li>}
                  </ul>
                  <div className="how-to-use-imgs desktop ">
                    {rule.img && <img src={rule.img} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs tablet ">
                    {rule.img && <img src={rule.tabletImg} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs mobile ">
                    {rule.img && <img src={rule.mobileImg} alt="/" />}
                  </div>
                </div>
              ))}
            {selectedRuleId === 5 &&
              allRulesData?.page5Data?.map((rule) => (
                <div className="rule-context" key={rule.id}>
                  <ul>
                    <li>{rule.text}</li>
                  </ul>
                  <div className="how-to-use-imgs desktop ">
                    {rule.img && <img src={rule.img} alt="/" />}
                    {rule.img2 && <img src={rule.img2} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs tablet ">
                    {rule.img && <img src={rule.tabletImg} alt="/" />}
                    {rule.img2 && <img src={rule.tabletImg2} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs mobile ">
                    {rule.img && <img src={rule.mobileImg} alt="/" />}
                    {rule.img2 && <img src={rule.mobileImg2} alt="/" />}
                  </div>
                </div>
              ))}
            {selectedRuleId === 6 &&
              allRulesData?.page6Data?.map((rule) => (
                <div className="rule-context" key={rule.id}>
                  <ul>
                    <li>{rule.text}</li>
                    {rule.text2 && <li>{rule.text2}</li>}
                  </ul>
                  <div className="how-to-use-imgs desktop ">
                    {rule.img && <img src={rule.img} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs tablet ">
                    {rule.img && <img src={rule.tabletImg} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs mobile ">
                    {rule.img && <img src={rule.mobileImg} alt="/" />}
                  </div>
                </div>
              ))}
            {selectedRuleId === 7 &&
              allRulesData?.page7Data?.map((rule) => (
                <div className="rule-context" key={rule.id}>
                  <ul>
                    <li>{rule.text}</li>
                    {rule.text2 && <li>{rule.text2}</li>}
                  </ul>
                  <div className="how-to-use-imgs desktop ">
                    {rule.img && <img src={rule.img} alt="/" />}
                    {rule.img2 && <img src={rule.img2} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs tablet ">
                    {rule.img && <img src={rule.tabletImg} alt="/" />}
                    {rule.img2 && <img src={rule.tabletImg2} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs mobile ">
                    {rule.img && <img src={rule.mobileImg} alt="/" />}
                    {rule.img2 && <img src={rule.mobileImg2} alt="/" />}
                  </div>
                </div>
              ))}
            {selectedRuleId === 8 &&
              allRulesData?.page8Data?.map((rule) => (
                <div className="rule-context" key={rule.id}>
                  <ul>
                    <li>{rule.text}</li>
                  </ul>
                  <div className="how-to-use-imgs desktop ">
                    {rule.img && <img src={rule.img} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs tablet ">
                    {rule.img && <img src={rule.tabletImg} alt="/" />}
                  </div>
                  <div className="how-to-use-imgs mobile ">
                    {rule.img && <img src={rule.mobileImg} alt="/" />}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUse;
