import './Courses.css';
import Filter from "../components/cors/Courses/Filter";
import { useState, useEffect } from 'react';
import Cards from '../components/cors/Courses/Cards';
import { fetchCourseCategories, getAllCourses } from '../services/opreations/courseDetailsAPI';

export const apiUrl = "https://codehelp-apis.vercel.app/api/get-top-courses";

function Courses() {
   const [course, setCourses] = useState([]);
   const [loading, setLoading] = useState(true);
   const [filterData, setFilterData] = useState([]);
   const [Category, setCategory] = useState('');

   async function fetchData() {
      setLoading(true);
      try {
         const response = await getAllCourses();
         const cat = await fetchCourseCategories();
         setFilterData(cat);
         setCategory(cat[0]?.name || '');
         setCourses(response); 
      } catch (error) {
         console.log("Error from App.js");
         console.log(error);
      }
      setLoading(false);
   }

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className="courses-page">
         <header className="page-header">
            <h1>Explore Our Courses</h1>
            <p>Find the best courses for your learning journey, categorized by topics and skill levels.</p>
         </header>
         {/* <Filter filterData={filterData} key={filterData?.id} setCategory={setCategory} Category={Category} /> */}
         <div>
            {loading ? (
               <div className="loading-div">Loading...</div>
            ) : (
               <Cards courses={course} key={course.id} Category={Category} loading={loading} />
            )}
         </div>
      </div>
   );
}

export default Courses;
