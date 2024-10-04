import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

function StudentNav() {
  const { branch, id } = useParams();

  return (
    <div className="w-full h-[8%] p-3 text-[1.2rem] flex justify-around shadow-lg">
      <NavLink 
        to={`/student/home/${branch}/${id}`}
        className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}
      >
        Home
      </NavLink>
      <NavLink 
        to={`/student/fees/${branch}/${id}`}
        className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}
      >
        Fees
      </NavLink>
      <NavLink 
        to={`/student/results/${branch}/${id}`}
        className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}
      >
        Results
      </NavLink>
      <NavLink 
        to={`/student/academics/${branch}/${id}`}
        className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}
      >
        Academics
      </NavLink>
    </div>
  );
}

export default StudentNav;
