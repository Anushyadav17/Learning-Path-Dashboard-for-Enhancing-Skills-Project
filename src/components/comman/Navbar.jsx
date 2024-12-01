import React, { useState } from "react";
import logoImg from "../../assets/Images/7799135.png";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../cors/Auth/ProfileDropDown";
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="relative flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblue-800 text-richblack-5 z-50">
            <div className="flex w-11/12 max-w-maxContent items-center justify-between">
                <Link to="/" className="flex items-center gap-2" onClick={handleLinkClick}>
                    <img src={logoImg} alt="logo img" loading="lazy" className="h-12" />
                    <p className="font-bold font-sans-serif text-sm">Education<br /><span>Timeline</span></p>
                </Link>

                {/* Nav links */}
                <nav className="hidden md:block">
                    <ul className="flex gap-x-6">
                        {NavbarLinks.map((link, index) => (
                            <li key={index} className={`hover:scale-95 transition-all duration-200 ${matchRoute(link.path) ? "text-yellow-50" : "text-white"}`}>
                                <Link to={link?.path} onClick={handleLinkClick}>
                                    <p>{link.title}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Menu icon for mobile */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <AiOutlineClose className="text-2xl text-white" /> : <AiOutlineMenu className="text-2xl text-white" />}
                    </button>
                </div>

                {/* Login / Signup / Dashboard */}
                <div className="hidden items-center gap-x-4 md:flex">
                    {token === null && (
                        <>
                            <Link to="/login" onClick={handleLinkClick}>
                                <button className="rounded-[8px] border border-richblack-700 bg-richblue-400 px-[12px] py-[6px] text-white hover:scale-95 transition-all duration-200">
                                    Log in
                                </button>
                            </Link>
                            <Link to="/signup" onClick={handleLinkClick}>
                                <button className="rounded-[8px] border border-richblack-700 bg-richblue-400 px-[12px] py-[6px] text-white hover:scale-95 transition-all duration-200">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                    {user?.accountType === "Student" && (
                        <Link to="/dashboard/cart" onClick={handleLinkClick}>
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                        </Link>
                    )}
                    {token !== null && <ProfileDropDown onLinkClick={handleLinkClick} />}
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <nav className="absolute top-full left-0 w-full bg-richblue-800 z-50 md:hidden">
                    <ul className="flex flex-col items-center gap-y-4 py-4">
                        {NavbarLinks.map((link, index) => (
                            <li key={index} className={`hover:scale-95 transition-all duration-200 ${matchRoute(link.path) ? "text-yellow-50" : "text-white"}`}>
                                <Link to={link?.path} onClick={handleLinkClick}>
                                    <p>{link.title}</p>
                                </Link>
                            </li>
                        ))}
                        {token === null && (
                            <>
                                <Link to="/login" onClick={handleLinkClick}>
                                    <button className="rounded-[8px] border border-richblack-700 bg-richblue-400 px-[12px] py-[6px] text-white hover:scale-95 transition-all duration-200">
                                        Log in
                                    </button>
                                </Link>
                                <Link to="/signup" onClick={handleLinkClick}>
                                    <button className="rounded-[8px] border border-richblack-700 bg-richblue-400 px-[12px] py-[6px] text-white hover:scale-95 transition-all duration-200">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                        {user?.accountType === "Student" && (
                            <Link to="/dashboard/cart" onClick={handleLinkClick}>
                                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                            </Link>
                        )}
                        {token !== null && <ProfileDropDown onLinkClick={handleLinkClick} />}
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Navbar;
