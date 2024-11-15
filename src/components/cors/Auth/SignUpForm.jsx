import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setSignupData} from "../../../slices/authSlice"
import { sendotp } from "../../../services/opreations/authAPI";
import Tab from "../../comman/Tab";
import { ACCOUNT_TYPE } from "../../../utils/constants"

const SignUpForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);



    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function changehandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);

    function submitHandler(event) {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Password and Confirm Password do not match");
            return;
        }

        // Handle form submission logic
        const signupData = {
            ...formData,
            accountType,
        }
          
        dispatch(setSignupData(signupData));

        dispatch(sendotp(formData.email, navigate))

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          })
          setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    // data to pass to Tab component
    const tabData = [
        {
        id: 1,
        tabName: "Student",
        type: ACCOUNT_TYPE.STUDENT,
        },
        {
        id: 2,
        tabName: "Instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]

    return (
        <form onSubmit={submitHandler} className="flex w-full flex-col gap-y-4 p-4 sm:p-6 h-[calc(100vh-18rem)]">
            {/* Student Instructor tab */}
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />

            <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex-1">
                    <p className="mb-1 leading-[1.375rem] text-black">First Name<sup className="text-pink-200">*</sup></p>
                    <input
                        required
                        type="text"
                        name="firstName"
                        onChange={changehandler}
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                        className="bg-pure-greys-25 w-full rounded-[0.5rem] p-[12px] text-black"
                    />
                </label>

                <label className="flex-1">
                    <p className="mb-1 leading-[1.375rem] text-black">Last Name<sup className="text-pink-200">*</sup></p>
                    <input
                        required
                        type="text"
                        name="lastName"
                        onChange={changehandler}
                        placeholder="Enter Last Name"
                        value={formData.lastName}
                        style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                        className="bg-pure-greys-25 w-full rounded-[0.5rem] p-[12px] text-black"
                    />
                </label>
            </div>

            <label className="w-full">
                <p>Email Address<sup className="text-pink-200">*</sup></p>
                <input
                    required
                    type="email"
                    name="email"
                    onChange={changehandler}
                    placeholder="Enter Email Address"
                    value={formData.email}
                    style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                    className="bg-pure-greys-25 w-full  rounded-[0.5rem] p-[12px] text-black"
                />
            </label>

            <div className="flex flex-col sm:flex-row gap-4">
                <label className="relative flex-1">
                    <p className="mb-1 leading-[1.375rem] text-black">Create Password<sup className="text-pink-200">*</sup></p>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={changehandler}
                        placeholder="Enter password"
                        value={formData.password}
                        style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                        className="bg-pure-greys-25 w-full rounded-[0.5rem] p-[12px] text-black"
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-9 cursor-pointer">
                        {showPassword ? <AiOutlineEyeInvisible fontSize={24}/> : <AiOutlineEye fontSize={24}/>}
                    </span>
                </label>

                <label className="relative flex-1">
                    <p className="mb-1 leading-[1.375rem] text-black">Confirm Password<sup className="text-pink-200">*</sup></p>
                    <input
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        onChange={changehandler}
                        placeholder="Enter Confirm Password"
                        value={formData.confirmPassword}
                        style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                        className="bg-pure-greys-25 w-full rounded-[0.5rem] p-[12px] text-black"
                        
                    />
                    <span onClick={() => setshowConfirmPassword((prev) => !prev)} className="absolute right-3 top-9 cursor-pointer">
                        {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24}  fill="black"/> : <AiOutlineEye fontSize={24}  fill="black"/>}
                    </span>
                </label>
            </div>

            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-full 
                           hover:scale-95 transition-all duration-200
                           shadow p-6 rounded shadow-richblack-400"
            >
                Create Account
            </button>
        </form>
    );
}

export default SignUpForm;
