import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import IconBtn from "../../../../comman/IconBtn"
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/opreations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import Upload from "../Upload"

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    
    if (editCourse) {
      setValue("courseName", course.courseName)
      setValue("courseDescription", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      //currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail
    )
  }

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        console.log(course);
        formData.append("courseId", course._id)
        if (currentValues.courseName !== course.courseName) {
          formData.append("courseName", data.courseName)
        }
        if (currentValues.courseDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        // if (currentValues.courseCategory._id !== course.category._id) {
        //   formData.append("category", data.courseCategory)
        // }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseName)
    formData.append("courseDescription", data.courseDescription)
    formData.append("price", data.coursePrice)
    formData.append("category", data.courseCategory)  
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result = await addCourseDetails(formData, token);
    
    if (result) {
      console.log("insised resulr")
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-pure-greys-50 bg-white p-6 shadow-md mb-5 p-8 px-12">
      <h2 className="text-lg font-semibold text-black">Course Information</h2>
      {/* Course Name Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor='courseName' className="text-richblack-700">
          Course Name<span>*</span>
        </label>
        <input 
          type="text"
          placeholder='Enter Course Name'
          className="w-full rounded-[0.5rem] bg-pure-greys-25 p-[12px] text-black"
          {...register("courseName", { required: true })}
        />
        {errors.courseName && (
          <span className="-mt-1 text-xs tracking-wide text-pink-200">
            Course name is required
          </span>
        )}
      </div>
      {/* Course Description Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor='courseDescription' className="text-richblack-700">
          Course Description<span>*</span>
        </label>
        <textarea 
          type="text"
          placeholder='Enter Course Description'
          className="w-full rounded-[0.5rem] bg-pure-greys-25 p-[12px] text-black"
          {...register("courseDescription", { required: true })}
        />
        {errors.courseDescription && (
          <span className="-mt-1 text-xs tracking-wide text-pink-200">
            Course description is required
          </span>
        )}
      </div>
      {/* Course Price Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor='coursePrice' className="text-richblack-700">
          Course Price<span>*</span>
        </label>
        <input 
          type="text"
          placeholder='Enter Course Price'
          className="w-full rounded-[0.5rem] bg-pure-greys-25 p-[12px] text-black"
          {...register("coursePrice", { required: true, valueAsNumber: true })}
        />
        {errors.coursePrice && (
          <span className="-mt-1 text-xs tracking-wide text-pink-200">
            Course price is required
          </span>
        )}
      </div>
      {/* Course Category */}
      <div className="flex flex-col gap-2">
        <label className="text-richblack-700" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="w-full rounded-[0.5rem] bg-pure-greys-25 p-[12px] text-black"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="-mt-1 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>
      {/* Thumbnail Field */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      <div className='flex justify-end gap-x-2'>
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            className='text-[10px] md:text-sm p-2 px-1 font-semibold rounded-md flex items-center gap-x-2 bg-richblack-300'
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn type={"submit"} text={!editCourse ? "Next" : "Save Changes"} />
      </div>
    </form>
  )
}

export default CourseInformationForm;
