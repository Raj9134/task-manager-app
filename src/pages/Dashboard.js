import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/tasks/dashboard");
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboard();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div className="card">
        <p>Total: {data.total}</p>
        <p>Pending: {data.pending}</p>
        <p>In Progress: {data.inProgress}</p>
        <p>Done: {data.done}</p>
        <p>Overdue: {data.overdue}</p>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;