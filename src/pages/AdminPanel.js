import "./AdminPanel.css";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
  orderBy,
  query
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔒 Check admin access
  useEffect(() => {
    const checkAdmin = async () => {
      if (!auth.currentUser) return;

      const ref = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(ref);

      if (!snap.exists() || snap.data().role !== "admin") {
        alert("Access denied");
        navigate("/dashboard");
      }
    };

    checkAdmin();
  }, []);

  // 🔥 Fetch all complaints (real-time)
  useEffect(() => {
    const q = query(
      collection(db, "complaints"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setComplaints(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "complaints", id), { status });
  };

  if (loading) {
    return <p style={{ color: "white", padding: "30px" }}>Loading...</p>;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>🛡️ Admin Panel</h2>
        <button onClick={() => navigate("/admindashboard")}>
          Go to Dashboard
        </button>
      </div>

      {complaints.length === 0 && <p>No complaints found</p>}

      {complaints.map(c => (
        <div key={c.id} className="admin-card">
          <h3>{c.title}</h3>
          <p><strong>Category:</strong> {c.category}</p>
          <p><strong>Description:</strong> {c.description}</p>
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
  );
}
