import React from 'react'
import moment from "moment";
import 'moment/locale/az';

const ContentCon = ({
    lessonData, 
    name,
    teacherDisabled,
    updatedResultData=[],
    setUpdatedResultData
}) => {

    const weeksArr = ["B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş.", "B."];
    const dataArr = [
        {
            label: 'Müəllim',
            value:  <p className="content-text">{lessonData.length > 0 ? lessonData[0].teacher.fullName : ""}</p>,
            className: 'teacher-name'
        },
        {
            label: 'Fənn',
            value: <p className="content-text">{lessonData.length > 0 ? lessonData[0].course?.name : ""}</p>,
            className: ''
        },
        {
            label: 'Tarix',
            value: 
            <p className="content-text">
            {lessonData.length > 0 ? weeksArr[lessonData[0].day - 1] : ""} 
            {lessonData.length > 0 ? ' - ' + moment(lessonData[0].date).locale('az').format( "DD MMM. YYYY") : ''}
            </p>,
            className: ''
        },
        {
            label: 'Vaxt',
            value: <p className="content-text">{lessonData.length > 0 ? lessonData[0].time : ""}</p>,
            className: ''
        },
        {
            label: 'Müəllim qeydi',
            value: 
            <textarea 
                disabled={teacherDisabled}
                onChange={(e) => setUpdatedResultData({...updatedResultData,note:e.target.value})} 
                name="" 
                id=""
                value={updatedResultData.note ? updatedResultData.note : ''}>
            </textarea>,
            className: 'modal-note'
        },
        {
            label: 'Tapşırıqlar',
            value: 
            <textarea 
                disabled={teacherDisabled}
                onChange={(e) => setUpdatedResultData({...updatedResultData,task:e.target.value})} 
                name="" 
                id="" 
                value={updatedResultData.task ? updatedResultData.task : ''}>
            </textarea>,
            className: 'modal-tasks'
        },
    ]

  return (
    <div className={`content-con ${dataArr.find((item) => item.label === name).className}`}>
        <p className="content-type">{name}: </p>
        {dataArr.find((item) => item.label === name).value}
    </div>
  )
}

export default ContentCon