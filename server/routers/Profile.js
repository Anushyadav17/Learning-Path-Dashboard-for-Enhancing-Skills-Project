const express = require("express");
const router = express.Router();

const {updateProfile, deleteAccount, getAllUserDetails, getEnrolledCourses, updateDisplayPicture} = require("../controllers/Profile");

const {auth, isInstructor} = require("../middlewares/auth");

router.post("/updateprofile",auth, updateProfile);
router.delete("/deleteprofile",auth, deleteAccount);
router.get("/getalluserdetails",auth, getAllUserDetails);
router.get("/getenrolledcourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

module.exports = router;