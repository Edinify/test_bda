import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FORGET_PASSWORD_ACTIONS_TYPE,
} from "../../../../redux/actions-type";
import {
  checkOTPAction,
  resendToEmailAction,
} from "../../../../redux/actions/forgetPasswordAction";
import PreviewImg from "../PreviewImg/PreviewImg";
import  LoginLogo  from "../../../../assets/icons/Login-Logo.svg";
import Loading from "../../../../globalComponents/Loading/Loading";

export const SendCode = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(120);
  const [errorMessage, setErrorMessage] = useState("");
  const forgetPassword = useSelector((state) => state.forgetPassword);
  const { loading } = useSelector((state) => state.forgetPassword);

  function hideEmail(email) {
    if (!email) {
      return "";
    }

    const atIndex = email.indexOf("@");
    if (atIndex === -1) {
      return email[0] + "*******";
    }

    const username = email.substring(0, atIndex);
    const domain = email.substring(atIndex);

    return username[0] + "********" + domain;
  }

  const emailFromLocalStorage = JSON.parse(localStorage.getItem("userEmail"));
  const hiddenEmail = hideEmail(emailFromLocalStorage);

  const resendNav = () => {
    const emailFromLocalStorage = JSON.parse(localStorage.getItem("userEmail"));
    dispatch(resendToEmailAction(emailFromLocalStorage));
    setSeconds(120);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.returnValue = "Sayfayı terk etmek istediğinizden emin misiniz?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleSendCode = () => {
    if (otp) {
      setErrorMessage("");
      dispatch(checkOTPAction(otp));
    } else {
      dispatch({
        type: FORGET_PASSWORD_ACTIONS_TYPE.FORGET_ERROR,
        payload: "Emailə gələn kodu daxil edin",
      });
    }
  };



  useEffect(() => {
    if (seconds > 0) {
      const countdownInterval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [seconds]);

  return (
    <div className="login">
      <>
        <PreviewImg />
      </>
      <div className="login-right send">
        <div className="login-right-header">
          <LoginLogo />
          <h2>E-poçtunuza kod göndərdik</h2>
          <p>
            {hiddenEmail} ünvanına göndərilən 6 rəqəmli doğrulama kodunu daxil
            edin
          </p>
        </div>
        {forgetPassword.error && (
          <div className="err-mess">{forgetPassword.error}</div>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "416px",
            display: "flex",
            flexDirection: "column",
            "@media (max-width: 550px)": {
              width: "100%",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            sx={{
              "& input": {
                fontSize: "16px",
              },
              marginTop: "20px",
              // "@media (max-width: 800px)": {
              //   width: "348px",
              // },
            }}
            label="6 rəqəmli kod"
            type="number"
            name="number"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            value={otp}
            InputLabelProps={{
              style: {
                fontSize: "16px",
                color: "#3F3F3F",
                backgroundColor: "white",
              },
            }}
          />
        </Box>
        <button type="submit" onClick={handleSendCode} className="login-btn">
          {loading ? <Loading mode="in-button" /> : "Təsdiqlə"}
        </button>
        <h6 className="back-btn" onClick={() => navigate("/forget")}>
          Geri
        </h6>

        <div className="resend">
          <p>Kodu əldə etmədinizmi?</p>
          <span className={seconds === 0 ? "count-none" : " resend-count"}>
            0:{seconds}
          </span>
          {seconds === 0 && <button className="send-again" onClick={resendNav}>Yenidən göndər</button>}
        </div>
      </div>
    </div>
  );
};
