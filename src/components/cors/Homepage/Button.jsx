// import React from "react";
// import { Link } from "react-router-dom";

// const Button = ({children, linkTo, active}) => {
//     return(
//         <Link to={linkTo}>

//             <div className={`text-center text-[13px] px-6 py-3 rounded-md relative
//                           ${active ? "bg-yellow-50 text-black " : "bg-richblack-800 text-white "} 
//                            hover:scale-95 transition-all duration-200
//                            shadow p-6 rounded shadow-richblack-400`}>
//                 {children}
//             </div>

//         </Link>
//     )
// }

// export default Button;

import React from "react";
import { Link } from "react-router-dom";

const Button = ({children, linkTo, active}) => {
    return (
        <Link to={linkTo}>
            <div 
                className={`text-center text-[14px] md:text-[16px] font-inter font-medium px-6 py-3 md:px-8 md:py-4 rounded-lg
                ${active 
                    ? "bg-gradient-to-r from-yellow-50 to-caribbeangreen-200 text-black" 
                    : "bg-gradient-to-r from-richblack-700 to-richblue-800 text-white"}
                hover:scale-105 transition-transform duration-300 ease-in-out
                shadow-lg hover:shadow-2xl transform`}>
                {children}
            </div>
        </Link>
    );
};

export default Button;
