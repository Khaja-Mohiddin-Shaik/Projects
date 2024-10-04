import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

function AdminStudentNav() {
  const { adminId, branch, studentId } = useParams();

  return (
    <div className="w-full h-[8%] p-3 text-[1.2rem] flex justify-around shadow-lg">
      <NavLink 
        to={`/admin/home/${adminId}/${branch}/${studentId}`}
        className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}
      >
        Home
      </NavLink>
      <NavLink 
        to={`/admin/fees/${adminId}/${branch}/${studentId}`}
        className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}
      >
        Fees
      </NavLink>
      <NavLink 
        to={`/admin/results/${adminId}/${branch}/${studentId}`}
        className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}
      >
        Results
      </NavLink>
    </div>
  );
}

export default AdminStudentNav;
