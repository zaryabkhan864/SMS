import React, { useState } from 'react'
import Header from '../Dashboard/Header'

import Sidebar from '../Dashboard/Sidebar'
import Teacher_Add from './Teacher_Add'

const TeacherAdd = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Teacher_Add />
        </div>
    )
}

export default TeacherAdd