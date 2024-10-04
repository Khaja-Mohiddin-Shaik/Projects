const detailsModel = require("../model/studentsDetailsSchema");
const adminDetail = require("../model/adminDetailSchema");
const FeedetailsModel = require("../model/studentFeeSchema");
const studentTimetablesModel = require("../model/studentTimetableSchema");
const facultyDetailsModel = require("../model/facultyDetailSchema");
const studentResultsModel = require("../model/studentResultSchema");

const studentListFetch = async (req, res) => {
  try{
    const branch = req.params.branch;
    const year = req.params.year;
    if(branch == "CSM") collection = "CSM-details";
    else if (branch == "CSE") collection = "CSE-details";
    else collection = "EEE-details";

    if (!Object.keys(detailsModel).includes(collection)) {
      return res.status(404).json(`Collection ${collection} not found`);
    }

    try {
      const data = await detailsModel[collection].find({ branch, year });
      if (!data) {
        return res
          .status(404)
          .json(`Users not found in collection ${collection}`);
      }
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json("Error fetching data");
    }
  }catch (err) {
    console.log(err);
  }
  };

const adminDetails = async (req, res) => {
  try {
    const admin = req.params;
    const details = await adminDetail.findOne({ userId: admin.id });
    res.json(details);
  } catch (err) {
    console.log(err);
  }
};

const getOneStudent = async (req, res) => {
  try {
    const userId = req.params.id;
    const branch = req.params.branch;
    
    if(branch == "CSM") collection = "CSM-details";
    else if (branch == "CSE") collection = "CSE-details";
    else collection = "EEE-details";

    if (!Object.keys(detailsModel).includes(collection)) {
      return res.status(404).json(`Collection ${collection} not found`);
    }

    try {
      const data = await detailsModel[collection].findOne({ userId });
      if (!data) {
        return res
          .status(404)
          .json(`User not found in collection ${collection}`);
      }
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json("Error fetching data");
    }
  } catch (err) {
    console.log(err);
  }
};

const studentDetailUpdate = async (req, res) => {
  try {
    const {  branch, userId } = req.params;
    const updateData = req.body;
    let collection;

    if (branch === "CSM") collection = "CSM-details";
    else if (branch === "CSE") collection = "CSE-details";
    else collection = "EEE-details";

    if (!detailsModel[collection]) {
      return res.status(404).json({ message: `Collection ${collection} not found` });
    }

    try {
      const result = await detailsModel[collection].updateOne(
        { userId },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: `User with ID ${userId} not found in ${collection}` });
      }

      if (result.modifiedCount === 0) {
        return res.status(200).json({ message: `No changes made to the data` });
      }

      res.json({ message: `Data successfully updated`, result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating data", error });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", err });
  }
};


const adminDetailUpdate = async (req, res) => {
  try {
    const data = req.body;
    const admin = req.params;
    await adminDetail.updateOne({ userId: admin.id }, { $set: data });
    res.json({ status: "data updated" });
  } catch (err) {
    console.log(err);
  }
};

const getStudentFees = async (req, res) => {
  try {
    const { branch, userId } = req.params;
    let collection;

    if (branch === "CSM") collection = "CSM-fees";
    else if (branch === "CSE") collection = "CSE-fees";
    else if (branch === "EEE") collection = "EEE-fees";
    else return res.status(400).json({ message: `Invalid branch: ${branch}` });

    // Check if the collection exists
    if (!FeedetailsModel[collection]) {
      return res.status(404).json({ message: `Collection ${collection} not found` });
    }

    try {
      const result = await FeedetailsModel[collection].findOne({ userId });

      if (!result) {
        return res.status(404).json({ message: `User with ID ${userId} not found in ${collection}` });
      }

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching data", error });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", err });
  }
};


const updateStudentFees = async (req, res) => {
  try {
    const { studentId, sem, fees } = req.body;

    if (!studentId || !sem || !Array.isArray(fees)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const branch = req.params.branch; 

    let collection;
    if (branch === "CSM") collection = "CSM-fees";
    else if (branch === "CSE") collection = "CSE-fees";
    else if (branch === "EEE") collection = "EEE-fees";
    else return res.status(400).json({ message: `Invalid branch: ${branch}` });

    if (!FeedetailsModel[collection]) {
      return res.status(404).json({ message: `Collection ${collection} not found` });
    }

    const updateResult = await FeedetailsModel[collection].updateOne(
      { userId: studentId },
      { $set: { [sem]: fees } }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: `Student with ID ${studentId} not found` });
    }

    if (updateResult.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes were made to the data" });
    }

    res.json({ message: "Data successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating data", error });
  }
};


