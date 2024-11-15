import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../comman/IconBtn';
import {formattedDate} from '../../../utils/formattedDate';
import { RiEditBoxLine } from "react-icons/ri"

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="mb-4 text-3xl font-medium text-black">
        My Profile
      </h1>
      
      <div className="flex flex-col md:flex-row items-center justify-between rounded-md border-[1px] border-pure-greys-50 bg-white p-6 shadow-md mb-5 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt="profile"
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-black">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-500">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/setting");
          }}
        />
      </div>

      <div className="my-8 flex flex-col gap-y-10 rounded-md border-[1px] border-pure-greys-50 bg-white p-6 shadow-md p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-black">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/setting");
            }}
          />
        </div>
        <p className={`${user?.additionalDetails?.about ? "text-richblack-500" : "text-richblack-300"} text-sm font-medium`}>
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px]  bg-white p-8 px-12 rounded-md border-[1px] border-pure-greys-50 bg-white p-6 shadow-md">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-black">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/setting")
            }}
          >
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-500">First Name</p>
              <p className="text-sm font-medium text-black">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-500">Email</p>
              <p className="text-sm font-medium text-black">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-500">Gender</p>
              <p className="text-sm font-medium text-black">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-500">Last Name</p>
              <p className="text-sm font-medium text-black">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-500">Phone Number</p>
              <p className="text-sm font-medium text-black">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-500">Date Of Birth</p>
              <p className="text-sm font-medium text-black">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MyProfile;
