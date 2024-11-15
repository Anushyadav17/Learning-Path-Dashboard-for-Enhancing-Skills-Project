const Profile = require("../models/Profile");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")
//const { convertSecondsToDuration } = require("../utils/secToDuration")
const uploadImageToCloudinary = require("../utils/imageUploader").uploadImageToCloudinary;

exports.updateProfile = async (req,res) => {
    try { 
        //get data
        const {dateofBirth="", about="", contactNumber, gender} = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if(!contactNumber || !gender || !id){
            return res.status(404).json({
                success : false,
                message : "All fields required",
            });
        }

        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //update profile
        profileDetails.dateofBirth = dateofBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        const user = await User.findById(id).populate("additionalDetails")

        //retrun res
        return res.status(200).json({
            success : true,
            message : 'Profile updated successfully',
            data : user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message,
        });
    }
};

//delete account
exports.deleteAccount = async(req,res) => {
    try {
        //get id
        const id = req.user.id;

        //validate
        const userDetails = await User.findById(id);
        if(!userDetails) 
        {
            return res.status(404).json({
                success : false,
                message : "User not found",
            });
        }

        //delete profile
        await Profile.findByIdAndDelete({ _id:userDetails.additionalDetails});


        //delete user
        await User.findByIdAndDelete({ _id:id});

        //return res
        return res.status(200).json({
            success : true,
            message : 'Account delete successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message,
        });
    }
};


exports.getAllUserDetails = async(req,res) =>
{
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success : true,
            message : 'user data found successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message,
        });
    }
}

exports.getEnrolledCourses=async (req,res) => {
	try {
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const enrolledCourses = await User.findById(id).populate({
			path : "course",
				populate : {
					path: "courseContent",
			}
		}
		).populate("courseProgress").exec();
        // console.log(enrolledCourses);
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: enrolledCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.updateDisplayPicture = async(req,res) => {
  try{
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )

  return res.status(200).json({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
  })
 

  }
  catch (error) {
    return res.status(500).json({
        success : false,
        message : error.message,
    });
}
}
  