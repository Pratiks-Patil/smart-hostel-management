import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);
  const [noticeText, setNoticeText] = useState("");
  const [students, setStudents] = useState([]);

  // 🔥 Fetch ALL complaints
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "complaints"), (snap) => {
      setComplaints(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
      );
    });
    return () => unsub();
  }, []);

  // 👥 Fetch REGISTERED STUDENTS
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snap) => {
      const studentList = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(u => u.role === "student");
      setStudents(studentList);
    });
    return () => unsub();
  }, []);

  // 🔔 Fetch notices
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "notices"), (snap) => {
      setNotices(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
      );
    });
    return () => unsub();
  }, []);

  // ➕ Create notice
  const createNotice = async () => {
    if (!noticeText.trim()) return;

    await addDoc(collection(db, "notices"), {
      text: noticeText,
      createdAt: new Date()
    });
    setNoticeText("");
  };

  // ❌ Delete notice
  const removeNotice = async (id) => {
    await deleteDoc(doc(db, "notices", id));
  };

  // 🔄 Update complaint status
  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "complaints", id), { status });
  };

  // 📊 Graph data
  const graphData = {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [
      {
        label: "Total Complaints",
        data: (() => {
          const count = Array(7).fill(0);
          complaints.forEach(c => {
            if (c.createdAt?.toDate) {
              const d = c.createdAt.toDate().getDay();
              const i = d === 0 ? 6 : d - 1;
              count[i]++;
            }
          });
          return count;
        })(),
        borderColor: "#00e5ff",
        backgroundColor: "rgba(0,229,255,0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  const live = complaints.filter(c => c.status !== "Resolved").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="admin-header">
        <h2>🛡️ Admin Dashboard</h2>

        <div className="admin-actions">
          <button
            className="admin-panel-btn"
            onClick={() => navigate("/admin")}
          >
            ⚙️ Admin Panel
          </button>

          <button
            className="logout-btn"
            onClick={() => {
              auth.signOut();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stat-card live">
          <h3>Live Complaints</h3>
          <p>{live}</p>
        </div>
        <div className="stat-card resolved">
          <h3>Resolved</h3>
          <p>{resolved}</p>
        </div>
      </div>

      {/* GRAPH */}
      <div className="card">
        <h3>Complaints Overview</h3>
        <div className="chart-wrapper">
          <Line data={graphData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* ALL COMPLAINTS */}
      <div className="card">
        <h3>🛠 All Complaints</h3>

        {complaints.length === 0 && <p>No complaints found</p>}

        {complaints.map(c => (
          <div key={c.id} className="admin-card">
            <h4>{c.title}</h4>
            <p><strong>Category:</strong> {c.category}</p>
            <p><strong>Description:</strong> {c.description}</p>

            <hr />

            <p>
              <strong>Student:</strong> {c.name}<br />
              <strong>Room:</strong> {c.room} – Wing {c.wing}<br />
              <strong>Email:</strong> {c.email}
            </p>

            <p>
              <strong>Raised On:</strong>{" "}
              {c.createdAt?.toDate().toLocaleString()}
            </p>

            <p><strong>Status:</strong> {c.status}</p>

            <select
              value={c.status}
              onChange={(e) => updateStatus(c.id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        ))}
      </div>

      {/* REGISTERED STUDENTS */}
      <div className="card">
        <h3>👥 Registered Students</h3>

        {students.length === 0 && <p>No students registered</p>}

        {students.map(s => (
          <div key={s.id} className="admin-card">
            <p><strong>Name:</strong> {s.name}</p>
            <p><strong>Email:</strong> {s.email}</p>
            <p><strong>Room:</strong> {s.room} – Wing {s.wing}</p>
            <p><strong>Role:</strong> {s.role}</p>

            {s.createdAt && (
              <p>
                <strong>Registered On:</strong>{" "}
                {s.createdAt.toDate().toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* NOTICES */}
      <div className="card">
        <h3>📢 Manage Notices</h3>

        <div className="notice-create">
          <input
            placeholder="Enter notice"
            value={noticeText}
            onChange={(e) => setNoticeText(e.target.value)}
          />
          <button onClick={createNotice}>Create</button>
        </div>

        {notices.length === 0 && <p>No notices</p>}

        {notices.map(n => (
          <div key={n.id} className="notice-row">
            <span>{n.text}</span>
            <button onClick={() => removeNotice(n.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
