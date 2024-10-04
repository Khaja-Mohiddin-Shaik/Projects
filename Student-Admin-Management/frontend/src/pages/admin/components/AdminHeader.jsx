import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
function AdminHeader() {
  const adminDetails = useSelector((state) => state.admin.adminDetails);
  return (
    <div className='w-full min-h-[8%] bg-black'>
      <div className="flex items-center justify-between w-full h-full">
        <div className="left"></div>
        <Link to={`/admin/profile/${adminDetails.userId}`} className='pt-6 pr-6'><i className="fa-solid fa-2xl fa-user" style={{color: "#74C0FC"}}></i></Link>
      </div>
    </div>
  )
}

export default AdminHeader