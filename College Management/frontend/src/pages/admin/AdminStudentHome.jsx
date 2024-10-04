import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOneStudentQuery, useUpdateStudentDetailMutation } from "../../services/adminApi";
import AdminHeader from "./components/AdminHeader";
import AdminStudentNav from "./components/AdminStudentNav";
import { useDispatch } from "react-redux";
import { storeOneStudentDetail } from "../../features/student/oneStudentDetailSlice";

function AdminStudentHome() {
  const { branch, studentId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetOneStudentQuery({ branch, studentId });
  const dispatch = useDispatch();

  const [studentDetailsState, setStudentsDetails] = useState({
    userId: "",
    year: "",
    sem: "",
    branch: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    phNo: "",
    phNo2: "",
    motherName: "",
    fatherName: "",
    address: ""
  });
  const [readMode, setReadMode] = useState(true);
  const [initialData, setInitialData] = useState(null);
  const [updateStudentDetail] = useUpdateStudentDetailMutation();

  useEffect(() => {
    if (data) {
      setStudentsDetails(data);
      setInitialData(data); // Save initial data for cancel functionality
      dispatch(storeOneStudentDetail(data));
    }
  }, [data, dispatch]);

  function toggleRead(e) {
    e.preventDefault();
    setReadMode(prev => !prev);
  }

  function handleInputChange(field, value) {
    setStudentsDetails(prev => ({ ...prev, [field]: value }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await updateStudentDetail(studentDetailsState).unwrap();
      setReadMode(true); // Switch back to read-only mode
      alert("Details successfully updated");
    } catch (error) {
      console.error("Failed to update details:", error);
      alert("Error updating details");
    }
  }

  function handleCancel(e) {
    e.preventDefault();
    setStudentsDetails(initialData); // Revert to initial data
    setReadMode(true); // Switch back to read-only mode
  }

  return (
    <div className="w-full h-[100vh] bg-white">
      <AdminHeader />
      <AdminStudentNav />
      <div className="w-full h-[84%] p-6">
        {isLoading ? (
          <div className="w-full h-[84%] flex justify-center items-center">
            <i className="fa-solid fa-spinner fa-spin fa-2xl" style={{ color: "#000000" }}></i>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center w-full h-full">
            <h1 style={{ color: "#FF0000", fontSize: "3rem" }}>Error: Unable to load data.</h1>
          </div>
        ) : (
          studentDetailsState && (
            <form className="w-full h-[90%] space-y-4" onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="userId" className="block font-semibold text-black">Roll No:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-black rounded-md"
                    value={studentDetailsState.userId}
                    onChange={(e) => handleInputChange("userId", e.target.value)}
                    readOnly={readMode}
                  />
                </div>
                <div>
                  <label htmlFor="branch" className="block font-semibold text-black">Branch:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-black rounded-md"
                    value={studentDetailsState.branch}
                    onChange={(e) => handleInputChange("branch", e.target.value)}
                    readOnly={readMode}
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block font-semibold text-black">Year:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-black rounded-md"
                    value={studentDetailsState.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    readOnly={readMode}
                  />
                </div>
                <div>
                  <label htmlFor="sem" className="block font-semibold text-black">Sem:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-black rounded-md"
                    value={studentDetailsState.sem}
                    onChange={(e) => handleInputChange("sem", e.target.value)}
                    readOnly={readMode}
                  />
                </div>
                <div>
                  <label htmlFor="firstName" className="block font-semibold text-black">First Name:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-black rounded-md"
                    value={studentDetailsState.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    readOnly={readMode}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block font-semibold text-black">Last Name:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-black rounded-md"
                    value={studentDetailsState.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    readOnly={readMode}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-semibold text-black">Email:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-black rounded-md"
                    value={studentDetailsState.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    readOnly={readMode}
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block font-semibold text-black">Age:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-black rounded-md"
                    value={studentDetailsState.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    readOnly={readMode}
                  />
                </div>
                <div>
                  <label htmlFor="phNo" className="block font-semibold text-black">Phone 1:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-black rounded-md"
                    value={studentDetailsState.phNo}
                    onChange={(e) => handleInputChange("phNo", e.target.value)}
                    readOnly={readMode}
                  />
                </div>
                <div>
                  <label htmlFor="phNo2" className="block font-semibold text-black">Phone 2:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-black rounded-md"
                    value={studentDetailsState.phNo2}
                    onChange={(e) => handleInputChange("phNo2", e.target.value)}
                    readOnly={readMode}
                  />
                </div>
                <div>
                  <label htmlFor="motherName" className="block font-semibold text-black">Mother Name:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-black rounded-md"
                    value={studentDetailsState.motherName}
                    onChange={(e) => handleInputChange("motherName", e.target.value)}
                    readOnly={readMode}
                  />
                </div>
                <div>
                  <label htmlFor="fatherName" className="block font-semibold text-black">Father Name:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-black rounded-md"
                    value={studentDetailsState.fatherName}
                    onChange={(e) => handleInputChange("fatherName", e.target.value)}
                    readOnly={readMode}
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="address" className="block font-semibold text-black">Address:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-black rounded-md"
                    value={studentDetailsState.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    readOnly={readMode}
                  />
                </div>
              </div>
              <div className="mt-4">
                {readMode ? (
                  <button
                    className="w-20 p-2 m-2 text-white bg-green-600 rounded-md"
                    onClick={toggleRead}
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      className="w-20 p-2 m-2 text-white bg-blue-600 rounded-md"
                      type="submit"
                    >
                      Update
                    </button>
                    <button
                      className="w-20 p-2 m-2 text-white bg-red-600 rounded-md"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          )
        )}
        </div>
        </div>


  );
}

export default AdminStudentHome;
