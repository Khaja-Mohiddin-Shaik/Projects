import React, { useState } from 'react';
import { useStudentsDetailsQuery } from '../../services/adminApi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminStudentsList() {
  const [branch, setBranch] = useState('CSM');
  const [year, setYear] = useState('I');
  
  const { data, isLoading, isError } = useStudentsDetailsQuery({ branch, year });
  const adminDetails = useSelector((state) => state.admin.adminDetails);

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };


  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className='flex flex-col h-[84%] items-center  min-w-full pt-4'>
      <div className="w-full pb-6 text-xl text-center">
        <label htmlFor="branch" className="mr-4">Select Branch</label>
        <select 
          name="branch" 
          value={branch} 
          onChange={handleBranchChange} 
          className="p-2 mb-4 border border-gray-400 rounded-md"
        >
          <option value="CSM">CSM</option>
          <option value="CSE">CSE</option>
          <option value="EEE">EEE</option>
        </select>

        <label htmlFor="year" className="ml-8 mr-4">Select Year</label>
        <select 
          name="year" 
          value={year} 
          onChange={handleYearChange} 
          className="p-2 mb-4 border border-gray-400 rounded-md"
        >
          <option value="I">I</option>
          <option value="II">II</option>
          <option value="III">III</option>
          <option value="IV">IV</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <i className="text-gray-600 fa-solid fa-spinner fa-spin fa-3x"></i>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center w-full h-full">
          <h1 className="text-3xl font-semibold text-red-600">Error: Unable to load data.</h1>
        </div>
      ) : data && data.length === 0 ? (
        <h1 className="text-xl text-gray-600">No data found</h1>
      ) : (
        <div className="overflow-x-auto w-[90%]">
          <table className='min-w-full border border-collapse border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-4 py-2 text-left border border-gray-300'>S.No</th>
                <th className='px-4 py-2 text-left border border-gray-300'>Roll No</th>
                <th className='px-4 py-2 text-left border border-gray-300'>Name</th>
                <th className='px-4 py-2 text-left border border-gray-300'>Link</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((student, index) => (
                <tr key={index} className='even:bg-gray-50'>
                  <td className='px-4 py-2 text-center border border-gray-300'>{index + 1}</td>
                  <td className='px-4 py-2 text-center border border-gray-300'>{student.userId}</td>
                  <td className='px-4 py-2 text-center border border-gray-300'>{student.firstName} {student.lastName}</td>
                  <td className='px-4 py-2 text-center border border-gray-300'>
                    <Link 
                      className='text-blue-600 hover:underline' 
                      to={`/admin/home/${adminDetails.userId}/${branch}/${student.userId}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminStudentsList;
