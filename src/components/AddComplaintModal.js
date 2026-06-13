import "./AddComplaintModal.css";
import { useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc
} from "firebase/firestore";

export default function AddComplaintModal({ onClose }) {
  // 🔹 FORM STATES (THIS WAS MISSING)
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔹 SUBMIT COMPLAINT
  const submitComplaint = async () => {
    if (!category || !title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) return;

      // Fetch student details
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("User profile not found");
        return;
      }

      const userData = userSnap.data();

      // Add complaint with auto details
      await addDoc(collection(db, "complaints"), {
        // WHO
        userId: user.uid,
        name: userData.name,
        email: user.email,

        // WHERE
        room: userData.room,
        wing: userData.wing,

        // WHAT
        category,
        title,
        description,
        status: "Pending",

        // WHEN
        createdAt: serverTimestamp()
      });

      alert("Complaint submitted successfully");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to submit complaint");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>➕ Raise Complaint</h3>

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Carpentry">Carpentry</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Other">Other</option>
        </select>

        {/* TITLE */}
        <input
          placeholder="Complaint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* ACTION BUTTONS */}
        <div className="modal-actions">
          <button className="submit" onClick={submitComplaint}>
            Submit
          </button>
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
