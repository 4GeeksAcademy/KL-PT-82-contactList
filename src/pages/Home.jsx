import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
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
      if (!res.ok) throw new Error(`Failed to fetch contacts: ${res.status} ${res.statusText}`);
      const data = await res.json();
      dispatch({ type: "set_contacts", payload: data.contacts });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();

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

    createAgenda();
    fetchContacts();
  }, []);

  const deleteContact = async (contactID) => {
    try {
      const res = await fetch(
        `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${contactID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
      console.log(res);
      fetchContacts();
      return res.ok;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <p className="lead">Manage your contacts smarter and faster.</p>
        <h2>Your Contacts</h2>
      </div>

      {loading && <div className="text-center"><p>Loading contacts...</p></div>}
      {error && <div className="alert alert-danger text-center">Error: {error}</div>}
      {!loading && !error && store.contacts.length === 0 && (
        <div className="text-center">
          <p>No contacts found.</p>
        </div>
      )}

      <div className="row">
        {store.contacts.map((contact) => (
          <div key={contact.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-center">{contact.name || "No Name"}</h5>
                <p className="card-text"><strong>Email:</strong> {contact.email}</p>
                <p className="card-text"><strong>Phone:</strong> {contact.phone}</p>
                <p className="card-text"><strong>Address:</strong> {contact.address}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-danger btn-sm" onClick={() => deleteContact(contact.id)}>Delete</button>
                <Link className="btn btn-primary btn-sm" to={`/edit/${contact.id}`}>Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
