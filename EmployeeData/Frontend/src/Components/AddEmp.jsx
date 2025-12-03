import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import '../App.css'

function AddEmp() {
  let [data, setData] = useState({
    _id: "",
    name: "",
    email: "",
    phno: "",
    gen: "",
    sal: "",
    dept: "",
  });

  let [msg, setMsg] = useState("");
  const navigate=useNavigate()
  let fun = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  let add = () => {
    axios.post("http://localhost:5000/add", data).then((res) => {
      setMsg(res.data.msg);
      setData({
        _id: "",
        name: "",
        email: "",
        phno: "",
        gen: "",
        sal: "",
        dept: "",
      });
    });
    navigate("/")
  };
  return (
    <div className="form">
        <h1>{msg}</h1>
      <input
        type="text"
        name="_id"
        placeholder="Enter EmployeeId"
        onChange={fun}
        value={data._id}
      />
      <input
        type="text"
        name="name"
        onChange={fun}
        placeholder="Enter your name"
        value={data.name}
      />
      <input
        type="email"
        name="email"
        onChange={fun}
        placeholder="Enter your email"
        value={data.email}
      />
      <input
        type="tel"
        name="phno"
        onChange={fun}
        placeholder="Enter your phno"
        value={data.phno}
      />
      <div>
        <input type="radio" name="gen" value="male" onChange={fun} />
        Male
        <input type="radio" name="gen" value="female" onChange={fun} />
        Female
      </div>
      <input
        type="text"
        name="sal"
        onChange={fun}
        placeholder="Enter salary"
        value={data.sal}
      />
      <select name="dept" onChange={fun} >
        <option value="" disabled>----Select department---</option>
        <option value="hr">HR</option>
        <option value="qc">Quality check</option>
        <option value="qa">Qaulity Assurance</option>
        <option value="sd">Software developer</option>
        <option value="dv">Devops Engineer</option>
      </select>
      <button onClick={add}>AddData</button>
    </div>
  );
}

export default AddEmp;
