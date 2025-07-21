import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContacts } from "../ContactContext";
import ContactDetails from "../components/ContactDetails";

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

  if (!contact) return <p>Contact not found</p>;

  return <ContactDetails contact={contact} onDelete={handleDelete} />;
}
