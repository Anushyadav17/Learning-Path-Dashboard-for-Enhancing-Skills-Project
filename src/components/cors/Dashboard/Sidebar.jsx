import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from './SidebarLink';
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../comman/ConfirmationModal";
import { VscSignOut, VscSettingsGear } from "react-icons/vsc";
import { logout } from "../../../services/opreations/authAPI";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (authLoading || profileLoading) {
    return (
      <div className="mt-10 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className={`flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-richblue-700 bg-richblue-800 py-10 mb-0 md:block`}>
      <div className="flex flex-col">
        {sidebarLinks.map((link) => {
          if (link.type && user.accountType !== link.type) return null;
          return (
            <SidebarLink key={link.id} link={link} iconName={link.icon} />
          );
        })}
      </div>

      <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

      <div className="flex flex-col">
        <SidebarLink
          link={{ name: "Settings", path: "/dashboard/setting" }}
          iconName="VscSettingsGear"
        />
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="px-8 py-2 text-sm font-medium text-richblack-300"
        >
          <div className="flex items-center gap-x-2">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

      {/* Close Button for Small Screens */}
      {/* <button
        className="md:hidden p-4 absolute top-0 right-0 text-yellow-50"
        onClick={onClose}
      >
        Close
      </button> */}
    </div>
  );
};

export default Sidebar;
