import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Home = () => {
  const { store, dispatch } = useGlobalReducer()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const agendaSlug = "kelvinL";

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
      dispatch({ type: "set_contacts", payload: data.contacts })

    } catch (err) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchContacts()

    const createAgenda = async () => {
      try {
        const res = await fetch(
          `https://playground.4geeks.com/contact/agendas/${agendaSlug}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
          }
        );
        console.log(res);
        return res.ok;
      } catch (err) {
        setError(err.message);
      }
    };



    createAgenda()
    fetchContacts();
  }, []);

  const deleteContact = async (contactID) => {
    try {
      const res = await fetch(
        `https://playground.4geeks.com/contact/agendas/kelvinL/contacts/${contactID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
      console.log(res);
      fetchContacts()
      return res.ok;
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="text-center mt-5" style={styles.container}>
      <p style={styles.subtitle}>Manage your contacts smarter and faster.</p>

      <Link to="/contacts" className="btn btn-primary" style={styles.button}>
        Go to Contacts
      </Link>

      <h2 className="mt-5">Your Contacts</h2>

      {loading && <p>Loading contacts...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && store.contacts.length === 0 && <p>No contacts found.</p>}

      <ul className="list-unstyled">
        {store.contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.name || "No Name"}</strong> — {contact.email}
            <button className="btn btn-danger" onClick={() => deleteContact(contact.id)}></button>
            <Link className= "btn btn-primary" to = {"/contacts/edit/" + contact.id}></Link>
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
