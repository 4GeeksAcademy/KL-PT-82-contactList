import React from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../ContactContext";
import ContactForm from "../components/ContactForm";
import AddContactForm from "../components/AddContactForm";

export default function AddContactPage() {
  const { addContact } = useContacts();
  const navigate = useNavigate();

  function handleSave(contact) {
    addContact(contact);
    navigate("/");
  }

  return (
    <div style={{ marginLeft: '4px' }}>
      <AddContactForm onSave={handleSave} onCancel={() => navigate("/")} />
    </div>
  );
}
