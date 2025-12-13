import React from 'react'
import { useContext } from 'react'
import Ct from './UserContext'
import { useNavigate } from 'react-router-dom'
function AdminHome() {
    let obj=useContext(Ct)
  let navigate=useNavigate()
  React.useEffect(()=>{
    if(obj.state.token=="")
    {
      navigate("/")
    }

  },[])
    return (
        <div>AdminHome</div>
    )
}

export default AdminHome
