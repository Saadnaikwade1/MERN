import React, { useState } from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Nav from './Components/Nav'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import AdminHome from './Components/AdminHome'
import Addtask from './Components/Addtask'
import Logout from './Components/Logout'
import "./App.css"
import UserContext from './Components/UserContext'
import ForgotPassword from './Components/ForgotPassword'

function App() {
    let [state,setState]=useState({"token":"","name":"","role":""})
    let stateUpd=(sobj)=>{
        setState({...state,...sobj})
    }
    let obj={"state":state,"stateUpd":stateUpd}
    return (
        <BrowserRouter>
        <UserContext.Provider value={obj}>
        <Nav/>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/reg' element={<Register/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/adminhome' element={<AdminHome/>}/>
            <Route path='/addtask' element={<Addtask/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/fpwd' element={<ForgotPassword/>}/>
        
        </Routes>
        </UserContext.Provider>
        </BrowserRouter>
    )
}

export default App
