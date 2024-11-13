import React, { useState } from 'react'
import Header from '../Dashboard/Header'
import Sidebar from '../Dashboard/Sidebar'
import ReportList from './ReportList'

const Reports = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <ReportList />
        </div>
    )
}

export default Reports