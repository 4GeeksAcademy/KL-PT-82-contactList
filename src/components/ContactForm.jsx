import React, { useState, useEffect } from "react";

export default function ContactForm({ contact, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (contact) setFormData(contact);
  }, [contact]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }
    onSave(formData);
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h2>{contact ? "Edit Contact" : "Add New Contact"}</h2>
      <label style={styles.label}>
        Name:
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </label>
      <label style={styles.label}>
        Phone:
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={styles.input}
          type="tel"
        />
      </label>
      <label style={styles.label}>
        Email:
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          type="email"
        />
      </label>
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button type="submit" style={styles.saveButton}>
          Save
        </button>
        <button type="button" style={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

const styles = {
  label: {
    display: "block",
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "8px 12px",
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
    marginTop: 4,
    boxSizing: "border-box",
  },
  saveButton: {
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: 4,
    padding: "10px 20px",
    fontSize: 16,
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#bdc3c7",
    border: "none",
    borderRadius: 4,
    padding: "10px 20px",
    fontSize: 16,
    cursor: "pointer",
  },
};
