import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Nav from './Components/Nav'
import DisplayData from './Components/DisplayData'
import AddEmp from './Components/AddEmp'
import EditEmp from './Components/EditEmp'
import './App.css'
function App() {
  return (
    <BrowserRouter>
    <Nav/>
    <Routes>
     <Route path='/' element={<DisplayData/>}/>
     <Route path='/add' element={<AddEmp/>}/>
     <Route path="/edit/:id" element={<EditEmp />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
