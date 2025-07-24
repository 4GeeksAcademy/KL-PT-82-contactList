import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const initializeAgendaAndFetch = async () => {
      try {
        const createRes = await fetch('https://playground.4geeks.com/todo/todos/kelvinL', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: "Kelvin Placeholder",
            email: "kelvin@example.com",
            phone: "000-000-0000",
            address: "Init Agenda",
            agenda_slug: "kelvinL"
          }),
        });

        if (!createRes.ok && createRes.status !== 409) {
          console.error(`Failed to create agenda: ${createRes.status} ${createRes.statusText}`);
        } else {
          const createData = await createRes.json();
          console.log("Agenda initialized or already exists:", createData);
        }

        const fetchRes = await fetch('https://playground.4geeks.com/todo/todos/kelvinL');
        if (!fetchRes.ok) {
          console.error(`API error ${fetchRes.status}: ${fetchRes.statusText}`);
          setContacts([]);
          return;
        }
        const contactsData = await fetchRes.json();
        if (Array.isArray(contactsData)) {
          setContacts(contactsData);
        } else {
          console.warn("Expected an array, got:", contactsData);
          setContacts([]);
        }
      } catch (err) {
        console.error("Network or parsing error:", err);
        setContacts([]);
      }
    };

    initializeAgendaAndFetch();
  }, []);

  return (
    <div className="text-center mt-5" style={styles.container}>
      <p style={styles.subtitle}>
        Manage your contacts smarter and faster.
      </p>

      <Link to="/contacts" className="btn btn-primary" style={styles.button}>
        Go to Contacts
      </Link>

      <h2 className="mt-5">Your Contacts</h2>
      <ul className="list-unstyled">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.full_name}</strong> — {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: "0 auto",
    padding: 20,
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: 30,
  },
  button: {
    fontSize: "1.25rem",
    padding: "12px 30px",
  },
};
