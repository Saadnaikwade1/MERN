import { useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from "./UserContext"
import { useState } from 'react'
import axios from 'axios'
function Addtask() {
    let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    if(obj.state.token=="")
    {
      navigate("/")
    }

  },[])
  let [emp,setEmp]=useState([])
  let [msg,setMsg]=useState("")
  let [data,setData]=useState({
    "title":"",
    "desc":"",
    "dept":"",
    "eid":""
  })
  let fun=(e)=>{
    let {name,value}=e.target
    setData({...data,[name]:value})
  }
  let addtask=()=>{
    axios.post(`http://localhost:5000/addtask`,data).then((res)=>{
      setMsg(res.data.msg)
      setData({"title":"","desc":"","dept":"","eid":""})

    })

  }
  let getemp=(e)=>{
    setData({...data,"dept":e.target.value,"eid":""})
    axios.post(`http://localhost:5000/getemp/${e.target.value}`).then((res)=>{
      setEmp(res.data)
    })

  }
    return (
       <div className="h-[90vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-fit max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          
          Add task
        </h2>

        {msg && (
          <p className="text-red-500 text-center mb-4 font-semibold">{msg}</p>
        )}

        <div className="space-y-4 form">
          <input
            type="text"
            name="title"
            onChange={fun}
            placeholder="Enter title"
            value={data.title}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="text"
            name="desc"
            onChange={fun}
            placeholder="Enter description"
            value={data.desc}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none 
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
    {/* selecting dept */}
      <select
        value={data.dept}
        name="dept"
        onChange={getemp}
        className="
          w-full px-4 py-3 border rounded-xl text-gray-700 bg-white
          border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      >
      <option value="" disabled  className="text-gray-500 bg-gray-100">
        ---Select---
      </option>
      <option value="IT" className="text-gray-700 bg-white">IT</option>
      <option value="HR" className="text-gray-700 bg-white">HR</option>
      <option value="AC" className="text-gray-700 bg-white">Ac</option>
      <option value="ST" className="text-gray-700 bg-white">Testing</option>
    </select>


    {/* this is select based on dept */}
          <select
        value={data.eid}
        name="eid"
        onChange={fun}
        className="
          w-full px-4 py-3 border rounded-xl text-gray-700 bg-white
          border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      >
      <option value="" disabled  className="text-gray-500 bg-gray-100">
        ---Select---
      </option>
      {emp.map((obj)=><option value={obj._id}  className="text-gray-700 bg-white">{obj.name}-{obj._id}</option>
      )}
      </select>


        </div>
        <button
          onClick={addtask}
          className="w-auto px-4 mt-6 bg-blue-600 text-white py-3 rounded-xl 
        font-semibold hover:bg-blue-700 transition duration-300"
        >
          AddTask
        </button>
      </div>
    </div>
    )
}

export default Addtask
