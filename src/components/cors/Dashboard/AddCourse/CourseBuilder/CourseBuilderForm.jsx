import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import NestedView from "./NestedView";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from  "../../../../../services/opreations/courseDetailsAPI"

const CourseBuilderForm = () => {
  const { token } = useSelector((state) => state.auth);
  const [editSectionName, setEditSectionName] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);

  const gonext = () => {
    if (course.courseContent.length > 0) {
      if (
        course.courseContent.some((section) => section.subSection.length > 0)
      ) {
        dispatch(setStep(3));
      } else {
        toast.error("Please add atleast one lesson to esch section");
      }
    } else {
      toast.error("Please add atleast one section to continue");
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let result=null;
    setLoading(true);
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
          sectionId: editSectionName,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    }
    if (result) {
      dispatch(setCourse(result));
      setValue("sectionName", "");
      setEditSectionName(false);
    }
    setLoading(false);
  };


  const handelChangeEditSectionName = (sectionId,sectionName) => {
    if (editSectionName===sectionId) {
      setEditSectionName(false);
      setValue("sectionName", "");
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-pure-greys-50 bg-white p-6 shadow-md mb-5 p-8 px-12">
      <p className="text-2xl font-semibold text-black">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="text-sm text-richblack-500" htmlFor="sectionName">
          Section Name<sup className="text-pink-200">*</sup>
        </label>
        <input
          id="sectionName"
          placeholder="Add a section to build your course"
          name="sectionName"
          className="w-full rounded-[0.5rem] bg-pure-greys-25 p-[12px] text-black"
          {...register("sectionName", { required: true })}
        />
        {errors.sectionName && (
          <p className="ml-2 text-xs tracking-wide text-pink-200">This field is required</p>
        )}
        <div className="flex items-end gap-x-4">
          <button
            type="submit"
            className="flex items-center border border-yellow-50 bg-transparent cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold bg-yellow-50 undefined"
          >
            <span className="text-black">
              {editSectionName ? "Edit Section Name" : "Create Section"}
            </span>
            <AiOutlinePlusCircle size={20} className="text-black" />
          </button>
          {editSectionName && (
            <button
              onClick={() => {
                setEditSectionName(false);
                setValue("sectionName", "");
              }}
              type="button"
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.courseContent?.length > 0 && <NestedView handelChangeEditSectionName={handelChangeEditSectionName} />}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={() => {  
            dispatch(setEditCourse(true));
            dispatch(setStep(1));
          }}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >
          Back
        </button>
        <button
          onClick={gonext}
          className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
        >
          <span className="false">Next</span>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CourseBuilderForm;