import { useEffect, useState } from "react";
import CloseBtn  from "../../../assets/icons/Icon.svg?react";
import moment from "moment";
import 'moment/locale/az';
import ContentCon from "./components/ContentCon/ContentCon";
import ModalStudents from "./components/ModalStudents/ModalStudents";
import Status from "./components/Buttons/Status";
import SaveButton from "./components/Buttons/SaveButton";

const LessonModal = ({ showModal, handleClose }) => {
  // const {modalLesson} =useSelector(state=>state.modalLesson);
  // const { user } = useSelector((state) => state.user);
  const user = {role: "teacher"}
  const lessonData = []
  const [togggleIcon, setToggleIcon] = useState(true);
  const [updatedResultData, setUpdatedResultData] = useState('');
  const [updatedPart, setUpdatedPart] = useState()
  const showHideClassName = showModal ? "main-table-modal display-block" : "main-table-modal display-none";
  const todayDate = new Date()
  const lessonDate = lessonData && new Date(lessonData[0]?.date)
  todayDate.setHours(0, 0, 0, 0)
  lessonDate.setHours(0, 0, 0, 0)
  const finishedLesson = moment(lessonDate).isBefore(todayDate);
  const futureLesson = moment(lessonDate).isAfter(todayDate);
  const todayLesson = moment(lessonDate).format( "DD MM YYYY") === moment(todayDate).format( "DD MM YYYY")
  const yesterdayLesson = moment().subtract(1, 'day').format( "DD MM YYYY") === moment(lessonDate).format( "DD MM YYYY")
  const [teacherDisabled, setTeacherDisabled] = useState(() => {
    if(user?.role === 'teacher') {
     if(todayLesson || yesterdayLesson) {
      return false
     } else {
      return true
     }
    } else if(user?.role === 'admin' || user?.role === 'super-admin') {
      if(futureLesson) {
        return true
      } else {
        return false
      }
    }
  })

  const closeModal = () => {
    handleClose()
    setToggleIcon('')
  }

  // useEffect(()=>{
  //   setUpdatedResultData({...lessonData[0]})
  // },[lessonData])

  useEffect(() => {
    if(updatedResultData) {
      setUpdatedPart({
        course: updatedResultData.course?._id, 
        status: updatedResultData.status,
        teacher: updatedResultData.teacher?._id,
        students: updatedResultData.students?.map((item) => {return {...item, student: item.student._id}}),
      })
    }
  }, [updatedResultData])

  return (
    <div className={showHideClassName}>
      <section className="main-table-modal-con">
        <div>
          <button className="close-btn" onClick={closeModal}>
            <CloseBtn />
          </button>

          <div className="table-modal-content">
            <div className="modal-header">
              <ContentCon lessonData={lessonData} name={'Müəllim'} />
              <ContentCon lessonData={lessonData} name={'Fənn'} />
              <ContentCon lessonData={lessonData} name={'Tarix'} />
              <ContentCon lessonData={lessonData} name={'Vaxt'} />
            </div>

            {!futureLesson &&
              <>
              <ContentCon 
              lessonData={lessonData} 
              name={'Müəllim qeydi'} 
              teacherDisabled={teacherDisabled}
              updatedResultData={updatedResultData}
              setUpdatedResultData={setUpdatedResultData}
              />
              <ContentCon 
              lessonData={lessonData} 
              name={'Tapşırıqlar'} 
              teacherDisabled={teacherDisabled}
              updatedResultData={updatedResultData}
              setUpdatedResultData={setUpdatedResultData}
              />
              </>
            }

            <ModalStudents 
            teacherDisabled={teacherDisabled}
            updatedResultData={updatedResultData}
            setUpdatedResultData={setUpdatedResultData}
            setToggleIcon={setToggleIcon}
            togggleIcon={togggleIcon}
            user={user}
            />

            <div className="modal-buttons">
              <Status 
              updatedResultData={updatedResultData} 
              setUpdatedResultData={setUpdatedResultData}
              futureLesson={futureLesson}
              user={user}
              />

              <SaveButton 
                teacherDisabled={teacherDisabled}
                user={user}
                updatedResultData={updatedResultData}
                updatedPart={updatedPart}
                handleClose={handleClose}
                todayLesson={todayLesson}
                mode={"desktop"}
              />
            </div>
          </div>
        </div>
        

        <SaveButton 
          teacherDisabled={teacherDisabled}
          user={user}
          updatedResultData={updatedResultData}
          updatedPart={updatedPart}
          handleClose={handleClose}
          todayLesson={todayLesson}
          mode={"mobile"}
        />
      </section>
    </div>
  );
};

export default LessonModal;
