import React, { useEffect, useState } from "react";
import AdminHeader from "./components/AdminHeader";
import { useAdminDetailsQuery, useUpdateAdminDetailMutation } from "../../services/adminApi";
import { useParams, Link, useNavigate } from "react-router-dom";

function AdminProfile() {
  const { adminId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useAdminDetailsQuery(adminId);
  const [adminDetailsState, setAdminDetails] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    phNo: "",
    phNo2: "",
    address: ""
  });
  const [updateAdminDetail] = useUpdateAdminDetailMutation();
  const [readMode, setReadMode] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (data) {
      setAdminDetails(data);
      setInitialData(data);  // Save initial data for cancel functionality
    }
  }, [data]);

  function toggleRead(e) {
    e.preventDefault();
    setReadMode(prev => !prev);
  }

  function handleInputChange(field, value) {
    setAdminDetails(prev => ({ ...prev, [field]: value }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await updateAdminDetail(adminDetailsState).unwrap();
      setReadMode(true);  // Switch back to read-only mode
      alert("Details successfully updated");
    } catch (error) {
      console.error("Failed to update details:", error);
      alert("Error updating details");
    }
  }

  function handleCancel(e) {
    e.preventDefault();
    setAdminDetails(initialData);  // Revert to initial data
    setReadMode(true);  // Switch back to read-only mode
  }

  return (
    <div className="w-full h-[100vh] bg-white">
      <AdminHeader />
      <div className="w-full h-[92%] bg-white">
        {isLoading ? (
          <div className="w-full h-[84%] flex justify-center items-center">
            <i className="text-black fa-solid fa-spinner fa-spin fa-2xl"></i>
          </div>
        ) : (
          adminDetailsState && (
            <div className="w-full h-[96%] bg-white">
              <form className="w-full h-full p-6 space-y-4" onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="userId" className="block font-semibold text-black">Roll No:</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={adminDetailsState.userId}
                      onChange={(e) => handleInputChange("userId", e.target.value)}
                      readOnly={readMode}
                    />
                  </div>
                  <div>
                    <label htmlFor="firstName" className="block font-semibold text-black">First Name:</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={adminDetailsState.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      readOnly={readMode}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block font-semibold text-black">Last Name:</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={adminDetailsState.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      readOnly={readMode}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-semibold text-black">Email:</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={adminDetailsState.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      readOnly={readMode}
                    />
                  </div>
                  <div>
                    <label htmlFor="age" className="block font-semibold text-black">Age:</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={adminDetailsState.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      readOnly={readMode}
                    />
                  </div>
                  <div>
                    <label htmlFor="phNo" className="block font-semibold text-black">Phone 1:</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={adminDetailsState.phNo}
                      onChange={(e) => handleInputChange("phNo", e.target.value)}
                      readOnly={readMode}
                    />
                  </div>

                  <div>
                    <label htmlFor="phNo2" className="block font-semibold text-black">Phone 2:</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={adminDetailsState.phNo2}
                      onChange={(e) => handleInputChange("phNo2", e.target.value)}
                      readOnly={readMode}
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="address" className="block font-semibold text-black">Address:</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={adminDetailsState.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      readOnly={readMode}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  {readMode ? (
                    <button className="w-20 p-2 m-2 text-white bg-green-600 rounded-md" onClick={toggleRead}>
                      Edit
                    </button>
                  ) : (
                    <>
                      <button className="w-20 p-2 m-2 text-white bg-blue-600 rounded-md" type="submit">
                        Update
                      </button>
                      <button className="w-20 p-2 m-2 text-white bg-red-600 rounded-md" onClick={handleCancel}>
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </form>
              <div className="fixed bottom-0 left-0 p-4">
                <Link
                  className="w-20 p-2 text-white bg-green-600 rounded-md"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Link>
              </div>
            </div>
          )
        )}
        <div className="h-[2%] w-full"></div>
      </div>
    </div>
  );
}

export default AdminProfile;
