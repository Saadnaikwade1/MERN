import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminNavbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Resize handling
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <h3 style={styles.logo}>Admin Panel</h3>

      {/* Hamburger */}
      {isMobile && (
        <div style={styles.menuIcon} onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </div>
      )}

      {/* Links */}
      <div
        style={{
          ...styles.links,
          ...(isMobile
            ? open
              ? styles.linksMobile
              : styles.linksHidden
            : {})
        }}
      >
        <Link style={styles.link} to="/admin" onClick={() => setOpen(false)}>
          Dashboard
        </Link>

        <Link
          style={styles.link}
          to="/admin/pending"
          onClick={() => setOpen(false)}
        >
          Pending Approvals
        </Link>

        <Link
          style={styles.link}
          to="/admin/create-doctor"
          onClick={() => setOpen(false)}
        >
          Admit Doctor
        </Link>
        <Link
          style={styles.link}
          to="/admin/allusers"
          onClick={() => setOpen(false)}
        >
          All Users
        </Link>

        <div style={styles.userBox}>
          <span style={styles.username}>👤 {user?.name}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: "#1e293b",
    color: "white",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
  },

  logo: {
    fontSize: "20px",
    fontWeight: "700",
    margin: 0
  },

  menuIcon: {
    fontSize: "28px",
    cursor: "pointer",
    userSelect: "none"
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    transition: "all 0.35s ease"
  },

  linksMobile: {
    position: "absolute",
    top: "60px",
    left: 0,
    width: "100%",
    background: "#334155",
    flexDirection: "column",
    padding: "15px 0",
    opacity: 1,
    transform: "translateY(0)",
    pointerEvents: "auto"
  },

  linksHidden: {
    position: "absolute",
    top: "60px",
    left: 0,
    width: "100%",
    flexDirection: "column",
    opacity: 0,
    transform: "translateY(-15px)",
    pointerEvents: "none"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    padding: "10px 0"
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  username: {
    fontWeight: "600",
    fontSize: "14px"
  },

  logoutBtn: {
    background: "#ef4444",
    border: "none",
    color: "white",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default AdminNavbar;