const getTimetable = async (req,res)=>{
  try {
    const branch = req.params.branch;
    const year = req.params.year;
    const sem = req.params.sem;

    if (!branch || !year || !sem  ) {
      return res.status(400).json({ message: "Invalid input data" });
    } 

    let collection;
    if (branch === "CSM") collection = "CSM-timetables";
    else if (branch === "CSE") collection = "CSE-timetables";
    else if (branch === "EEE") collection = "EEE-timetables";
    else return res.status(400).json({ message: `Invalid branch: ${branch}` });

    if (!studentTimetablesModel[collection]) {
      return res.status(404).json({ message: `Collection ${collection} not found` });
    }

    const timetables = await studentTimetablesModel[collection].find({ branch, year, sem});

    res.json(timetables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data", error });
  } 
}

const updateTimetable = async (req, res) => {
  try {
    const branch = req.params.branch;
    const year = req.params.year;
    const timetable = req.body; 

    if (!branch || !year || !timetable) {
      return res.status(400).json({ message: "Invalid input data" });
    } 

    let collection;
    if (branch === "CSM") collection = "CSM-timetables";
    else if (branch === "CSE") collection = "CSE-timetables";
    else if (branch === "EEE") collection = "EEE-timetables";
    else return res.status(400).json({ message: `Invalid branch: ${branch}` });

    if (!studentTimetablesModel[collection]) {
      return res.status(404).json({ message: `Collection ${collection} not found` });
    }

    const updatedTimetable = await studentTimetablesModel[collection].findOneAndUpdate(
      { branch, year },
      { $set :  timetable } 
    );

    if (!updatedTimetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    res.status(200).json({ message: "Timetable updated successfully" });
  } catch (error) {
    console.error('Error updating timetable:', error);
    res.status(500).json({ message: "Error updating timetable", error });
  }
};




const getFacultyDetails = async (req, res) => {
  try {
    const branch = req.params.branch;
    const year = req.params.year;
    const sem = req.params.sem;

    if (!branch || !year || !sem) {
      return res.status(400).json({ message: "Invalid input data" });
    } 

    let collection;
    if (branch === "CSM") collection = "CSM-faculties";
    else if (branch === "CSE") collection = "CSE-faculties";
    else if (branch === "EEE") collection = "EEE-faculties";
    else return res.status(400).json({ message: `Invalid branch: ${branch}` });

    if (!facultyDetailsModel[collection]) {
      return res.status(404).json({ message: `Collection ${collection} not found` });
    }

    const facultyDetails = await facultyDetailsModel[collection].find({ branch, year, sem });

    res.json(facultyDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching faculty details", error });
  }
};

const updateFacultyDetails = async (req, res) => {
  try {
    const { branch, year, sem } = req.params;
    const facultyData = req.body; // This should be an array of faculty objects with specific details

  if (!branch || !year || !sem || !Array.isArray(facultyData) || facultyData.length === 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Determine the collection name based on the branch
    const collectionMap = {
      CSM: "CSM-faculties",
      CSE: "CSE-faculties",
      EEE: "EEE-faculties"
    };

    const collection = collectionMap[branch];
    if (!collection) {
      return res.status(400).json({ message: `Invalid branch: ${branch}` });
    }

    // Check if the collection exists
    if (!facultyDetailsModel[collection]) {
      return res.status(404).json({ message: `Collection ${collection} not found` });
    }

    // Update the faculty details for the specified branch and year
    const updateResult = await facultyDetailsModel[collection].updateOne(
      { year, branch, sem },
      { $set: { facultyDetails: facultyData } } // Assuming facultyData is an array of updated faculty details
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: `Faculty record not found` });
    }

    if (updateResult.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made" });
    }

    res.json({ message: "Faculty details updated successfully" });
  } catch (error) {
    console.error('Error updating faculty details:', error);
    res.status(500).json({ message: "Error updating faculty details", error });
  }
};

const getStudentResult = async (req, res) =>{
 try {
    const branch = req.params.branch;
    const studentId = req.params.studentId;

    if (!branch || !studentId) {
      return res.status(400).json({ message: "Invalid input data" });
    } 

    let collection;
    if (branch === "CSM") collection = "CSM-results";
    else if (branch === "CSE") collection = "CSE-results";
    else if (branch === "EEE") collection = "EEE-results";
    else return res.status(400).json({ message: `Invalid branch: ${branch}` });

    if (!studentResultsModel[collection]) {
      return res.status(404).json({ message: `Collection ${collection} not found` });
    }

    const studentResults = await studentResultsModel[collection].findOne({ branch, studentId });

    res.json(studentResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching faculty details", error });
  }
}

const updateStudentResult = async (req, res) =>{
  try {
    const branch = req.params.branch;
    const studentId = req.params.studentId;
    const year = req.params.year;
    const sem = req.params.sem;
    const updatedResult = req.body;
    if (!branch || !studentId || !year || !sem) {
      return res.status(400).json({ message: "Invalid input data" });
    } 

    let collection;
    if (branch === "CSM") collection = "CSM-results";
    else if (branch === "CSE") collection = "CSE-results";
    else if (branch === "EEE") collection = "EEE-results";
    else return res.status(400).json({ message: `Invalid branch: ${branch}` });

    if (!studentResultsModel[collection]) {
      return res.status(404).json({ message: `Collection ${collection} not found` });
    }

    const updateResult = await studentResultsModel[collection].updateOne(
      { studentId },
      {
        $set: {
          "results.$[result].marks": updatedResult.marks,
          "results.$[result].subjects": updatedResult.subjects
        }
      },
      {
        arrayFilters: [
          { "result.year": year, "result.sem": sem }
        ]
      }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: `Faculty record not found` });
    }

    if (updateResult.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made" });
    }

    res.json({ message: "Student result updated successfully" });
  } catch (error) {
    console.error('Error updating Student result:', error);
    res.status(500).json({ message: "Error updating Student result", error });
  }
}

module.exports = {
  studentListFetch,
  adminDetails,
  getOneStudent,
  studentDetailUpdate,
  adminDetailUpdate,
  getStudentFees,
  updateStudentFees,
  getTimetable,
  updateTimetable,
  getFacultyDetails,
  updateFacultyDetails,
  getStudentResult,
  updateStudentResult
};
