import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminNavbar from "../../components/AdminNavbar";

const PendingApprovals = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchPendingUsers = async () => {
    try {
      const res = await api.get("/admin/pending");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to load pending users");
    }
  };

  const approveUser = async (id) => {
    try {
      await api.put(`/admin/approve/${id}`);
      alert("User approved successfully");
      fetchPendingUsers();
    } catch (err) {
      alert("Approval failed");
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  return (
    <>

      <div style={styles.container}>
        <h2 style={styles.heading}>Pending Approvals</h2>

        {error && <p style={styles.error}>{error}</p>}

        {users.length === 0 ? (
          <div style={styles.empty}>No pending users</div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} style={styles.tr}>
                    <td style={styles.td}>{u.name}</td>
                    <td style={styles.td}>{u.email}</td>
                    <td style={styles.td}>
                      <span style={styles.roleBadge}>{u.role}</span>
                    </td>
                    <td style={styles.td}>
                      <button
                        style={styles.approveBtn}
                        onClick={() => approveUser(u._id)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0fdfa",
    padding: "30px"
  },
  heading: {
    marginBottom: "20px",
    color: "#0f766e",
    fontSize: "26px",
    fontWeight: "600"
  },
  error: {
    color: "red",
    marginBottom: "15px"
  },
  empty: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
    color: "#555"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
  },
  th: {
    backgroundColor: "#0f766e",
    color: "#ffffff",
    padding: "12px",
    textAlign: "left",
    fontWeight: "600"
  },
  tr: {
    borderBottom: "1px solid #eee"
  },
  td: {
    padding: "12px",
    color: "#333"
  },
  roleBadge: {
    backgroundColor: "#ccfbf1",
    color: "#065f46",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500"
  },
  approveBtn: {
    padding: "6px 14px",
    backgroundColor: "#0f766e",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500"
  }
};

export default PendingApprovals;
