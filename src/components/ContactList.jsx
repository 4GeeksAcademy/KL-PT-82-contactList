import React from "react";
import ContactItem from "./ContactItem";

export default function ContactList({ contacts, selectedId, onSelect }) {
  return (
    <div style={{ overflowY: "auto", flexGrow: 1 }}>
      {contacts.length ? (
        contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            isSelected={contact.id === selectedId}
            onSelect={() => onSelect(contact.id)}
          />
        ))
      ) : (
        <div style={{ padding: 10, color: "#666" }}>No contacts found</div>
      )}
    </div>
  );
}
