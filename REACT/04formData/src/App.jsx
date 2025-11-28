import { useState } from "react";
import "./App.css";

function App() {
  let [data, setData] = useState({
    name: "",
    email: "",
    phno: "",
    dob: "",
    gender: "",
    addr: "",
    state: "",
    rt: "8",
    lang: [],
  });

  let [arr, setArr] = useState([]);
  let [error, setError] = useState({});

  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let fun1 = (e) => {
    let copy = [...data.lang];
    if (e.target.checked) {
      copy.push(e.target.value);
    } else {
      copy = copy.filter((item) => item !== e.target.value);
    }
    setData({ ...data, lang: copy });
  };

  let add = () => {
    if (validate()) {
      alert("Form submitted successfully!");
      setArr([...arr, data]);
      setData({
        name: "",
        email: "",
        phno: "",
        dob: "",
        gender: "",
        addr: "",
        state: "",
        rt: "",
        lang: [],
      });
    }
  };

  function validate() {
    let err = {};
    if (!data.name.trim() || data.name.trim().length < 3)
      err.name = "Name must be greater than 3";
    if (!data.email.includes("@")) err.email = "Valid email required";
    if (data.phno.length !== 10) err.phno = "Phone no must be 10 digits";
    if (!data.gender) err.gender = "Select gender";
    if (!data.addr.trim()) err.addr = "Address required";
    if (!data.state) err.state = "Select state";
    if (data.lang.length === 0) err.lang = "Select at least one language";

    setError(err);
    return Object.keys(err).length === 0;
  }

  return (
    <>
      <div className="container">
        <h2>Registration Form</h2>

        <div className="form">
          <input
            type="text"
            placeholder="Enter Name"
            onChange={fun}
            name="name"
            value={data.name}
          />
          <p className="err">{error.name}</p>

          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={fun}
            value={data.email}
          />
          <p className="err">{error.email}</p>

          <input
            type="tel"
            placeholder="Enter Phone No"
            name="phno"
            onChange={fun}
            value={data.phno}
          />
          <p className="err">{error.phno}</p>

          <label>Date of Birth</label>
          <input type="date" name="dob" value={data.dob} onChange={fun} />
          <p className="err">{error.dob}</p>

          <div className="gender-box">
            <label>Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                onChange={fun}
                value="male"
                checked={data.gender === "male"}
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                onChange={fun}
                value="female"
                checked={data.gender === "female"}
              />
              Female
            </label>
          </div>
          <p className="err">{error.gender}</p>

          <textarea
            cols={30}
            rows={4}
            name="addr"
            placeholder="Enter Address"
            onChange={fun}
            value={data.addr}
          ></textarea>
          <p className="err">{error.addr}</p>

          <select name="state" onChange={fun} value={data.state}>
            <option value="" disabled>
              --Select State--
            </option>
            <option value="ka">Karnataka</option>
            <option value="mh">Maharashtra</option>
            <option value="tg">Telangana</option>
            <option value="ap">Andhra Pradesh</option>
          </select>
          <p className="err">{error.state}</p>

          <label>Rating: {data.rt}</label>
          <input
            type="range"
            name="rt"
            value={data.rt}
            min={0}
            max={10}
            onChange={fun}
          />

          <div className="checkbox">
            <label>Languages:</label>
            <div className="lang-box">
              <label>
                <input
                  type="checkbox"
                  onChange={fun1}
                  value="python"
                  checked={data.lang.includes("python")}
                />
                Python
              </label>

              <label>
                <input
                  type="checkbox"
                  onChange={fun1}
                  value="java"
                  checked={data.lang.includes("java")}
                />
                Java
              </label>

              <label>
                <input
                  type="checkbox"
                  onChange={fun1}
                  value="js"
                  checked={data.lang.includes("js")}
                />
                JavaScript
              </label>
            </div>
          </div>
          <p className="err">{error.lang}</p>

          <button onClick={add} className="btn">
            Add
          </button>
        </div>
      </div>
      <div className="table-info">
        {arr.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Address</th>
                <th>State</th>
                <th>Rating</th>
                <th>Language</th>
              </tr>
            </thead>

            <tbody>
              {arr.map((obj, i) => (
                <tr key={i}>
                  <td>{obj.name}</td>
                  <td>{obj.email}</td>
                  <td>{obj.phno}</td>
                  <td>{obj.dob}</td>
                  <td>{obj.gender}</td>
                  <td>{obj.addr}</td>
                  <td>{obj.state}</td>
                  <td>{obj.rt}</td>
                  <td>{obj.lang.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default App;
