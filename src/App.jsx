import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/comman/Navbar";
import VerfiyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import MyProfile from "./components/cors/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard"
import { useSelector } from "react-redux";
import EnrolledCourses from "./components/cors/Dashboard/EnrolledCourses";
import Cart from "./components/cors/Dashboard/Cart";
import Settings from "./components/cors/Dashboard/Settings";
import AddCourses from "./components/cors/Dashboard/AddCourse";
import MyCourses from "./components/cors/Dashboard/MyCourses/MyCourses";
import EditCourse from "./components/cors/Dashboard/EditCourse";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import VideoDetails from "./components/cors/ViewCourse/VideoDetails";
import ViewCourse from "./pages/ViewCourse";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AIchat from "./components/cors/Dashboard/AIchat";

function App() {

  const {user} = useSelector( (state) => state.profile);

  return (
    <div className="min-h-screen flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={ <Signup/>}/>
        <Route path="/verify-email" element= {<VerfiyEmail/>}/>
        <Route path="/forgot-password" element= {<ForgotPassword/>}/>
        <Route path="/update-password/:id" element= {<UpdatePassword/>}/>
        <Route path="/courses" element= {<Courses/>}/>
        <Route path="/course/:courseId" element={<CourseDetails/>} />

        <Route element = {
          <Dashboard/>
        } 
        >
          <Route path = "/dashboard/my-profile" element={<MyProfile/>} />
          {
              user?.accountType === "Student" && (
                <>
                <Route path="/dashboard/cart" element={<Cart/>} />
                <Route path = "/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
                <Route path="/dashboard/chat" element={<AIchat/>} />
                </>
              )
          }

          {
              user?.accountType === "Instructor" && (
                <>
                <Route path="/dashboard/add-course" element={<AddCourses/>} />
                <Route path="/dashboard/my-courses" element={<MyCourses/>} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>} />
                </>
              )
          }
          <Route path = "/dashboard/setting" element={<Settings/>} /> 
        </Route>

        <Route
          element={
            
              <ViewCourse />
            
          }
        >
          {user?.accountType === "Student" && (
            <>
              <Route
                path="/dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subsectionId"
                element={<VideoDetails/>}
              />
            </>
          )}
        </Route>
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/contact" element={<ContactUs/>} />
      </Routes>
    </div>
  );
}

export default App;
