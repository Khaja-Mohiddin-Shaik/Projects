import React, { useEffect, useState } from 'react';
import StudentHeader from './components/StudentHeader';
import StudentNav from './components/StudentNav';
import { useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
function StudentProfile() {
  const [loading, setLoading] = useState(true);
  const studentDetails = useSelector((state) => state.student.oneStudentDetail);
  const navigate = useNavigate();

  useEffect(() => {
    if (studentDetails) {
      setLoading(false);
    }
  }, [studentDetails]);

  return (
    <div className="w-full h-[100vh] bg-white">
      <StudentHeader />
      <StudentNav />
      <div className="w-full h-[84%]">
        {loading ? (
          <div className="w-full h-[84%] flex justify-center items-center">
            <i className="text-black fa-solid fa-spinner fa-spin fa-2xl"></i>
          </div>
        ) : (
          studentDetails && (
            <div className="w-full h-full bg-white">
              <form className="w-full h-full p-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rollno" className="block font-semibold text-black">
                      Roll No:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={studentDetails.userId}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="branch" className="block font-semibold text-black">
                      Branch:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={studentDetails.branch}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="year" className="block font-semibold text-black">
                      Year:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={studentDetails.year}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="sem" className="block font-semibold text-black">
                      Sem:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={studentDetails.sem}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="firstName" className="block font-semibold text-black">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={studentDetails.firstName}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block font-semibold text-black">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={studentDetails.lastName}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-semibold text-black">
                      Email:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={studentDetails.email}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="age" className="block font-semibold text-black">
                      Age:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={studentDetails.age}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="phNo" className="block font-semibold text-black">
                      Phone 1:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={studentDetails.phNo}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="phNo2" className="block font-semibold text-black">
                      Phone 2:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={studentDetails.phNo2}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="motherName" className="block font-semibold text-black">
                      Mother Name:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={studentDetails.motherName}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="fatherName" className="block font-semibold text-black">
                      Father Name:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={studentDetails.fatherName}
                      readOnly
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="address" className="block font-semibold text-black">
                      Address:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      value={studentDetails.address}
                      readOnly
                    />
                  </div>
                </div>
                <div className="">
              <Link className="w-20 p-2 mt-2 text-white bg-green-600 rounded-md" onClick={() => navigate(-1)}>
          Back
        </Link>
        </div>
              </form>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default StudentProfile;
