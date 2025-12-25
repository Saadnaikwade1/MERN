import React, { useState, useContext, useEffect } from "react";
import Ct from "./UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminHome() {
  let [data, setData] = useState([]);
  let [f, setF] = useState(true);
  let [msg, setMsg] = useState("");

  let obj = useContext(Ct);
  let navigate = useNavigate();

  useEffect(() => {
    if (obj.state.token === "") {
      navigate("/");
    } else {
      axios.get("http://localhost:5000/disp").then((res) => {
        setData(res.data);
      });
    }
  }, [f]);

  let del = (tid) => {
    axios.delete(`http://localhost:5000/del/${tid}`).then((res) => {
      setMsg(res.data.msg);
      setF(!f);

      setTimeout(() => {
        setMsg("");
      }, 3000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Admin Dashboard
      </h1>

    
      {msg && (
        <div className="mb-4 text-center">
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-md">
            {msg}
          </span>
        </div>
      )}

 
      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 border">SNO</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">EID</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((obj, ind) => (
                <tr
                  key={obj._id}
                  className="text-center hover:bg-gray-100"
                >
                  <td className="p-2 border">{ind + 1}</td>
                  <td className="p-2 border">{obj.title}</td>
                  <td className="p-2 border">{obj.desc}</td>
                  <td className="p-2 border">{obj.eid}</td>

                  <td
                    className={`p-2 border font-semibold ${
                      obj.status === "rejected"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {obj.status}
                  </td>

                  <td className="p-2 border">
                    {obj.status === "rejected" && (
                      <button
                        onClick={() => del(obj._id)}
                        className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Data */}
      {data.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No records available
        </p>
      )}
    </div>
  );
}

export default AdminHome;
