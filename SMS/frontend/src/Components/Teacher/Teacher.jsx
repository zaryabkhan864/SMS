import React, { useState } from 'react'
import Header from '../Dashboard/Header'
import TeacherList from './TeacherList'
import Sidebar from '../Dashboard/Sidebar'

const Teacher = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <TeacherList />
        </div>
    )
}

export default Teacher