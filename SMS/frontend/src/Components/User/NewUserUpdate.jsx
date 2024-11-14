import React, { useState } from 'react'
import Header from '../Dashboard/Header'
import Sidebar from '../Dashboard/Sidebar'
import UpdateNewUser from './NewUser_Update'

const NewUserUpdate = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <UpdateNewUser />
        </div>
    )
}

export default NewUserUpdate