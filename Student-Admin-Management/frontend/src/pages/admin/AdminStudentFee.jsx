import React, { useEffect, useState, useRef } from 'react';
import AdminHeader from './components/AdminHeader';
import AdminStudentNav from './components/AdminStudentNav';
import { useParams } from 'react-router-dom';
import { useGetStudentFeesQuery, useUpdateStudentFeesMutation } from '../../services/adminApi';

function AdminStudentFee() {
  const [toggleRead, setToggleRead] = useState(true);
  const [sem, setSem] = useState("I-I");
  const { branch, studentId } = useParams();
  const { data, isLoading, isError } = useGetStudentFeesQuery({ studentId, branch });
  const [updateStudentFees] = useUpdateStudentFeesMutation();
  const [formData, setFormData] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    if (!toggleRead && formRef.current) {
      formRef.current.querySelector('input').focus();
    }
  }, [formRef, toggleRead]);

  useEffect(() => {
    if (data) {
      const initialData = data[sem] ? data[sem].map(fee => ({
        ...fee,
        totalAmount: fee.totalAmount || 0,
        paidAmount: fee.paidAmount || 0
      })) : [];
      setFormData(initialData);
    }
  }, [data, sem]);

  function toggleReadFunction() {
    setToggleRead(prev => !prev);
  }

  function handleSemChange(e) {
    setSem(e.target.value);
  }

  function handleInputChange(index, field, value) {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
  }

  const filteredData = formData;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateStudentFees({ branch, studentId, sem, fees: formData }).unwrap();
      setToggleRead(true);  // Switch back to read-only mode
      alert("Data successfully updated");
    } catch (error) {
      console.error("Failed to update student fees:", error);
      alert("Error updating data");
    }
  }

  return (
    <div className="h-[100vh] min-w-full">
      <AdminHeader />
      <AdminStudentNav />
      {isLoading ? (
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
            <select name="sem" value={sem} onChange={handleSemChange} className="border border-black rounded-md" id="sem">
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
            <form ref={formRef}>
              {filteredData.length === 0 ? (
                <div className="text-xl text-center text-gray-600">
                  No data available for the selected semester.
                </div>
              ) : (
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
                    {filteredData.map((fee, index) => (
                      <tr key={index}>
                        <td className='text-center border border-black'>{index + 1}</td>
                        <td className='text-center border border-black'>{fee.feeType}</td>
                        <td className='text-center border border-black'>
                          <input
                            type="text"
                            value={fee.totalAmount}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            readOnly={toggleRead}
                            onChange={(e) => handleInputChange(index, 'totalAmount', e.target.value)}
                          />
                        </td>
                        <td className='text-center border border-black'>
                          <input
                            type="text"
                            value={fee.paidAmount}
                            className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            readOnly={toggleRead}
                            onChange={(e) => handleInputChange(index, 'paidAmount', e.target.value)}
                          />
                        </td>
                        <td className='text-center border border-black'>{fee.totalAmount - fee.paidAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </form>
            <div className="h-[20%] mt-4 w-full items-center flex flex-col">
              <button className="w-20 p-2 mb-4 text-xl text-white bg-green-600 rounded-md" onClick={toggleReadFunction}>
                {toggleRead ? 'Edit' : 'Cancel'}
              </button>
              {!toggleRead && (
                <button className="w-20 p-2 text-xl text-white bg-blue-600 rounded-md" type='submit' onClick={handleSubmit}>
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminStudentFee;
