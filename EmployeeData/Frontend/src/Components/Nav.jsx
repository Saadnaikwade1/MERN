import React from "react";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <div className="nav">
      <Link to="/">DisplayData</Link>
      <Link to="/add">AddData</Link>
    </div>
  );
}

export default Nav;
