import React from "react";
import homepageimage from "../assets/Images/section1img.jpg";
import HighlightText from "../components/cors/Homepage/HighlightText";
import CATButton from "../components/cors/Homepage/Button";
import CodeBlock from "../components/cors/Homepage/CodeBlock";
import Footer from "../components/comman/Footer";
import InstructorSection from "../components/cors/Homepage/InstructorSection";
import GetStartedButton from "../components/cors/Homepage/GetStartedButton";

const Home = () => {
    return (
        <div className="md:m-0 md:p-0 bg-white relative"> {/* Remove margin and padding on medium screens and above */}
            {/* Section 1 */}
            <div className="m-10 md:mb-0  md:p-5  md:pb-0 relative md:mt-0"> {/* Add margin and padding for small screens */}
                <div className="flex flex-col md:flex-row-reverse md:flex-wrap">
                    <div className="w-full md:w-2/4 ">
                        <img src={homepageimage} alt="" className="w-full "/>
                    </div>
                    <div className="w-full md:w-2/4">

                        <div className="text-4xl md:text-5xl m-5 md:m-10 mt-10 md:mt-20 mb-0 font-bold text-wrap relative md:h-1/8  w-11/12 md:top-8 ">
                            Empower Your Future with{" "}
                            <HighlightText text={"Coding Skills"} />
                        </div>
                        <div className="m-5 md:m-10 mt-2 md:mt-2 text-richblack-700 text-wrap relative md:h-1/6  md:top-4 w-10/12 md:mb-0">
                            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                        </div>

                        <div className="relative md:m-10 md:mt-0 flex flex-col md:flex-row gap-2 md:gap-7 font-bold">
                            {/* <CATButton linkTo={"/login"} active={true}>
                                Get Started
                            </CATButton> */}
                            <GetStartedButton/>
                        </div>
                    </div>
                </div>

                
                {/*code section1*/}
                <div>
                    <CodeBlock
                    position={"md:flex-row-reverse"}
                       heading={
                        <div>
                            Unlock your <HighlightText text={"Coding Potential"}></HighlightText> with our online courses.
                        </div>
                       }
                       subheading = {"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                       ctabutton1={
                           {
                               text:"Try it Yourself",
                               linkTo : "/signup",
                               active : true,
                           }
                       }
                       ctabutton2={
                            {
                                text:"Learn More",
                                linkTo : "/login",
                                active : false,
                            }
                       }
                       codeblock = {`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a>\n</body>\n</html>`}
                       
                    >

                    </CodeBlock>
                </div>


                {/*code section2*/}
                <div className="mb-0">
                    <CodeBlock
                       position={"md:flex-row"}
                       heading={
                        <div>
                            Start <HighlightText text={"Coding in Seconds."}></HighlightText>
                        </div>
                       }
                       subheading = {"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                       ctabutton1={
                           {
                               text:"Contiune Lessons",
                               linkTo : "/signup",
                               active : true,
                           }
                       }
                       ctabutton2={
                            {
                                text:"Learn More",
                                linkTo : "/login",
                                active : false,
                            }
                       }
                       codeblock = {`#include <iostream>\nusing namesapce std;\nint main() \n{\nstd::cout << "Hello, World!";\nreturn 0;\n}`}
                       
                    >

                    </CodeBlock>
                </div>


            </div>

             {/* Section 2 */}
             <div className="bg-richblack-900 relative mt-0">

                <InstructorSection/>

             </div>
            
            {/* footer*/}
            <Footer/>
        </div>
    )
}

export default Home;
