import React from 'react'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux'
function StudentHeader() {
  const studentDetails = useSelector((state) => state.student.oneStudentDetail)
  return (
    <div className='w-full min-h-[8%] bg-black'>
    <div className="flex items-center justify-between w-full h-full">
      <div className="w-[50%] h-full left"></div>
      <div className="w-[50%] h-full flex justify-end right">
       <Link to={`/student/studentprofile/${studentDetails.branch}/${studentDetails.userId}`} className='pt-6 pr-6'><i className="fa-solid fa-2xl fa-user" style={{color: "#74C0FC"}}></i></Link>
        </div>
    </div>
  </div>
  )
}

export default StudentHeader