import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ct from "./UserContext";
import axios from "axios";
import Base_API from "../config/api";

function Addtask() {
  const obj = useContext(Ct);
  const navigate = useNavigate();

  useEffect(() => {
    if (obj.state.token === "") {
      navigate("/");
    }
  }, [obj.state.token, navigate]); // ✅ added dependency

  const [emp, setEmp] = useState([]); // always array
  const [msg, setMsg] = useState("");

  const [data, setData] = useState({
    title: "",
    desc: "",
    dept: "",
    eid: "",
  });

  const fun = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const addtask = () => {
    axios
      .post(`${Base_API}/addtask`, data)
      .then((res) => {
        setMsg(res.data.msg);
        setData({ title: "", desc: "", dept: "", eid: "" });
        setEmp([]); // reset employee list
      })
      .catch((err) => {
        console.log(err);
      });
  };

 const getemp = (e) => {
  const dept = e.target.value;

  setData({ ...data, dept: dept, eid: "" });

  axios
    .post(`${Base_API}/getemp/${dept}`)
    .then((res) => {
      console.log("Employee response:", res.data);
      setEmp(Array.isArray(res.data) ? res.data : []);
    })
    .catch((err) => {
      console.log(err);
      setEmp([]);
    });
};

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-fit max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Task
        </h2>

        {msg && (
          <p className="text-red-500 text-center mb-4 font-semibold">{msg}</p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            onChange={fun}
            placeholder="Enter title"
            value={data.title}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="text"
            name="desc"
            onChange={fun}
            placeholder="Enter description"
            value={data.desc}
            className="w-full px-4 py-3 border rounded-xl"
          />

          {/* Department Select */}
          <select
            value={data.dept}
            name="dept"
            onChange={getemp}
            className="w-full px-4 py-3 border rounded-xl"
          >
            <option value="" disabled>
              ---Select---
            </option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="AC">AC</option>
            <option value="ST">Testing</option>
          </select>

          {/* Employee Select */}
          <select
            value={data.eid}
            name="eid"
            onChange={fun}
            className="w-full px-4 py-3 border rounded-xl"
          >
            <option value="" disabled>
              ---Select---
            </option>

            {emp.length > 0 &&
              emp.map((empObj) => (
                <option key={empObj._id} value={empObj._id}>
                  {empObj.name} - {empObj._id}
                </option>
              ))}
          </select>
        </div>

        <button
          onClick={addtask}
          className="w-auto px-4 mt-6 bg-blue-600 text-white py-3 rounded-xl"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Addtask;