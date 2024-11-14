import React, { useState } from 'react'
import Header from '../Dashboard/Header'
import CourseList from './CourseList'
import Sidebar from '../Dashboard/Sidebar'

const Course = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <CourseList />
        </div>
    )
}

export default Course