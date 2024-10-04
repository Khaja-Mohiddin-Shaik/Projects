import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function AdminNav() {
  const adminDetails = useSelector((state) => state.admin.adminDetails);
  const userId = adminDetails.userId;

  return (
    <div className="w-full min-h-[8%] p-3 text-[1.2rem] flex justify-around shadow-lg">
      <NavLink 
        to={`/admin/home/${userId}`} 
        className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}
      >
        Home
      </NavLink>
      <NavLink 
        to={`/admin/academics/${userId}`} 
        className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}
      >
        Academics
      </NavLink>
    </div>
  );
}

export default AdminNav;
