import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from './UserContext'

function Home() {
let obj=useContext(UserContext)
  let navigate=useNavigate()
  useEffect(()=>{
    if(obj.state.token=="")
    {
      navigate("/")
    }

  },[])
    return (
        <div>Home</div>
    )
}

export default Home
