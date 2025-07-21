import React from "react";
import { useNavigate } from "react-router-dom";

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("");

export default function ContactDetails({ contact, onDelete }) {
  const navigate = useNavigate();

  if (!contact)
    return <div style={{ padding: 20, color: "#888" }}>Select a contact</div>;

  return (
    <div style={{ maxWidth: 400 }}>
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: "#3498db",
          color: "#fff",
          fontWeight: "700",
          fontSize: 48,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
          userSelect: "none",
        }}
      >
        {getInitials(contact.name)}
      </div>
      <h2>{contact.name}</h2>
      <p>
        <strong>Phone:</strong> {contact.phone || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {contact.email || "N/A"}
      </p>
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button
          style={styles.editButton}
          onClick={() => navigate(`/edit/${contact.id}`)}
        >
          ✏️ Edit
        </button>
        <button style={styles.deleteButton} onClick={() => onDelete(contact.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  editButton: {
    padding: "8px 15px",
    cursor: "pointer",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: 4,
    fontSize: 16,
  },
  deleteButton: {
    padding: "8px 15px",
    cursor: "pointer",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: 4,
    fontSize: 16,
  },
};
