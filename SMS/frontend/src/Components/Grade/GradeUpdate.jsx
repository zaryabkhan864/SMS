import React, { useState } from 'react'
import Header from '../Dashboard/Header'

import Sidebar from '../Dashboard/Sidebar'

import Grade_Update from './Grade_Update'

const GradeUpdate = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Grade_Update />
        </div>
    )
}

export default GradeUpdate