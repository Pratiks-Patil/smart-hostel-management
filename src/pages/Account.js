import "./Account.css";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    hostel: "",
    wing: "",
    floor: "",
    room: "",
    department: "",
    year: ""
  });

  // 🔹 Fetch user data
  useEffect(() => {
    if (!auth.currentUser) return;

    const fetchUser = async () => {
      const ref = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setForm(snap.data());
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Update user data
  const updateProfile = async () => {
    try {
      const ref = doc(db, "users", auth.currentUser.uid);
      await updateDoc(ref, {
        name: form.name,
        phone: form.phone,
        hostel: form.hostel,
        wing: form.wing,
        floor: form.floor,
        room: form.room,
        department: form.department,
        year: form.year
      });

      alert("Profile updated successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <p style={{ color: "white", padding: "30px" }}>Loading...</p>;
  }

  return (
    <div className="account-page">
      <div className="account-card">
        <h2>My Account</h2>
        <p>Edit your hostel details</p>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name || ""}
          onChange={handleChange}
        />

        <input
          value={auth.currentUser.email}
          disabled
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone || ""}
          onChange={handleChange}
        />

        <input
          name="hostel"
          placeholder="Hostel Name"
          value={form.hostel || ""}
          onChange={handleChange}
        />

        <input
          name="wing"
          placeholder="Wing / Block"
          value={form.wing || ""}
          onChange={handleChange}
        />

        <input
          name="floor"
          placeholder="Floor"
          value={form.floor || ""}
          onChange={handleChange}
        />

        <input
          name="room"
          placeholder="Room Number"
          value={form.room || ""}
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department || ""}
          onChange={handleChange}
        />

        <input
          name="year"
          placeholder="Year (FY / SY / TY / Final)"
          value={form.year || ""}
          onChange={handleChange}
        />

        <button onClick={updateProfile}>
          Save Changes
        </button>

        <button className="back" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
