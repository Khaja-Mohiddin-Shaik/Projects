const express = require("express");
const adminRouter = express.Router();
const {studentListFetch, adminDetails, getOneStudent, studentDetailUpdate, adminDetailUpdate,
    getStudentFees, updateStudentFees, getTimetable, getFacultyDetails, updateTimetable,
    updateFacultyDetails,getStudentResult, updateStudentResult
} = require("../controller/AdminApi")

adminRouter.get("/studentsList/:branch/:year", studentListFetch)

adminRouter.get("/adminDetails/:id", adminDetails)

adminRouter.get("/getOneStudent/:branch/:id", getOneStudent)

adminRouter.patch("/studentDetailUpdate/:branch/:userId", studentDetailUpdate)

adminRouter.patch("/adminDetailUpdate/:id", adminDetailUpdate)

adminRouter.get("/getStudentFees/:branch/:userId",getStudentFees)

adminRouter.patch("/updateStudentFees/:branch/:studentId", updateStudentFees);

adminRouter.get("/getTimetable/:branch/:year/:sem", getTimetable);

adminRouter.patch("/updateTimetable/:branch/:year/:sem", updateTimetable)

adminRouter.get("/getFacultyDetails/:branch/:year/:sem", getFacultyDetails);

adminRouter.patch("/updateFacultyDetails/:branch/:year/:sem", updateFacultyDetails);

adminRouter.get("/getStudentResult/:branch/:studentId", getStudentResult);

adminRouter.patch("/updateStudentResult/:branch/:studentId/:year/:sem", updateStudentResult);

module.exports = adminRouter;