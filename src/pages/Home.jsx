import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const agendaSlug = "kelvinL";

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch contacts: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setContacts(data);
        } else if (data.contacts && Array.isArray(data.contacts)) {
          // Just in case API wraps contacts in an object
          setContacts(data.contacts);
        } else {
          setContacts([]);
        }
      } catch (err) {
        setError(err.message);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="text-center mt-5" style={styles.container}>
      <p style={styles.subtitle}>Manage your contacts smarter and faster.</p>

      <Link to="/contacts" className="btn btn-primary" style={styles.button}>
        Go to Contacts
      </Link>

      <h2 className="mt-5">Your Contacts</h2>

      {loading && <p>Loading contacts...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && contacts.length === 0 && <p>No contacts found.</p>}

      <ul className="list-unstyled">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.full_name || contact.name || "No Name"}</strong> — {contact.email}
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
