import React, { useState } from 'react'
import Header from './Header'
import Home from './Home'
import Sidebar from './Sidebar'

const Dashboard = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
        return (
            <div className='grid-container'>
                <Header OpenSidebar={OpenSidebar} />
                <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
                <Home />
            </div>
        )
    }

    export default Dashboard