import React, { useEffect, useState } from 'react';
import StudentHeader from './components/StudentHeader';
import StudentNav from './components/StudentNav';
import { useGetStudentFeesQuery } from '../../services/adminApi';
import { useParams } from 'react-router-dom';

function StudentFees() {
  const { branch, id } = useParams();
  const { data, isLoading, isError } = useGetStudentFeesQuery({ branch, studentId: id });
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sem, setSem] = useState("I-I");

  useEffect(() => {
    if (data) {
      setFormData(data);
      setLoading(false);
    }
  }, [data]);

  function handleSemChange(e) {
    setSem(e.target.value);
  }

  return (
    <div className="h-[100vh] min-w-full">
      <StudentHeader />
      <StudentNav />
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <i
            className="fa-solid fa-spinner fa-spin fa-2xl"
            style={{ color: "#000000" }}
          ></i>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center w-full h-full">
          <h1 style={{ color: "#FF0000", fontSize: "3rem" }}>
            Error: Unable to load data.
          </h1>
        </div>
      ) : (
        <div className="h-[84%] w-full">
          <div className="h-[14%] w-full text-xl pt-10 text-center">
            <label htmlFor="sem">Select sem </label>
            <select
              name="sem"
              value={sem}
              onChange={handleSemChange}
              className="border border-black rounded-md"
              id="sem"
            >
              <option value="I-I">I-I</option>
              <option value="I-II">I-II</option>
              <option value="II-I">II-I</option>
              <option value="II-II">II-II</option>
              <option value="III-I">III-I</option>
              <option value="III-II">III-II</option>
              <option value="IV-I">IV-I</option>
              <option value="IV-II">IV-II</option>
            </select>
          </div>
          <div className="h-[50%] w-full p-6">
            <form>
              {formData && formData[sem] && formData[sem].length > 0 ? (
                <table className='w-full h-full text-xl border border-black'>
                  <thead>
                    <tr>
                      <th className='border border-black'>S.No</th>
                      <th className='border border-black'>Fee type</th>
                      <th className='border border-black'>Total amount</th>
                      <th className='border border-black'>Paid amount</th>
                      <th className='border border-black'>Pending amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData[sem].map((fee, index) => (
                      <tr key={index}>
                        <td className='text-center border border-black'>{index + 1}</td>
                        <td className='text-center border border-black'>{fee.feeType}</td>
                        <td className='text-center border border-black'>
                          <input
                            type="text"
                            value={fee.totalAmount}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            readOnly={true}
                          />
                        </td>
                        <td className='text-center border border-black'>
                          <input
                            type="text"
                            value={fee.paidAmount}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            readOnly={true}
                          />
                        </td>
                        <td className='text-center border border-black'>{fee.totalAmount - fee.paidAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-xl text-center text-gray-600">
                  No data available for the selected semester.
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentFees;
