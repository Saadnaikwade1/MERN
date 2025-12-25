import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function DisplayData() {
  let [data, setData] = useState([]);
  let nav=useNavigate()

  useEffect(() => {
    axios.get(`${API_BASE_URL}/disp`).then((res) => {
      setData(res.data);
    });
  }, []);
  let edit=(id)=>{
    nav(`/edit/${id}`)
  }
 let del = (id) => {
  if (window.confirm(`Do you want to delete employee with ID: ${id}?`)) {
    axios
      .delete(`${API_BASE_URL}/emp/${id}`)
      .then((res) => {
        alert(`Employee with ID ${id} deleted successfully`);
        window.location.reload(); // or update state
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  }
};

  return (
    <div>
      {data.length > 0 && (
        <table border={1}>
          <tr>
            <th>EmpId</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phno</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Department</th>
          </tr>
          {data.map((obj) => {
            return (
              <tr>
                <td>{obj._id}</td>
                <td>{obj.name}</td>
                <td>{obj.email}</td>
                <td>{obj.phno}</td>
                <td>{obj.gen}</td>
                <td>{obj.sal}</td>
                <td>{obj.dept}</td>
                <td><button onClick={()=>edit(obj._id)}>Edit</button></td>
                <td><button onClick={()=>del(obj._id)}>Delelte</button></td>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
}

export default DisplayData;
