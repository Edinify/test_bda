import React, { useState } from "react";
import  CloseIcon from "../../assets/icons/Icon.svg?react";

const Loading = ({ mode }) => {
  const [openLoading, setOpenLoading] = useState(true);
  return (
    <>
      {mode === "in-button" ? (
        <div className="in-button">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        openLoading && (
          <div className="loading-main-container">
            <button onClick={() => setOpenLoading(false)} className="close-btn">
              <CloseIcon/>
              {/* <img src={CloseIcon} alt="" /> */}
            </button>
            <div className="loading-content">
              <div className="loading-con">
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <p>Yüklənir...</p>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Loading;
