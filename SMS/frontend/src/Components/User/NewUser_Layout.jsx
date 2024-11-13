import React, { useState } from 'react'
import Header from '../Dashboard/Header'

import Sidebar from '../Dashboard/Sidebar'
import NewUser from './NewUser'


const NewUser_Layout = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
   
            <NewUser />
        </div>
    )
}

export default NewUser_Layout