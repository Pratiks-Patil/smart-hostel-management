import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

import { auth, googleProvider, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Icons
import { MdEmail, MdPhoneAndroid, MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";


export default function Login() {
  const [method, setMethod] = useState("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const navigate = useNavigate();

  // 🔹 Create or check user in Firestore
  const handleUser = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  const redirectAfterLogin = async (user) => {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists() && snap.data().role === "admin") {
    navigate("/admin");
  } else {
    navigate("/dashboard");
  }
};


  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email || "",
      phone: user.phoneNumber || "",
      role: "student", // optional default
      createdAt: new Date()
    });
  }

  navigate("/dashboard");
};


  // 🔹 EMAIL LOGIN
  const emailLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await handleUser(res.user);
    } catch (err) {
      alert(err.message);
    }
    
  };

  // 🔹 GOOGLE LOGIN
  const googleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await handleUser(res.user);
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 SEND OTP
  const sendOtp = async () => {
  try {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA verified");
          }
        }
      );
    }

    const appVerifier = window.recaptchaVerifier;

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      appVerifier
    );

    setConfirmation(confirmationResult);
    alert("OTP sent successfully");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};


  // 🔹 VERIFY OTP
  const verifyOtp = async () => {
    try {
      const res = await confirmation.confirm(otp);
      await handleUser(res.user);
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Login to continue</p>

        {/* LOGIN METHOD TABS */}
        <div className="tabs">
          <button
            className={method === "email" ? "active" : ""}
            onClick={() => setMethod("email")}
          >
            <MdEmail /> Email
          </button>

          <button
            className={method === "phone" ? "active" : ""}
            onClick={() => setMethod("phone")}
          >
            <MdPhoneAndroid /> Phone
          </button>
        </div>

        {/* EMAIL LOGIN */}
        {method === "email" && (
          <>
            <div className="input-icon">
              <MdEmail />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-icon">
              <MdLock />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="primary" onClick={emailLogin}>
              Login
            </button>
          </>
        )}

        {/* PHONE LOGIN */}
        {method === "phone" && (
          <>
            <div className="input-icon">
              <MdPhoneAndroid />
              <input
                placeholder="+91XXXXXXXXXX"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {confirmation ? (
              <>
                <input
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button className="primary" onClick={verifyOtp}>
                  Verify OTP
                </button>
              </>
            ) : (
              <button className="primary" onClick={sendOtp}>
                Send OTP
              </button>
            )}
          </>
        )}

        <div id="recaptcha"></div>

        <div className="divider">OR</div>

        {/* GOOGLE LOGIN */}
        <button className="google" onClick={googleLogin}>
          <FcGoogle size={22} />
          Continue with Google
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
