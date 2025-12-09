import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

function Nav() {
  let obj=useContext(UserContext)
  return (
    <nav className="h-[10vh] bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">TaskManager</h1>

        {/* Links */}
        <div className="flex space-x-6">
          {obj.state.token==""&&<Link to="/" className="hover:text-blue-400 transition duration-300">
            Login
          </Link>}

          {obj.state.token==""&& <Link
            to="/reg"
            className="hover:text-blue-400 transition duration-300"
          >
            Register
          </Link>}

          {obj.state.role=="emp"&&<Link
            to="/home"
            className="hover:text-blue-400 transition duration-300"
          >
            Home
          </Link>}

          {obj.state.role=="admin"&&<Link
            to="/addtask"
            className="hover:text-blue-400 transition duration-300"
          >
            Add Task
          </Link>}

          {obj.state.role=="admin"&&<Link
            to="/adminhome"
            className="hover:text-blue-400 transition duration-300"
          >
            Admin Home
          </Link>}

          {obj.state.token!=""&&<Link
            to="/logout"
            className="hover:text-red-400 transition duration-300"
          >
            Logout
          </Link>}
       {obj.state.name!=""&& <Avatar sx={{ bgcolor: deepOrange[600], width: 30, height: 30 }}>{obj.state.name.charAt(0).toUpperCase()}</Avatar>}

        </div>
      </div>
    </nav>
  );
}

export default Nav;
