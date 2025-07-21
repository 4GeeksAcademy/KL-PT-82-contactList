import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContacts } from "../ContactContext";
import ContactForm from "../components/ContactForm";

export default function EditContactPage() {
  const { id } = useParams();
  const contactId = parseInt(id, 10);
  const { contacts, updateContact } = useContacts();
  const navigate = useNavigate();

  const contact = contacts.find((c) => c.id === contactId);

  if (!contact) return <p>Contact not found</p>;

  function handleSave(updated) {
    updateContact(contactId, updated);
    navigate("/");
  }

  return <ContactForm contact={contact} onSave={handleSave} onCancel={() => navigate("/")} />;
}
