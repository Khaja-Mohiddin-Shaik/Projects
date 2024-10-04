import React, { useEffect, useState } from 'react'
import AdminHeader from './components/AdminHeader'
import AdminNav from './components/AdminNav'
import AdminStudentsList from './AdminStudentsList'
import { useAdminDetailsQuery } from '../../services/adminApi'
import {useParams} from "react-router-dom";
import { storeAdminDetails } from '../../features/admin/adminDetailsSlice'
import { useDispatch } from 'react-redux'
function AdminHome() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const {data} = useAdminDetailsQuery(id)
  useEffect(()=>{
    if(data){
      dispatch(storeAdminDetails(data));
    }
  }, [data, dispatch])
  return (
    <div className='min-w-full h-[100vh]'>
      <AdminHeader/> 
      <AdminNav/>
      <AdminStudentsList/>
    </div>
  )
}

export default AdminHome