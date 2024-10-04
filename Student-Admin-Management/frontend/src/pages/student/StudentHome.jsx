import React, { useEffect } from 'react'
import StudentHeader from './components/StudentHeader'
import StudentNav from './components/StudentNav'
import { useParams } from 'react-router-dom'
import { useGetOneStudentQuery } from '../../services/adminApi'
import { storeOneStudentDetail } from '../../features/student/oneStudentDetailSlice'
import { useDispatch } from 'react-redux'
function StudentHome() {
  const {branch,id} = useParams()
  const {data} = useGetOneStudentQuery({branch,studentId : id});
  const dispatch = useDispatch()
  useEffect(()=>{
  if(data){
    dispatch(storeOneStudentDetail(data))
  }    
  })
  return (
    <div className="w-full h-[100vh]">
      <StudentHeader/>
      <StudentNav/>
      <div className="home h-[84%] w-full"></div>
    </div>
  )
}

export default StudentHome