import React from "react";
import CTAButton from "./Button"
import { TypeAnimation } from "react-type-animation";

const CodeBlock = ({heading, subheading, ctabutton1, ctabutton2, codeblock,position}) => {
    return(
        <div className={`flex flex-col ${position} md:flex-wrap  justify-between md:p-10 md:pt-0 mb-0`}>

           <div className="w-full md:w-2/4">

              <div className="text-4xl md:text-4xl  m-5 mt-10 md:mt-20 mb-0 md:ml-0 font-bold text-wrap relative md:h-1/8  w-11/12  ">
                {heading}
              </div>

              <div className="m-5 md:m-10 mt-2 md:mt-2 text-richblack-700 md:ml-0 text-wrap relative md:h-1/6  md:mb-0 w-10/12">
                {subheading}
              </div>

              <div className="relative md:m-10 md:mt-5 flex flex-col md:flex-row gap-2 md:gap-7 font-bold md:ml-0">
                <CTAButton linkTo={ctabutton1.linkTo} active={ctabutton1.active}>
                    {ctabutton1.text}
                </CTAButton>

                <CTAButton linkTo={ctabutton2.linkTo} active={ctabutton2.active}>
                   {ctabutton2.text}
                </CTAButton>
              </div>

           </div>

           <div className="bg-richblue-900 relative flex flex-row  text-10[px] md:w-[35%] relative mt-5  h-fit md:m-20 shadow-lg p-6 rounded-lg shadow-richblack-400" >

              <div className='relative  text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold  '>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
              </div>

              <div className={`text-yellow-200 relative w-[90%] flex flex-col gap-2 font-bold font-mono pr-2 `}>
                <TypeAnimation 
                   sequence={[codeblock, 5000, ""]}
                   repeat = {Infinity}
                   omitDeletionAnimation={true}

                   style={
                    {
                        whiteSpace : "pre-line",
                        display : "block"
                    }
                   }
                />
              </div>
           </div>

        </div>
    )
}

export default CodeBlock