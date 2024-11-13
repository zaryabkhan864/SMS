import React, { useState } from 'react'
import Header from '../Dashboard/Header'
import GradeList from './GradeList'
import Sidebar from '../Dashboard/Sidebar'

const Grade = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <GradeList />
        </div>
    )
}

export default Grade