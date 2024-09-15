import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollTopTOp() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scroll(0, 0)
    }, [pathname])

    return <></>
}

export default ScrollTopTOp
