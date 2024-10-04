import React, {useState, useEffect} from 'react'
import StudentHeader from './components/StudentHeader'
import StudentNav from './components/StudentNav'
import { useGetTimetableQuery, useGetFacultyDetailsQuery } from '../../services/adminApi'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function StudentAcademics() {
    const {branch} = useParams();
    const studentDetails = useSelector((state) => state.student.oneStudentDetail)
    const [year, setYear] = useState("");
    const [sem, setSem] = useState("");
    useEffect(() => {
      setYear(studentDetails.year);
      setSem(studentDetails.sem);
    }, [studentDetails]);
    const {data : timetableData, isLoading : timetableLoading, isError : timetableError} = useGetTimetableQuery({branch, year, sem});
    const {data : facultyData, isLoading : facultyLoading, isError : facultyError} = useGetFacultyDetailsQuery({branch, year, sem});
    const [timetable, setTimetable] = useState(null);
    const [facultyDetails, setFacultyDetails] = useState([]);
    useEffect(() => {
        if (timetableData && timetableData.length > 0) {
          const filteredData = timetableData.find(item => item.branch === branch && item.year === studentDetails.year);
          if (filteredData) {
            setTimetable(filteredData);
          }
        }
      }, [timetableData]);
    
      useEffect(() => {
        if (facultyData) {
          const filteredFacultyData = facultyData.find(item => item.branch === branch && item.year === studentDetails.year);
          if (filteredFacultyData) {
            setFacultyDetails(filteredFacultyData.facultyDetails); 
          } else {
            setFacultyDetails([]); 
          }
        }
      }, [facultyData]);
  return (
    <div className="h-[100vh] w-full">
        <StudentHeader/>
        <StudentNav/>
        <div className="w-full h-[84%]">
        <div className="w-full p-6">
          {timetableLoading && (
            <div className="flex items-center justify-center w-full h-full">
              <i className="fa-solid fa-spinner fa-spin fa-2xl" style={{ color: "#000000" }}></i>
            </div>
          )}
          {timetableError && (
            <div className="flex items-center justify-center w-full h-full">
              <h1 style={{ color: "#FF0000", fontSize: "3rem" }}>Error: Unable to load data.</h1>
            </div>
          )}
          {timetable && (
            <div className="w-full h-full">
              <h2 className="mb-6 text-2xl font-bold text-center">
                Timetable for {studentDetails.branch} - Year {studentDetails.year}
              </h2>
              <form>
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
                            readOnly={true}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={timetable[day]['2'] || ''}
                            readOnly={true}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">Break</td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={timetable[day]['3'] || ''}
                            readOnly={true}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">Lunch</td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={timetable[day]['4'] || ''}
                            readOnly={true}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={timetable[day]['5'] || ''}
                            readOnly={true}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">Break</td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={timetable[day]['6'] || ''}
                            readOnly={true}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               
          
              </form>
            </div>
          )}
        </div>

        <div className="w-full p-6">
          {facultyDetails && (
            <div className="w-full h-full">
              <h2 className="mb-6 text-2xl font-bold text-center">
                Faculty Details for {studentDetails.branch} - Year {studentDetails.year}
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
                            readOnly={true}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={faculty.subject}
                            readOnly={true}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={faculty.phNo}
                            readOnly={true}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
        
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentAcademics