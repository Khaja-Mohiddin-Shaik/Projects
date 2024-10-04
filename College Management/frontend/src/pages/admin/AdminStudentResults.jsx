import React, { useState, useEffect } from 'react';
import AdminHeader from "./components/AdminHeader";
import AdminStudentNav from "./components/AdminStudentNav";
import { useGetStudentResultQuery, useUpdateStudentResultMutation } from '../../services/adminApi';
import { useParams } from 'react-router-dom';

function AdminStudentResults() {
  const [year, setYear] = useState('I');
  const [sem, setSem] = useState('I');
  const { branch, studentId } = useParams();
  const [results, setResults] = useState(null);
  const { data, isLoading, isError, refetch } = useGetStudentResultQuery({ branch, studentId });
  const [updateStudentResult] = useUpdateStudentResultMutation();
  const [toggleRead, setToggleRead] = useState(true);

  useEffect(() => {
    if (data && data.results) {
      const result = data.results.find((result) => result.year === year && result.sem === sem);
      setResults(result);
    }
  }, [data, year, sem])

  if (!data) {
    return (
      <div className="flex justify-center w-full h-full">
        <h1 className='text-4xl font-semibold text-red-600'>No Data Found</h1>
      </div>
    );
  }

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };
  const handleSemChange = (e) => {
    setSem(e.target.value);
  };

  const handleInputChange = (e, subjectCode, field) => {
    const value = e.target.value;
    setResults(prevResults => ({
      ...prevResults,
      subjects: prevResults.subjects.map(subject => {
        if (subject.subjectCode === subjectCode) {
          const newSubject = { ...subject };
          delete newSubject._id;
          return { ...newSubject, [field]: value };
        }
        return subject;
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedResults = { ...results };
      delete updatedResults._id;
      updatedResults.subjects = updatedResults.subjects.map(subject => {
        const newSubject = { ...subject };
        delete newSubject._id;
        return newSubject;
      });
      await updateStudentResult({ branch, studentId, year, sem, results: updatedResults }).unwrap();
      setToggleRead(true); // Update toggleRead to true after saving results
      alert('Results updated successfully');
    } catch (error) {
      console.error('Failed to update results:', error);
      alert('Error updating results');
    }
  };

  const handleEditResults = () => {
    setToggleRead(false); 
  };

  return (
    <div className="w-full h-full">
      <AdminHeader />
      <AdminStudentNav />
      <div className="w-full h-[84%]">
        <div className="w-full pt-6 text-xl text-center">
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
          <h2 className="mb-2 text-2xl font-bold text-center">Results for {branch} - Year {year} - Sem {sem}</h2>
          {isLoading ? (
            <div className="text-center">
              <i className="fa-solid fa-spinner fa-spin fa-2xl" style={{ color: "#000000" }}></i>
            </div>
          ) : !results && (
            <div className="text-4xl text-center text-red-600">
              <h1>No data found for selected year and sem.</h1>
            </div>
          )}
        </div>
        {results && (
          <div className="w-full p-6">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <i className="fa-solid fa-spinner fa-spin fa-2xl" style={{ color: "#000000" }}></i>
              </div>
            ) : isError ? (
              <div className="flex items-center justify-center w-full h-full">
                <h1 style={{ color: "#FF0000", fontSize: "3rem" }}>Error: Unable to load data.</h1>
              </div>) : (
                <div className="">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border border-gray-400">Subject Code</th>
                    <th className="px-4 py-2 border border-gray-400">Subject Name</th>
                    <th className="px-4 py-2 border border-gray-400">Grade</th>
                    <th className="px-4 py-2 border border-gray-400">Grade Points</th>
                    <th className="px-4 py-2 border border-gray-400">Credits</th>
                    <th className="px-4 py-2 border border-gray-400">Status</th>

                  </tr>
                </thead>
                <tbody>
                  {results && results.subjects.map((subject) => (
                    <tr key={subject.subjectCode}>
                      <td className="px-4 py-2 border border-gray-400">{subject.subjectCode}</td>
                      <td className="px-4 py-2 border border-gray-400">{subject.subjectName}</td>
                      <td className="px-4 py-2 border border-gray-400">
                        <input
                          type="text"
                          value={subject.grade}
                          className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          readOnly={toggleRead}
                          onChange={e => handleInputChange(e, subject.subjectCode, 'grade')}
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-400">
                        <input
                          type="text"
                          value={subject.gradePoints}
                          className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          readOnly={toggleRead}
                          onChange={e => handleInputChange(e, subject.subjectCode, 'gradePoints')}
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-400">
                        <input
                          type="text"
                          value={subject.credits}
                          className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          readOnly={toggleRead}
                          onChange={e => handleInputChange(e, subject.subjectCode, 'credits')}
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-400">
                        <input
                          type="text"
                          value={subject.status}
                          className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          readOnly={toggleRead}
                          onChange={e => handleInputChange(e, subject.subjectCode, 'status')}
                        />

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center mt-2">
                  <table className="px-4 py-2 border border-gray-400">
                    <thead>
                      <th  className="px-4 py-2 border border-gray-400">Total credits</th>
                      <th className="px-4 py-2 border border-gray-400">SGPA</th>
                    </thead>
                    <tbody>
                      <td className="px-4 py-2 border border-gray-400">{results.marks.totalCredits}</td>
                      <td className="px-4 py-2 border border-gray-400">{results.marks.sgpa}</td>
                    </tbody>
                  </table>
              </div>
              </div>
            )}
            <button
              className="px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => handleEditResults()}
            >
              Edit
            </button>
            {!toggleRead && (
              <button type="submit" className="px-4 py-2 mt-2 ml-2 text-white bg-green-500 rounded-md hover:bg-green-600" onClick={handleSubmit}>
                Save Results
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminStudentResults;
