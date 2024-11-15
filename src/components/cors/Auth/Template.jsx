import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Template = ({ title, desc1, desc2, image, formtype, setisLoggedIn }) => {
    return (
        <div className="flex justify-around w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-8 md:gap-y-0 ">
            
            <div className="w-full md:w-1/2 ">
                <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold text-[1.875rem] leading-[2.375rem]">
                    {title}
                </h1>
                <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                    <span className="text-richblack-700">{desc1}</span>
                    <span className="font-edu-sa font-bold italic text-blue-100"> {desc2}</span>
                </p>

                {formtype === "signup" ? 
                    (<SignUpForm setisLoggedIn={setisLoggedIn} />) :
                    (<LoginForm setisLoggedIn={setisLoggedIn} />)
                }
            </div>

            {/* <div className="relative mx-auto w-full max-w-[450px] md:w-1/2 md:mx-0">
                <img
                    src={image}
                    alt="Pattern"
                    width={558}
                    height={504}
                    loading="lazy"
                    className="absolute -top-4 right-4 z-10 shadow-blue-100 shadow-[-5px_-5px_10px]"
                />
            </div> */}
        </div>
    );
}

export default Template;
