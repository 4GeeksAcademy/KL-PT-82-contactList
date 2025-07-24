import React, { createContext, useContext, useState, useEffect } from "react";

const ContactContext = createContext();

const AGENDA_SLUG = "kelvinL"; // Change this to your agenda slug

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch contacts for your agenda slug on mount
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `'https://playground.4geeks.com/contact/'${AGENDA_SLUG}`
        );
        if (!res.ok) throw new Error("Failed to fetch contacts");
        const data = await res.json();
        setContacts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Add a new contact
  const addContact = async (contact) => {
    setLoading(true);
    try {
      const res = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: contact.name, // map your form field 'name' to API's 'full_name'
          email: contact.email,
          phone: contact.phone,
          agenda_slug: AGENDA_SLUG,
        }),
      });
      if (!res.ok) throw new Error("Failed to add contact");
      const newContact = await res.json();
      setContacts((prev) => [...prev, newContact]);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update existing contact
  const updateContact = async (id, updated) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://playground.4geeks.com/apis/fake/contact/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: updated.name,
            email: updated.email,
            phone: updated.phone,
            agenda_slug: AGENDA_SLUG,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to update contact");
      const updatedContact = await res.json();
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? updatedContact : c))
      );
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a contact
  const deleteContact = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://playground.4geeks.com/apis/fake/contact/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete contact");
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContext.Provider
      value={{ contacts, addContact, updateContact, deleteContact, loading, error }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactContext);
}
