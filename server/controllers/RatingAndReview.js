const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

//creating rating
exports.createRating = async(req,res) => {
    try {
        //get user id
        const userId = req.user.id;
        //check user enrolled or not
        const {rating, review, courseId} = req.body;
        //check user review or not
        const courseDetails = await Course.findOne(
            { _id : courseId,
            studentsEnrolled : {$elemMatch: {$eq: userId}},
        });


        if(!courseDetails) {
            return res.status(404).json({
                success : false,
                message : 'Student not enrolled in course',
            });
        }
        
        const alreadyReviewed = await RatingAndReview.findOne({
            user : userId,
            course : courseId,
        });

        if(alreadyReviewed) {
            return res.status(403).json({
                success : false,
                message : 'Course is already reviewed',
            })
        }

        const ratingReview = await RatingAndReview.create({
            rating, review,
            course : courseId,
            user : userId,
        });

        await Course.findByIdAndUpdate({_id : courseId},
            {
                $push : {
                    ratingAndReviews : ratingReview._id,
                }
            },
            {new : true});

        return res.status(200).json({
            success : true,
            message : 'Rating and Review created Successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
};
//get average rating
exports.getAverageRating = async(req,res) => {
    try {
        //get course id
        const courseId = req.body.courseid;
        //calculate avg
        const result = await RatingAndReview.aggregate([
            {
                $match : {
                    course : new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group : {
                    _id : null,
                    averageRating : {$avg : "$rating"},
                }
            }
        ])

        if(result.length > 0)
        {
            return res.status(200).json({
                success : true,
                averageRating : result[0].averageRating,
            })
        }  
        
        return res.status(200).json({
            success : true,
            message : 'Avg rating is 0, no ratings given till now',
            averageRating : 0,
        });
    }
    catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}
//get all rating

exports.getAllRating = async(req,res) => {
    try {
        const allReviews = await RatingAndReview.find({})
                                                .sort({rating : "desc"})
                                                .populate({
                                                    path : "user",
                                                    select : "firstName lastName email image",
                                                })
                                                .populate({
                                                    path : "course",
                                                    select : "courseName",
                                                })       
                                                .exec();
                                                
        return res.status(200).json({
            success : true,
            message : 'Rating fond successfully',
            averageRating : 0,
        });
        
    }
    catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}