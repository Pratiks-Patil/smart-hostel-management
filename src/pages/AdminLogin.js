import "./AdminLogin.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const ref = doc(db, "users", result.user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists() || snap.data().role !== "admin") {
        alert("Not an admin account");
        auth.signOut();
        return;
      }

      navigate("/admindashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>🛡️ Admin Login</h2>
        <p>Authorized access only</p>

        <input
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleAdminLogin}>
          Login as Admin
        </button>

        <div
          className="admin-back"
          onClick={() => navigate("/")}
        >
          Back to Home
        </div>
      </div>
    </div>
  );
}
