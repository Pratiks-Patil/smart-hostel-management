import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const nav = useNavigate();

  const setRole = async (role) => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), { role });
    nav("/dashboard");
  };

  return (
    <div className="role">
      <h2>Select Role</h2>
      <button onClick={() => setRole("admin")}>Admin</button>
      <button onClick={() => setRole("student")}>Student</button>
    </div>
  );
}
