import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditEmp() {
  let [data, setData] = useState({});
  let { id } = useParams();
  let nav = useNavigate();

  // Handle inputs
  let fun = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Fetch employee data
  useEffect(() => {
    axios.get(`http://localhost:5000/edit/${id}`).then((res) => {
      setData(res.data);
    });
  }, []);

  // Update employee
  let upd = () => {
    axios.put(`http://localhost:5000/upd/${id}`, data).then((res) => {
      alert("Data Updated");
      nav("/");
    });
  };

  return (
    <div className="form">
      <h1>Edit Employee</h1>

      <input
        type="text"
        name="_id"
        onChange={fun}
        value={data._id || ""}
        disabled
      />

      <input
        type="text"
        name="name"
        onChange={fun}
        placeholder="Enter your name"
        value={data.name || ""}
      />

      <input
        type="email"
        name="email"
        onChange={fun}
        placeholder="Enter your email"
        value={data.email || ""}
      />

      <input
        type="tel"
        name="phno"
        onChange={fun}
        placeholder="Enter your phno"
        value={data.phno || ""}
      />

      <div>
        <input
          type="radio"
          name="gen"
          value="male"
          checked={data.gen === "male"}
          onChange={fun}
        />
        Male

        <input
          type="radio"
          name="gen"
          value="female"
          checked={data.gen === "female"}
          onChange={fun}
        />
        Female
      </div>

      <input
        type="text"
        name="sal"
        onChange={fun}
        placeholder="Enter salary"
        value={data.sal || ""}
      />

      <select name="dept" onChange={fun} value={data.dept || ""}>
        <option value="" disabled>
          ----Select department---
        </option>
        <option value="hr">HR</option>
        <option value="qc">Quality check</option>
        <option value="qa">Quality Assurance</option>
        <option value="sd">Software Developer</option>
        <option value="dv">DevOps Engineer</option>
      </select>

      <button onClick={upd}>Update Employee</button>
    </div>
  );
}

export default EditEmp;
