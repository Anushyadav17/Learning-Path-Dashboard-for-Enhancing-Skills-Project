import signupImg from "../assets/Images/signup.webp"
import Template from "../components/cors/Auth/Template"

function Signup() {
  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signupImg}
      formtype="signup"
    />
  )
}

export default Signup