import "./StudentsModal.css";

export default function StudentsModal({ students, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card large">
        <h3>👥 Registered Students</h3>

        {students.length === 0 && <p>No students found</p>}

        {students.map(s => (
          <div key={s.id} className="student-row">
            <p><strong>Name:</strong> {s.name}</p>
            <p><strong>Email:</strong> {s.email}</p>
            <p><strong>Room:</strong> {s.room} – Wing {s.wing}</p>
          </div>
        ))}

        <div className="modal-actions">
          <button className="cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
