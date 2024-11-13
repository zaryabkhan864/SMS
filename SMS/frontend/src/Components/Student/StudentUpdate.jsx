import React, { useState } from 'react'
import Header from '../Dashboard/Header'

import Sidebar from '../Dashboard/Sidebar'

import Student_Update from './Student_Update'

const StudentUpdate = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Student_Update />
        </div>
    )
}

export default StudentUpdate