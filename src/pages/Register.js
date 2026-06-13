import "./Login.css"; // reuse same glass UI
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import {
  MdEmail,
  MdLock,
  MdPerson,
  MdPhone,
  MdHome
} from "react-icons/md";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    hostel: "",
    wing: "",
    floor: "",
    room: "",
    department: "",
    year: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        hostel: form.hostel,
        wing: form.wing,
        floor: form.floor,
        room: form.room,
        department: form.department,
        year: form.year,
        role: "",
        createdAt: new Date()
      });

      navigate("/dashboard");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
  <div className="login-card">

        <h2>Create Hostel Account</h2>
        <p>Enter your hostel details</p>

        <div className="input-icon">
          <MdPerson />
          <input name="name" placeholder="Full Name" onChange={handleChange} />
        </div>

        <div className="input-icon">
          <MdEmail />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        </div>

        <div className="input-icon">
          <MdPhone />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
        </div>

        <div className="input-icon">
          <MdHome />
          <input name="hostel" placeholder="Hostel Name" onChange={handleChange} />
        </div>

        <div className="input-icon">
          <input name="wing" placeholder="Wing / Block" onChange={handleChange} />
        </div>

       

        <div className="input-icon">
          <input name="room" placeholder="Room No" onChange={handleChange} />
        </div>

        <div className="input-icon">
          <input name="department" placeholder="Department / Course" onChange={handleChange} />
        </div>

        <div className="input-icon">
          <input name="year" placeholder="Year (FY / SY / TY / Final)" onChange={handleChange} />
        </div>

        <div className="input-icon">
          <MdLock />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <div className="input-icon">
          <MdLock />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
        </div>

        <button className="primary" onClick={signup}>
          Create Account
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already registered?{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
