import React, { useState } from 'react'
import Header from '../Dashboard/Header'
import StudentList from './StudentList'
import Sidebar from '../Dashboard/Sidebar'

const Student = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <StudentList />
        </div>
    )
}

export default Student