import "./Dashboard.css";
import { useState, useEffect } from "react";
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
import { auth, db } from "../firebase";
import AddComplaintModal from "../components/AddComplaintModal";

import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Chart setup
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🔐 AUTH-AWARE USER DATA FETCH (FIXES REFRESH BUG)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUserData(snap.data());
      }
    });

    return () => unsub();
  }, []);

  // 🔥 FETCH ONLY THIS STUDENT'S COMPLAINTS (NO orderBy)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const q = query(
        collection(db, "complaints"),
        where("userId", "==", user.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setComplaints(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        );
      });

      return () => unsubscribe();
    });

    return () => unsub();
  }, []);

  // 🔔 FETCH NOTICES (OPTIONAL – SAFE)
  useEffect(() => {
    const q = collection(db, "notices");

    const unsub = onSnapshot(q, (snap) => {
      setNotices(
        snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    });

    return () => unsub();
  }, []);

  // 📊 GRAPH DATA FROM STUDENT COMPLAINTS
  const graphData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Complaints Raised",
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
        borderColor: "#00c6ff",
        backgroundColor: "rgba(0,198,255,0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="dash-header">
        <div className="user-info">
          <h2 className="app-title">🏨 Smart Hostel</h2>
          <strong>{userData?.name || "Student"}</strong>
          <p>
            Room {userData?.room || "--"}
            {userData?.wing && ` – Wing ${userData.wing}`}
          </p>
        </div>

        <div className="header-right">
          <button onClick={() => navigate("/account")}>Account</button>
          <button
            className="logout"
            onClick={() => {
              auth.signOut();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* GRAPH */}
      <div className="card graph-card">
        <h3>Weekly Activity</h3>
        <div className="chart-wrapper">
          <Line data={graphData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* GRID */}
      <div className="grid">
        {/* NOTICES */}
        <div className="card">
          <h3>📢 Notices</h3>
          {notices.length === 0 && <p>No notices</p>}
          {notices.map(n => (
            <div key={n.id} className="notice">
              {n.text}
            </div>
          ))}
        </div>

        {/* COMPLAINTS */}
        <div className="card">
          <button
            style={{ marginBottom: "10px" }}
            onClick={() => setShowModal(true)}
          >
            ➕ Add Complaint
          </button>

          <h3>🛠 My Complaints</h3>

          {complaints.length === 0 && (
            <p>No complaints raised yet</p>
          )}

          {complaints.map(c => (
            <div
              key={c.id}
              className={`complaint ${
                c.status === "Resolved" ? "resolved" : "pending"
              }`}
            >
              <h4>{c.title}</h4>
              <p>Category: {c.category}</p>
              <p>Status: {c.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ADD COMPLAINT MODAL */}
      {showModal && (
        <AddComplaintModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
