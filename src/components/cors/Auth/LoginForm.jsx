import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login} from '../../../services/opreations/authAPI'
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const [showPassword, setShowPassword] = useState(false);
   
    const { email, password } = formData;


    function changehandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }

    function submitHandler(event) {
        event.preventDefault();
        // Handle form submission logic
        dispatch(login(email, password, navigate))
    }

    return (
        <form onSubmit={submitHandler} className="mt-6 flex w-full flex-col gap-y-4 px-4 sm:px-6 md:px-8">
            <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
                    Email Address<sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={changehandler}
                    placeholder="Enter Email Address"
                    name="email"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-pure-greys-25 p-[12px] text-black"
                />
            </label>

            <label className="relative w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
                    Password<sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={changehandler}
                    placeholder="Enter Password"
                    name="password"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="bg-pure-greys-25 w-full rounded-[0.5rem] p-[12px] pr-12 text-black"
                />

                <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                    {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24}  fill="black"/>
                    ) : (
                        <AiOutlineEye fontSize={24} fill="black"/>
                    )}
                </span>

                <Link to="/forgot-password" className="mt-1 ml-auto max-w-max text-xs text-blue-100 block">
                    Forgot Password?
                </Link>
            </label>

            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-full sm:w-auto"
            >
                Sign In
            </button>
        </form>
    );
}

export default LoginForm;
