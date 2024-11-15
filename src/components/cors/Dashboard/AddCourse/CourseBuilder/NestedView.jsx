import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { VscAdd, VscEdit, VscTrash, VscTriangleDown } from 'react-icons/vsc'
import { useState } from 'react'
import ConfirmationModal from "../../../../comman/ConfirmationModal"
import SubSectionModal from './SubsectionModal'
import { deleteSection, deleteSubSection } from "../../../../../services/opreations/courseDetailsAPI"
import { setCourse } from '../../../../../slices/courseSlice'
import { RxDropdownMenu } from 'react-icons/rx'
import { setLoading } from '../../../../../slices/profileSlice'

const NestedView = ({ handelChangeEditSectionName }) => {
  const { token } = useSelector(state => state.auth)
  const { course } = useSelector(state => state.course)
  const dispatch = useDispatch()

  const [viewSubSection, setviewSubSection] = useState(null)
  const [addSubSection, setAddSubSection] = useState(null)
  const [editSubsection, setEditSubsection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handeldeleteSection = async (sectionId) => {
    const result = await deleteSection({ sectionId, courseId: course._id }, token)
    if (result) {
      dispatch(setCourse(result))
      setConfirmationModal(null)
    }
  }

  const handeldeleteSubSection = async (subSectionId, sectionId) => {
    setLoading(true)
    const result = await deleteSubSection({ subSectionId, courseId: course._id, sectionId }, token)
    if (result) {
      dispatch(setCourse(result))
      setConfirmationModal(null)
    }
    setLoading(false)
  }

  return (
    <div className="p-6 bg-white border rounded-md shadow-md my-5">
      <div>
        {course.courseContent.map((section) => (
          <details key={section._id} className="mt-4 border-b">
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu size={25} className="text-richblack-500" />
                <p className="font-semibold text-richblack-500">{section.sectionName}</p>
              </div>
              <div className="flex items-center gap-x-3">
                <button>
                  <VscEdit
                    className="text-lg text-richblack-500 hover:text-richblack-700"
                    onClick={() => handelChangeEditSectionName(section._id, section.sectionName)}
                  />
                </button>
                <button>
                  <VscTrash
                    className="text-lg text-richblack-500 hover:text-[#ff0000]"
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this Section?",
                        text2: "All lectures in this section will be deleted.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handeldeleteSection(section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  />
                </button>
                <span className="font-medium text-richblack-500">|</span>
                <VscTriangleDown className="text-lg text-richblack-500" />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {section.subSection.map((subSection) => (
                <div
                  onClick={(e) => {
                    if (e.currentTarget !== e.target) return
                    setviewSubSection(subSection)
                  }}
                  key={subSection._id}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-richblack-600 py-2 z-0"
                >
                  <div className="flex items-center gap-x-3">
                    <RxDropdownMenu size={25} className="text-richblack-500" />
                    <p className="font-semibold text-richblack-500">{subSection.title}</p>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <button>
                      <VscEdit
                        className="text-lg text-richblack-500 z-50 hover:text-richblack-700"
                        onClick={() => setEditSubsection(subSection)}
                      />
                    </button>
                    <button>
                      <VscTrash
                        className="text-lg text-red-500 z-50  text-richblack-500 hover:text-[#ff0000]"
                        size={21}
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete this Sub-Section?",
                            text2: "Selected lecture will be deleted.",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handeldeleteSubSection(subSection._id, section._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                      />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setAddSubSection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50 font-bold hover:text-yellow-200"
              >
                <VscAdd className="text-lg text-yellow-50" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
      {addSubSection && <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />}
      {editSubsection && <SubSectionModal modalData={editSubsection} setModalData={setEditSubsection} edit={true} />}
      {viewSubSection && <SubSectionModal modalData={viewSubSection} setModalData={setviewSubSection} view={true} />}
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} setConfirmationModal={setConfirmationModal} />
      )}
    </div>
  )
}

export default NestedView
