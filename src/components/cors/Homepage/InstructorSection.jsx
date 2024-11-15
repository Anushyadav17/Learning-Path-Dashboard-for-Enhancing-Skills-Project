import React from "react";
import CTAButton from "./Button";
import HighlightText from "./HighlightText";
import Instructor from "../../../assets/Images/Instructor.png";


const InstructorSection = () => {
    return(
        <div className="flex flex-col md:flex-row md:flex-wrap items-center p-20 justify-around mt-0">
                    <div className="relative  md:w-[40%]  items-center shadow-blue-200 shadow-[-10px_-10px_30px] object-cover">
                        <img src={Instructor} alt="" className=""/>
                    </div>
                    <div className="w-full md:w-2/4 items-center ">

                        <div className="text-4xl md:text-5xl m-5 md:m-10 mt-10 md:mt-20 mb-0 font-bold text-wrap relative md:h-1/8  w-11/12 md:top-8 ">
                            <h1 className=" text-4xl font-semibold text-white">
                                Become an<br></br>
                                <HighlightText text={"Instructor"} />
                            </h1>

                        </div>
                        <div className="m-5 md:m-10 mt-2 md:mt-2  text-wrap relative md:h-1/6  md:top-4 w-10/12 font-medium text-[16px] text-justify w-[90%] text-richblack-300">
                        Instructors from around the world teach millions of students on StudyWebsite. We provide the tools and skills to teach what you love.
                        </div>

                        <div className="relative md:m-10 md:mt-10 flex flex-col md:flex-row gap-7 ">
                            <CTAButton linkTo={"/signup"} active={true}>
                                Start Teaching Today
                            </CTAButton>


                        </div>
                    </div>
                </div>
    )
}

export default InstructorSection