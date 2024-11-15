const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName : {
        type : String,
        required : true,
        trim : true,
    },
    courseDescription : {
        type : String,
        required : true,
        trim : true,
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    // whatYouWillLearn : {
    //     type : String,
    // },
    courseContent : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Section",
        }
    ],
    ratingAndReviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "RatingAndReview",
        }
    ],
    price : {
        type : Number,
    },
    thumbnail : {
        type : String,
    },
    // tag : {
    //     type : [String],
    //     required : true,
    // },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category", 
    },
    studentsEnrolled : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ],
});

module.exports = mongoose.model("Course", courseSchema);