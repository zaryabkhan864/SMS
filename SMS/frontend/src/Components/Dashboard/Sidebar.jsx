import React, { useEffect, useState } from 'react'
import {
    BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
    from 'react-icons/bs'
import { PiStudentFill } from "react-icons/pi";
import { LuSchool } from "react-icons/lu";
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie';


function Sidebar({ openSidebarToggle, OpenSidebar }) {

    // get the userRole from cookie
    const userRole = Cookies.get("userRole");
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <LuSchool className='icon_header text-white h1' /><span className="text-white ">SMS</span>
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <NavLink to="/dashboard">
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="/students">
                        <PiStudentFill className='icon' /> Students
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="/teachers">
                        <BsFillGrid3X3GapFill className='icon' /> Teachers
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="/quiz">
                        <BsPeopleFill className='icon' /> Quiz
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="">
                        <BsPeopleFill className='icon' /> Exam
                    </NavLink>
                </li>
                {userRole === "admin" && (
                    <li className='sidebar-list-item'>
                        <NavLink to="/courses">
                            <BsPeopleFill className='icon' /> Courses
                        </NavLink>
                    </li>
                )}
                {userRole === "admin" && (
                    <li className='sidebar-list-item'>
                        <NavLink to="/grades">
                            <BsPeopleFill className='icon' /> Grade
                        </NavLink>
                    </li>
                )}
                {userRole === "admin" && (
                    <li className='sidebar-list-item'>
                        <NavLink to="/admin/new_user">
                            <BsPeopleFill className='icon' /> New User
                        </NavLink>
                    </li>
                )}

                <li className='sidebar-list-item'>
                    <NavLink to="/reports">
                        <BsPeopleFill className='icon' /> Reports
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsFillGearFill className='icon' /> Setting
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar