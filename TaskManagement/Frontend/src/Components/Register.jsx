import React, { useState } from "react";
import axios from "axios";

function Register() {
  let [data, setData] = useState({
    _id: "",
    name: "",
    pwd: "",
    dept: "",
  });
  let [msg, setMsg] = useState("");
  let fun = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  let reg = () => {
    axios.post("http://localhost:5000/add", data).then((res) => {
      setMsg(res.data.msg);
      if (res.data.msg == "Account created") {
        setData({
          _id: "",
          name: "",
          pwd: "",
          dept: "",
        });
      }
    });
  };
  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-fit max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        {  msg=="Account created"?<p className="text-green-500 text-center mb-4 font-semibold">{msg}</p>
        :<p className="text-red-500 text-center mb-4 font-semibold">{msg}</p>
          
        }

        <div className="space-y-4">
          <input
            type="email"
            name="_id"
            onChange={fun}
            placeholder="Enter your Email"
            value={data._id}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none 
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="text"
            name="pwd"
            onChange={fun}
            placeholder="Enter your password"
            value={data.pwd}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none 
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            name="name"
            onChange={fun}
            placeholder="Enter your Name"
            value={data.name}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none 
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
  <select
  value={data.dept}
  name="dept"
  onChange={fun}
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


        </div>

        <button
          onClick={reg}
          className="w-auto px-4 mt-6 bg-blue-600 text-white py-3 rounded-xl 
        font-semibold hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
