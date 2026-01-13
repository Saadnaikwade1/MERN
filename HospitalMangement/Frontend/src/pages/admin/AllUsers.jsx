import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminNavbar from "../../components/AdminNavbar";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/users")
      .then((res) => {
        setUsers(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
   

      <div style={styles.container}>
        <h2 style={styles.heading}>All Users</h2>

        {loading ? (
          <p style={styles.loading}>Loading users...</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.trHead}>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Approved</th>
                </tr>
              </thead>

              <tbody>
                {users.filter((u)=>u.role!='admin').map((u) => (
                 
                  <tr key={u._id} style={styles.tr}>
                    <td style={styles.td}>{u.name}</td>
                    <td style={styles.td}>{u.email}</td>
                    <td style={styles.td}>{u.role}</td>
                    <td style={styles.td}>
                      {u.isApproved ? "✅ Yes" : "❌ No"}
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
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "#f8fafc"
  },

  heading: {
    marginBottom: "20px",
    color: "#1e293b",
    fontSize: "24px",
    fontWeight: "600"
  },

  loading: {
    color: "#475569",
    fontSize: "16px"
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px"
  },

  trHead: {
    backgroundColor: "#1e293b",
    color: "#fff"
  },

  th: {
    padding: "12px",
    textAlign: "left",
    fontSize: "14px"
  },

  tr: {
    borderBottom: "1px solid #e5e7eb"
  },

  td: {
    padding: "12px",
    fontSize: "14px",
    color: "#334155"
  }
};

export default AllUsers;
