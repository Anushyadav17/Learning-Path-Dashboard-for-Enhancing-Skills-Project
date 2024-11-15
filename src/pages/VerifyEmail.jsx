import React, { useState } from "react"
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {signUp, sendotp} from "../services/opreations/authAPI"

const VerfiyEmail = () => {

    const [otp, setOtp] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, signupData} = useSelector( (state) => state.auth);

    useEffect(() => {
        // Only allow access of this route when user has filled the signup form
        if (!signupData) {
          navigate("/signup");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnSubmit = (event) => {
        event.preventDefault();

        console.log(signupData);

        const { 
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            } = signupData;
        dispatch( signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate));
    }

    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            {
                loading ? 
                (
                    <div>
                        Laoding...
                    </div>
                ) : 
                (
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-black font-semibold text-[1.875rem] leading-[2.375rem]">
                            Verify Email
                        </h1>
                        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-300">
                            Verfication code has been send to email. Enter the code below
                        </p>
                        <form onSubmit={handleOnSubmit}>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => <input {...props} 
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                              
                              className="w-[48px] lg:w-[60px] border-0 bg-pure-greys-25 rounded-[0.5rem] text-black aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"/>}

                              containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                              }}
                            />
                            <button type="submit"
                               className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                            >
                                Verify Email
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-between mb-0">
                            <div>
                                <Link to="/login">
                                    <p className="text-blue-200 flex items-center gap-x-2">Back to Login</p>
                                </Link>
                            </div>

                            {/* <button
                                className="flex items-center text-blue-100 gap-x-2 mt-0"
                                onClick={() => dispatch(sendotp(signupData.email))}
                                >
                                Resend it
                            </button> */}
                        </div>
                    </div>
                )
            }
        </div>
    )


}

export default VerfiyEmail