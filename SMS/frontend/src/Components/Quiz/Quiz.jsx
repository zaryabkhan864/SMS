import React, { useState } from 'react'
import Header from '../Dashboard/Header'
import QuizList from './QuizList'
import Sidebar from '../Dashboard/Sidebar'

const Quiz = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <QuizList />
        </div>
    )
}

export default Quiz