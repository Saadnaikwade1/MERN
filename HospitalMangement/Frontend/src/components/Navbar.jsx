import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminNavbar from "./AdminNavbar";
import DoctorNavbar from "./DoctorNavbar";
import PatientNavbar from "./PatientNavbar";
import ReceptionistNavbar from "./ReceptionNavbar";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  // 🔐 Role-based navbars
  if (user?.role === "admin") return <AdminNavbar />;
  if (user?.role === "doctor") return <DoctorNavbar />;
  if (user?.role === "patient") return <PatientNavbar />;
  if (user?.role === "receptionist") return <ReceptionistNavbar />;

  // 🌐 Public Navbar (not logged in)
  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>Hospital System</h3>

      <div style={styles.links}>

        <Link to="/" style={styles.link}>
          Home
        </Link>
     
        <Link to="/login" style={styles.link}>
          Login
        </Link>
        <Link to="/register" style={styles.link}>
          Register
        </Link>
      </div> 
    </nav>
  );
};

const styles = {
  nav: {
    padding: "12px 24px",
    backgroundColor: "#0f766e",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
  },
  logo: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600"
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "500"
  }
};

export default Navbar;
