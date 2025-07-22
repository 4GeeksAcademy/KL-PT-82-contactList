import React from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../ContactContext";
import ContactForm from "../components/ContactForm";

export default function AddContactPage() {
  const { addContact } = useContacts();
  const navigate = useNavigate();

  function handleSave(contact) {
    addContact(contact);
    navigate("/");
  }

  return (
    <div style={{ marginLeft: '4px' }}>
      <ContactForm onSave={handleSave} onCancel={() => navigate("/")} />
    </div>
  );
}
