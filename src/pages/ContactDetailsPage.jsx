import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContacts } from "../ContactContext";
import ContactDetails from "../components/ContactDetails";

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  textAlign: "center",
  padding: "20px",
};

const cardStyle = {
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  padding: "30px",
  minWidth: "320px",
  maxWidth: "600px",
  width: "90%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",  // space between elements inside the card
};

export default function ContactDetailPage() {
  const { id } = useParams();
  const contactId = parseInt(id, 10);
  const { contacts, deleteContact } = useContacts();
  const navigate = useNavigate();

  const contact = contacts.find((c) => c.id === contactId);

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContact(id);
      navigate("/");
    }
  }

  if (!contact)
    return (
      <div style={centerStyle}>
        <div style={cardStyle}>
          <p>Contact not found</p>
        </div>
      </div>
    );

  return (
    <div style={centerStyle}>
      <div style={cardStyle}>
        <ContactDetails contact={contact} onDelete={handleDelete} />
      </div>
    </div>
  );
}
