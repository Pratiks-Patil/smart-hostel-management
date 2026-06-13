import "./Landing.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

  return (
    <div className="landing">
        <div
  className="admin-entry"
  onClick={() => navigate("/admin-login")}
  title="Admin Login"
>
  🛡️
</div>

      <div className="overlay">
        <h1>Smart Hostel Management</h1>
        <p>Digital solution for hostel life!</p>
        <div className="btns">
          <Link to="/login">Login</Link>
          <Link to="/register">Signup</Link>
        </div>
      </div>
    </div>
  );
}
