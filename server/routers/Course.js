const express = require("express");
const router = express.Router();

const {createCourse, getAllCourse, getCourseDetails, editCourse, getInstructorCourses, deleteCourse, getFullCourseDetails, markLectureAsComplete} = require("../controllers/Course");
const {createCategory, showAllCategories, categoryPageDetails} = require("../controllers/Category");
const {createSection, updateSection, deleteSection} = require("../controllers/Section");
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/Subsection");
const {createRating, getAverageRating, getAllRating} = require("../controllers/RatingAndReview");

//middlewars
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

//course routes
router.post("/createCourse",auth, isInstructor, createCourse);
router.get("/getAllCourses",getAllCourse);
router.post("/getCourseDetails",getCourseDetails);
router.post("/editCourse", auth, isInstructor,editCourse)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.post("/updateCourseProgress", auth, markLectureAsComplete)

//category routes
router.post("/createCategory", createCategory);
router.get("/showAllCategories",showAllCategories);
router.post("/categoryPageDetails",categoryPageDetails);

//section routes
router.post("/addSection", auth, isInstructor, createSection)
router.post("/updateSection", auth, isInstructor, updateSection)
router.post("/deleteSection", auth, isInstructor, deleteSection)

//subsection routes
router.post("/addSubSection", auth, isInstructor, createSubSection)
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
router.post("/updateSubSection", auth, isInstructor, updateSubSection)

//rating and review
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router