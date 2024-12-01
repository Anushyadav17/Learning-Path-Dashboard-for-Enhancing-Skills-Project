import {toast} from "react-hot-toast";
import { endpoints, profileEndpoints } from "../apis";
import {setUser} from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { setToken, setLoading } from "../../slices/authSlice";

const {LOGIN_API, SEND_OTP, SIGNUP_API, RESETPASSTOKEN_API, RESETPASSWORD_API} = endpoints
const {GET_ENROLLED_COURSES} = profileEndpoints

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email, password,
            })

            console.log("logn response..", response);

            if (!response.data.success) {
                toast.error("Login Failed")
                throw new Error(response.data.message)
            }

            toast.success("Login Successfully")
            
            dispatch(setToken(response.data.token));
            
            const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            
            dispatch(setUser({ ...response.data.user, image: userImage }))

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))

            navigate("/dashboard/my-profile")


        } catch(error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        
        dispatch(setLoading(false))
        toast.dismiss(toastId);
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }

export function sendotp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SEND_OTP, {
                email,
            })


            if(!response.data.success) {
                toast.error(response.data.message);
                console.log(response.data.message);
                throw new Error(response.data.message);
            }

            toast.success("OTP send successfully");

            navigate("/verify-email");
        } catch(error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
        
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    } 
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        
        try { 
            console.log("from front..");
            console.log(accountType);
            console.log(firstName);
            console.log(lastName);
            console.log(email);
            console.log(password);
            console.log(    confirmPassword,);
            console.log(otp);
            console.log(navigate);
             const response = await apiConnector("POST", SIGNUP_API, 
                {
                    accountType,
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    otp,
                }
            );
        
            if(!response.data.success) {
                console.log(response.error.message)
                toast.error(response.error.message);
                throw new Error(response.data.message)
            }

            toast.success("Signup Successful")
            console.log(response.data.token);

            navigate("/login");


        }
        catch(error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
        
        dispatch(setLoading(false))

    }
}

export function getPasswordResetToken(email, setEmailSent) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");

        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
            })

            if(!response.data.success) {
                console.log(response.error.message)
                toast.error(response.error.message);
                throw new Error(response.data.message)
            }

            console.log(response);

            if (response.status === 200) {
                setEmailSent(true);
            }

            toast.success("Reset Password Mail sent successfully");
          
            console.log(response);

        }
        catch(error) {
            console.log(error)
            toast.error("You are not registered! Please signup first");
            //toast.error(error.response.data.message);
        }
        
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function resetPassword(password, confirmPassword, token, navigate) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});
  
        console.log("RESET Password RESPONSE ... ", response);
  
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Password has been reset successfully");
        navigate("/login");
        
      }
      catch(error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error(error.response.data.message);
      }
      dispatch(setLoading(false));
    }
  }

  export function aiChat(prompt) {
    return async () => {
        //const toastId = toast.loading("Generating AI response...");
        //dispatch(setLoading(true));

        try {
            // Call the backend API to classify the prompt
            const response = await apiConnector("POST", "/api/classify", { prompt });

            if (!response.data || !response.data.response) {
                toast.error("Failed to generate response");
                throw new Error("No response data received");
            }

            // Handle the AI-generated response
            const aiResponse = response?.data?.response;
            toast.success("AI response generated successfully");

            console.log("AI Response: ", aiResponse);
            // You can dispatch the response to store it in the state if needed
            // dispatch(setAIResponse(aiResponse)); // If you have a slice for storing AI responses
            return aiResponse;
            
        } catch (error) {
            console.error(error);
            //toast.error("Error generating AI response");
        } finally {
           // dispatch(setLoading(false));
            //toast.dismiss(toastId);
        }
    };
}

