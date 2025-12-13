import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

function ForgotPassword() {
     let [f,setF]=useState(0)
    let [msg,setMsg]=useState("")
    let navigate=useNavigate()
    let [data,setData]=useState({"_id":"","pwd":"","otp":""})
       let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    let sendOtp=()=>{
      axios.get(`http://localhost:5000/sendopt/${data._id}`).then((res)=>{
        setMsg(res.data.msg)
        if (res.data.msg=="OTP sent"){

          setF(1)
        }
      })
    }
    let validateOtp=()=>{
      console.log(data);
      axios.get(`http://localhost:5000/votp/${data._id}/${data.otp}`).then((res)=>{
      console.log(res.data)
        if(res.data.msg=="OTP Verified"){
          setF(2)
          setMsg("")
        }else{
          setMsg(res.data.msg)
        }
      })
    }
    let updPass=()=>{
      axios.put(`http://localhost:5000/updpass/`,data).then((res)=>{
        if(res.data.msg=="Password Updated succesfully.")
        {
          navigate("/")
        }
        else{
          setMsg(res.data.msg)
        }
      })
    
    }
    return (
        <div className='h-[90vh] flex items-center justify-center bg-gray-100 px-4'>
            <div className='w-fit max-w-md bg-white shadow-xl rounded-2xl p-8'>
                <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
                    Reset password
                </h2>
                {msg && (
          <p className="text-red-500 text-center mb-4 font-semibold">{msg}</p>
        )}
        {f==0 &&
            <>
             <input
            type="email"
            name="_id"
            onChange={fun}
            placeholder="Enter your Email"
            value={data._id}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none 
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
           <button
          onClick={sendOtp}
          className="w-auto px-4 mt-6 bg-blue-600 text-white py-3 rounded-xl 
        font-semibold hover:bg-blue-700 transition duration-300"
        >
          Send OTP
        </button>
            </>
        }
        {f==1 &&
            <>
             <input
            type="text"
            name="otp"
            onChange={fun}
            placeholder="Enter OTP"
            value={data.otp}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none 
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
           <button
          onClick={validateOtp}
          className="w-auto px-4 mt-6 bg-blue-600 text-white py-3 rounded-xl 
        font-semibold hover:bg-blue-700 transition duration-300"
        >
          Validate OTP
        </button>
            </>
        }
        {f==2 &&
            <>
             <input
            type="text"
            name="pwd"
            onChange={fun}
            placeholder="Enter New password"
            value={data.pwd}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none 
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
           <button
          onClick={updPass}
          className="w-auto px-4 mt-6 bg-blue-600 text-white py-3 rounded-xl 
        font-semibold hover:bg-blue-700 transition duration-300"
        >
          Update Password
        </button>
            </>
        }
            </div>
        </div>
    )
}

export default ForgotPassword
