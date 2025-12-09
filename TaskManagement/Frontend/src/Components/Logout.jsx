import React, { useContext, useEffect } from 'react'
import UserContext from './UserContext'
import { useNavigate } from 'react-router-dom'

function Logout() {
    let obj=useContext(UserContext)
    let navigate=useNavigate()
    useEffect(()=>{
        obj.stateUpd({"token":"","role":"","name":""})
        navigate("/")
    },[])
    return (
        <div>Logout</div>
    )
}

export default Logout
