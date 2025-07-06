import {  useState } from "react";
import { useDispatch,  } from "react-redux";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";
import { updateLessonTableAction } from "../../../../../redux/actions/lessonTableActions";

const SaveButton = ({
    teacherDisabled, 
    user, 
    updatedResultData, 
    updatedPart,
    mode
}) => {

    const dispatch = useDispatch();
    const lessonModalLoading  = false
    const tableType = "main page"
    const [studentAttendanceErr, setStudentAttendanceErr] = useState(false)
    
    const updateLesson = () => {
        const unCheckedStudents = updatedResultData.students && updatedResultData.students.filter((student) => student.attendance === 0 )
        if(tableType === 'main page' || tableType === 'temporary page') {
          if(unCheckedStudents.length > 0) { 
            setStudentAttendanceErr({student: true})
          } else if(user?.role === 'teacher' && !(updatedResultData.note && updatedResultData.task)) {
            setStudentAttendanceErr({student: false, task: true})
          } else {
            dispatch(updateLessonTableAction({lessonData:{...updatedResultData, ...updatedPart}}))
            setStudentAttendanceErr({student: false, task: false})
          }
        }
    };
  return (
    <>
    {!teacherDisabled &&
      <div className={`teacher-modal-save-btn ${mode} ${(user?.role === 'teacher') ? 'active' : ''} `}>
        {studentAttendanceErr.student && <small className="student-attendance-error">Bütün tələbələr yoxlanılmadır.</small>}
        {studentAttendanceErr.task && <small className="student-attendance-error">Tapşırıqlar və müəllim qeydi daxil edilməlidir.</small>}
        <button onClick={()=>updateLesson()} className="save-btn" disabled={lessonModalLoading}>
          {lessonModalLoading ? <LoadingBtn /> : 'Yadda saxla'}
        </button>
      </div>
    }
    </>
  )
}

export default SaveButton