import React, { useState } from 'react'
import Header from '../Dashboard/Header'

import Sidebar from '../Dashboard/Sidebar'
import Quiz_Add from './Quiz_Add'

const QuizAdd = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Quiz_Add />
        </div>
    )
}

export default QuizAdd