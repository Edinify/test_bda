import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import Eye from "../../../../assets/icons/eye.svg?react";
import EyeSlash from "../../../../assets/icons/eye-slash.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { ValidationSchema } from "../Validation/RegisterValidationSchema";
import { loginAction } from "../../../../redux/actions/auth";
import Loading from "../../../../globalComponents/Loading/Loading";
import { Box, TextField } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");

  const [title, setTitle] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [view, setView] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
    },
    validationSchema: ValidationSchema,
  });

  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );

  const handleView = () => {
    setView(!view);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authFunc();
    // TODO: dispatch a register action or submit data to API
    console.log({ fullname, email, password });
  };

  const authFunc = () => {
    formik.setFieldTouched("password", true);
    formik.setFieldTouched("email", true);
    formik.setFieldTouched("fullName", true);
    if (
      formik.isValid &&
      !(
        title.email.trim() === "" &&
        title.password.trim() === "" &&
        title.fullName.trim() === ""
      )
    ) {
      console.log(title);
      // dispatch(loginAction(title));
    }
  };

  return (
    <div className="register">
      <div className="register-right">
        <div className="register-right-header">
          {/* <LoginLogo /> */}
          <h2>Qeydiyyat</h2>
        </div>

        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            width: "416px",
            display: "flex",
            flexDirection: "column",
            "@media (max-width: 600px)": {
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
              "& .MuiFormHelperText-root": {
                fontSize: "12px",
                color: "#FF462A",
                fontWeight: 400,
              },
            }}
            label="Ad soyad"
            type="text"
            name="fullName"
            InputLabelProps={{
              style: {
                fontSize: "16px",
                color: "#3F3F3F",
                backgroundColor: "white",
              },
            }}
            helperText={
              formik.errors.fullName && formik.touched.fullName
                ? formik.errors.fullName
                : ""
            }
            error={formik.errors.fullName && formik.touched.fullName ? true : false}
            value={title.fullName}
            onChange={(e) => {
              setTitle({ ...title, fullName: e.target.value });
              setInputValue("fullName", e.target.value);
            }}
          />
          <TextField
            sx={{
              "& input": {
                fontSize: "16px",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "12px",
                color: "#FF462A",
                fontWeight: 400,
              },
              marginTop: "20px",
            }}
            label="Email adresiniz"
            type="email"
            name="email"
            InputLabelProps={{
              style: {
                fontSize: "16px",
                color: "#3F3F3F",
                backgroundColor: "white",
              },
            }}
            helperText={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : ""
            }
            error={formik.errors.email && formik.touched.email ? true : false}
            value={title.email}
            onChange={(e) => {
              setTitle({ ...title, email: e.target.value });
              setInputValue("email", e.target.value);
            }}
          />

          <div className="password-class">
            <TextField
              sx={{
                "& input": {
                  fontSize: "16px",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "12px",
                  color: "#FF462A",
                  fontWeight: 400,
                },

                marginTop: "20px",
              }}
              label="Şifrə"
              type={view ? "password" : "text"}
              name="password"
              fullWidth
              InputLabelProps={{
                style: {
                  fontSize: "16px",
                  color: "#3F3F3F",
                  backgroundColor: "white",
                },
              }}
              helperText={
                formik.errors.password && formik.touched.password
                  ? formik.errors.password
                  : ""
              }
              error={
                formik.errors.password && formik.touched.password ? true : false
              }
              value={title.password}
              onChange={(e) => {
                setTitle({ ...title, password: e.target.value });
                setInputValue("password", e.target.value);
              }}
            />
            <div className="view-icon" onClick={handleView}>
              {view ? <EyeSlash /> : <Eye />}
            </div>
          </div>

          <button className="register-btn">
            {loading ? <Loading mode="in-button" /> : " Qeydiyyat "}
          </button>

          <button className="register-btn" onClick={() => navigate("/login")}>
            Hesabınız var? Daxil olun
          </button>
        </Box>
      </div>
    </div>
  );
};

export default Register;
