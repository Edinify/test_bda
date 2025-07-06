import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import  CloseBtn  from "../../../assets/icons/Icon.svg?react";
import { Box } from "@mui/material";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import { TUITION_FEE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import Status from "./components/Buttons/Status";
import SubmitBtn from "./components/Buttons/SubmitBtn";
// import RegionDropdown from "./components/InputDropdowns/RegionDropdown";
import InputField from "./components/Inputs/InputField";
import Select from "./components/InputDropdowns/Select";

export const TuitionFeeModal = () => {
  const dispatch = useDispatch();
  const { tuitionFeeModalData: modalData } = useSelector(
    (state) => state.tuitionFeeModal
  );
  // const [selectedStudentName, setSelectedStudentName] = useState(null);

  const groupNumberList = [
    { name: "no1", key: "no1" },
    { name: "no2", key: "no2" },
    { name: "no3", key: "no3" },
    { name: "no4", key: "no4" },
    { name: "Digər", key: "other" },
  ];
  const statusList = [
    { name: "Gözləmədə", key: "waiting" },
    { name: "Keçirildi", key: "finished" },
    { name: "Vaxtı dəyişdi", key: "timeChanged" },
    { name: "Ləğv edildi", key: "cancelled" },
    { name: "Digər", key: "other" },
  ];
  const inputNameArr1 = [
    // "groupNumber",
    "instructor",
    "status",
    "contractType",
    "price",
    "discount",
    "finalPrice",
    "amountPaid",
    "remainder",
    "fin",
    "phone",
    "startDate",
  ];

  // formik
  const formik = useFormik({
    initialValues: {
      fullName: modalData.fullName ? modalData.fullName : "",
      email: modalData.email ? modalData.email : "",
      password: modalData.password ? modalData.password : "",
      lessonAmount: modalData?.courses
        ? modalData?.courses?.find((item) => !item.lessonAmount)
          ? ""
          : 1
        : "",
      payment: modalData.payment ? modalData.payment : "",
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

  const updateModalState = (keyName, value) => {
    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.GET_TUITION_FEE_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.GET_TUITION_FEE_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  // // // console.log(modalData);
  return (
    <div className="create-update-modal-con student-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{modalData?._id ? "Tələbə yenilə" : "Tələbə yarat"}</h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            width: 500,
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="create-update-modal-form">
            <InputField
              inputName={"studentName"}
              formik={formik}
              setInputValue={setInputValue}
              modalData={modalData}
              updateModalState={updateModalState}
            />
    
            <div className="input-couples">
              {inputNameArr1.map((name, index) => (
                <InputField
                  key={index}
                  inputName={name}
                  formik={formik}
                  setInputValue={setInputValue}
                  modalData={modalData}
                  updateModalState={updateModalState}
                />
              ))}
            </div>
            <Select
              formik={formik}
              dataList={groupNumberList}
              inputName={"groupNumber"}
              label={"Qrup Nömrəsi"}
              setInputValue={setInputValue}
              updateModalState={updateModalState}
            />

            <Select
              formik={formik}
              dataList={statusList}
              inputName={"status"}
              label={"Status"}
              setInputValue={setInputValue}
              updateModalState={updateModalState}
            />
          </div>
        </Box>

        {modalData?._id ? (
          <div className="create-update-modal-btn-con">
            <Status modalData={modalData} updateModalState={updateModalState} />
            <SubmitBtn
              formik={formik}
              modalData={modalData}
              funcType="update"
            />
          </div>
        ) : (
          <SubmitBtn formik={formik} modalData={modalData} funcType="create" />
        )}

        {modalData?._id && (
          <div className="joined-time">
            Qoşuldu: {moment(modalData.createdAt).format("YYYY.MM.DD")}
          </div>
        )}
      </div>
    </div>
  );
};
