import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";

function Login() {
  let [data, setData] = useState({
    _id: "",
    pwd: "",
  });
  let [msg, setMsg] = useState("");
  let navigate = useNavigate();
  let obj = useContext(UserContext);
  let fun = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  let login = () => {
    axios.post("http://localhost:5000/login", data).then((res) => {
      if (res.data.token != undefined) {
        obj.stateUpd(res.data);
        if (res.data.role == "emp") {
          navigate("/home");
        } else {
          navigate("/adminhome");
        }
      } else {
        setMsg(res.data.msg);
      }
    });
  };
  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-fit max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {msg && (
          <p className="text-red-500 text-center mb-4 font-semibold">{msg}</p>
        )}

        <div className="space-y-4 form">
          <input
            type="email"
            name="_id"
            onChange={fun}
            placeholder="Enter your Email"
            value={data._id}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
          <Link
            to="/fpwd"
            className="text-blue-500 hover:text-red-500 underline font-semibold"
          >
            Forgot Password
          </Link>
        </div>
        <button
          onClick={login}
          className="w-auto px-4 mt-6 bg-blue-600 text-white py-3 rounded-xl 
        font-semibold hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
