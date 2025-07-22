import React, { useState } from "react";
import { useContacts } from "../ContactContext";
import ContactList from "../components/ContactList";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function ContactListPage() {
  const { contacts } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Read selected id from URL query ?selected=ID
  const selectedId = new URLSearchParams(location.search).get("selected");
  const selectedIdNum = selectedId ? parseInt(selectedId, 10) : null;

  // Filter contacts
  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // On select contact, update route to contact detail page
  function handleSelect(id) {
    navigate(`/contacts/contact/${id}`);
  }

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <ContactList
          contacts={filtered}
          selectedId={selectedIdNum}
          onSelect={handleSelect}
        />
        <Link to="/contacts/add" style={styles.addButton}>
          + Add New Contact
        </Link>
      </div>

      <div style={styles.detailsPanel}>
        {/* Show nothing here - Contact detail handled by ContactDetailPage */}
        <p>Select a contact on the left to see details.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  sidebar: {
    width: 320,
    borderRight: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
  },
  searchInput: {
    padding: "10px 15px",
    border: "none",
    borderBottom: "1px solid #ddd",
    fontSize: 16,
    outline: "none",
  },
  addButton: {
    padding: "12px 20px",
    border: "none",
    backgroundColor: "#2ecc71",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: 16,
    textDecoration: "none",
    textAlign: "center",
  },
  detailsPanel: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: "#f9f9f9",
  },
};
