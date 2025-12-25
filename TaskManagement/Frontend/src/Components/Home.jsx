import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "./UserContext"
import axios from "axios"
import Base_API from "../config/api"

function Home() {
  const obj = useContext(UserContext)
  const navigate = useNavigate()

  const [crtask, setcrTask] = useState([])
  const [pentask, setpenTask] = useState([])
  const [comtask, setcomTask] = useState([])
  const [f, setF] = useState(true)

  useEffect(() => {
    if (obj.state.token === "") {
      navigate("/")
    } else {
      axios
        .get(`${Base_API}/disp/${obj.state._id}`)
        .then((res) => {
          if (res.data.length > 0) {
            setcrTask(res.data.filter((o) => o.status === "created"))
            setpenTask(res.data.filter((o) => o.status === "pending"))
            setcomTask(res.data.filter((o) => o.status === "completed"))
          }
        })
    }
  }, [f])

  const changeState = (tid, st) => {
    axios
      .get(`${Base_API}/updstatus/${tid}/${st}`)
      .then(() => setF(!f))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* CREATED TASKS */}
      {crtask.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Tasks Need Approval
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {crtask.map((obj) => (
              <div
                key={obj._id}
                className="bg-white rounded-xl shadow-md p-5 border-l-4 border-orange-500"
              >
                <h3 className="text-lg font-bold text-gray-900">
                  {obj.title}
                </h3>
                <p className="text-gray-600 mt-2">{obj.desc}</p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => changeState(obj._id, "pending")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => changeState(obj._id, "rejected")}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PENDING TASKS */}
      {pentask.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
            Pending Tasks
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pentask.map((obj) => (
              <div
                key={obj._id}
                className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500"
              >
                <h3 className="text-lg font-bold text-gray-900">
                  {obj.title}
                </h3>
                <p className="text-gray-600 mt-2">{obj.desc}</p>

                <button
                  onClick={() => changeState(obj._id, "completed")}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Mark Completed
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* COMPLETED TASKS */}
      {comtask.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
            Completed Tasks
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comtask.map((obj) => (
              <div
                key={obj._id}
                className="bg-green-50 rounded-xl shadow-sm p-5 border-l-4 border-green-500"
              >
                <h3 className="text-lg font-bold text-gray-900">
                  {obj.title}
                </h3>
                <p className="text-gray-600 mt-2">{obj.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* EMPTY STATE */}
      {crtask.length === 0 &&
        pentask.length === 0 &&
        comtask.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <h2 className="text-xl text-gray-500">
              No tasks to display
            </h2>
          </div>
        )}
    </div>
  )
}

export default Home
