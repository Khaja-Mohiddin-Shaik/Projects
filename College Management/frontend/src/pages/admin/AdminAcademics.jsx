import React, { useEffect, useState, useRef } from 'react';
import AdminHeader from './components/AdminHeader';
import AdminNav from './components/AdminNav';
import { useGetTimetableQuery, useUpdateTimetableMutation } from '../../services/adminApi';
import { useGetFacultyDetailsQuery, useUpdateFacultyDetailsMutation } from '../../services/adminApi';

function AdminAcademics() {
  const [branch, setBranch] = useState('CSM');
  const [year, setYear] = useState('I');
  const [sem, setSem] = useState('I');
  const { data, isLoading, isError, refetch } = useGetTimetableQuery( {branch, year, sem} );
  const [updateTimetable] = useUpdateTimetableMutation();
  const { data: facultyData, refetch: facultyRefetch } = useGetFacultyDetailsQuery( {branch, year, sem} );
  const [updateFacultyDetails] = useUpdateFacultyDetailsMutation();
  const [timetable, setTimetable] = useState(null);
  const [facultyDetails, setFacultyDetails] = useState([]);
  const [editingFaculty, setEditingFaculty] = useState(false);
  const [toggleRead, setToggleRead] = useState(true);
  const formRef = useRef(null);
  const firstFacultyInputRef = useRef(null); 

  useEffect(() => {
    setTimetable(null);
    setFacultyDetails([]);
  }, [branch, year]);

  useEffect(() => {
    if (data && data.length > 0) {
      const filteredData = data.find(item => item.branch === branch && item.year === year);
      if (filteredData) {
        setTimetable(filteredData);
      }
    }
  }, [data, branch, year, sem]);

  useEffect(() => {
    if (facultyData) {
      const filteredFacultyData = facultyData.find(item => item.branch === branch && item.year === year);
      if (filteredFacultyData) {
        setFacultyDetails(filteredFacultyData.facultyDetails); 
      } else {
        setFacultyDetails([]); 
      }
    }
  }, [facultyData, branch, year]);

  useEffect(() => {
    if (!toggleRead && formRef.current) {
      formRef.current.querySelector('input').focus();
    }
  }, [toggleRead]);

  useEffect(() => {
    if (editingFaculty && firstFacultyInputRef.current) {
      firstFacultyInputRef.current.focus(); // Focus on the first faculty input field when editing starts
    }
  }, [editingFaculty]);

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
    refetch();
    facultyRefetch();
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    refetch(); 
    facultyRefetch();
  };
  const handleSemChange = (e) => {
    setSem(e.target.value);
    refetch(); 
    facultyRefetch();
  };

  const toggleReadFunction = () => {
    setToggleRead(prev => !prev);
  };

  const handleInputChange = (e, day, period) => {
    const value = e.target.value;
    setTimetable(prevTimetable => ({
      ...prevTimetable,
      [day]: {
        ...prevTimetable[day],
        [period]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTimetable({ branch, year,sem, timetable }).unwrap();
      setToggleRead(true);
      alert('Timetable updated successfully');
    } catch (error) {
      console.error('Failed to update timetable:', error);
      alert('Error updating timetable');
    }
  };

  const handleEditFaculty = () => { 
    setEditingFaculty(prev => !prev);
  };

  const handleFacultyInputChange = (e, index, field) => {
    const { value } = e.target;
    setFacultyDetails(prevDetails => {
      const newDetails = [...prevDetails];
      newDetails[index] = { ...newDetails[index], [field]: value };
      return newDetails;
    });
  };

  const handleFacultySubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFacultyDetails({ branch, year,sem, facultyDetails }).unwrap();
      setEditingFaculty(false);
      alert('Faculty details updated successfully');
    } catch (error) {
      console.error('Failed to update faculty details:', error);
      alert('Error updating faculty details');
    }
  };

  return (
    <div className="w-full h-[100vh]">
      <AdminHeader />
      <AdminNav />
      <div className="w-full h-[84%]">
        <div className="w-full pt-6 text-xl text-center">
          <label htmlFor="branch" className="mr-4">Select Branch</label>
          <select
            name="branch"
            value={branch}
            onChange={handleBranchChange}
            className="p-2 pb-4 border border-gray-400 rounded-md"
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
          <label htmlFor="sem" className="ml-8 mr-4">Select Sem</label>
          <select
            name="sem"
            value={sem}
            onChange={handleSemChange}
            className="p-2 mb-4 border border-gray-400 rounded-md"
          >
            <option value="I">I</option>
            <option value="II">II</option>
          </select>
        </div>

        <div className="w-full p-6">
          {isLoading && (
            <div className="flex items-center justify-center w-full h-full">
              <i className="fa-solid fa-spinner fa-spin fa-2xl" style={{ color: "#000000" }}></i>
            </div>
          )}
          {isError && (
            <div className="flex items-center justify-center w-full h-full">
              <h1 style={{ color: "#FF0000", fontSize: "3rem" }}>Error: Unable to load data.</h1>
            </div>
          )}
          {timetable && (
            <div className="w-full h-full">
              <h2 className="mb-6 text-2xl font-bold text-center">
                Timetable for {branch} - Year {year} - Sem {sem}
              </h2>
              <form ref={formRef}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border border-gray-300">Day</th>
                      <th className="px-4 py-2 border border-gray-300">9:20 - 10:20</th>
                      <th className="px-4 py-2 border border-gray-300">10:20 - 11:20</th>
                      <th className="px-4 py-2 border border-gray-300">11:20 - 11:30</th>
                      <th className="px-4 py-2 border border-gray-300">11:30 - 12:30</th>
                      <th className="px-4 py-2 border border-gray-300">12:30 - 1:20</th>
                      <th className="px-4 py-2 border border-gray-300">1:20 - 2:20</th>
                      <th className="px-4 py-2 border border-gray-300">2:20 - 3:20</th>
                      <th className="px-4 py-2 border border-gray-300">3:20 - 3:30</th>
                      <th className="px-4 py-2 border border-gray-300">3:30 - 4:30</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map(day => (
                      <tr key={day}>
                        <td className="px-4 py-2 capitalize border border-gray-300">{day}</td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={timetable[day]['1'] || ''}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            readOnly={toggleRead}
                            onChange={e => handleInputChange(e, day, '1')}
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={timetable[day]['2'] || ''}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            readOnly={toggleRead}
                            onChange={e => handleInputChange(e, day, '2')}
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">Break</td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={timetable[day]['3'] || ''}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            readOnly={toggleRead}
                            onChange={e => handleInputChange(e, day, '3')}
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">Lunch</td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={timetable[day]['4'] || ''}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            readOnly={toggleRead}
                            onChange={e => handleInputChange(e, day, '4')}
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={timetable[day]['5'] || ''}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            readOnly={toggleRead}
                            onChange={e => handleInputChange(e, day, '5')}
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">Break</td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={timetable[day]['6'] || ''}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            readOnly={toggleRead}
                            onChange={e => handleInputChange(e, day, '6')}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="button" className="px-4 py-2 mt-4 mr-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={toggleReadFunction}>
                {toggleRead? 'Edit Timetable' : 'Cancel'}
                </button>
                {!toggleRead && (
                  <button type="submit" className="px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600" onClick={handleSubmit}>
                    Save Timetable
                  </button>
                )}
              </form>
            </div>
          )}
        </div>

        <div className="w-full p-6">
          {facultyDetails && (
            <div className="w-full h-full">
              <h2 className="mb-6 text-2xl font-bold text-center">
                Faculty Details for {branch} - Year {year}
              </h2>
              <form>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border border-gray-300">Name</th>
                      <th className="px-4 py-2 border border-gray-300">Subject</th>
                      <th className="px-4 py-2 border border-gray-300">Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facultyDetails.map((faculty, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={faculty.name}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            readOnly={!editingFaculty}
                            onChange={e => handleFacultyInputChange(e, index, 'name')}
                            ref={index === 0 ? firstFacultyInputRef : null} // Assign the ref to the first input field
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={faculty.subject}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            readOnly={!editingFaculty}
                            onChange={e => handleFacultyInputChange(e, index, 'subject')}
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={faculty.phNo}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            readOnly={!editingFaculty}
                            onChange={e => handleFacultyInputChange(e, index, 'phNo')}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="button" className="px-4 py-2 mt-4 mr-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleEditFaculty}>
                  {editingFaculty ? 'Cancel' : 'Edit Faculty'}
                </button>
                {editingFaculty && (
                  <button type="submit" className="px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600" onClick={handleFacultySubmit}>
                    Save Faculty
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminAcademics;
