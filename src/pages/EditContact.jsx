import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_BASE_URL = "https://playground.4geeks.com/contact/agendas/kelvinL/contacts";

export default function EditContact() {
  const navigate = useNavigate();
  const { contactId } = useParams()
  const id = Number(contactId);


  const { store } = useGlobalReducer();
  const contact = store.contacts.find(c => c.id === id);


  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    const fetchContact = async () => {

      if (contact) {
        setForm({
          name: contact.name,  // or contact.name if your API uses that
          email: contact.email,
          phone: contact.phone,
          address: contact.address
        });
      }
    }
    fetchContact()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Full Name is required");
      return;
    }
    if (!isValidEmail(form.email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!form.phone.trim()) {
      alert("Phone number is required");
      return;
    }
    if (!form.address.trim()) {
      alert("Address is required");
      return;
    }

    const contactData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      agenda_slug: "kelvinL"
    };

    fetch(`https://playground.4geeks.com/contact/agendas/kelvinL/contacts/${contactId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        alert("Edit Successful!");
        setForm({ name: "", email: "", phone: "", address: "" });
        navigate("/");
      })
      .catch((err) => {
        console.error("Failed to add contact:", err);
        alert("Failed to add contact. Please try again.");
      });
  };

  return (
    <div style={{ marginLeft: '4px' }}>
      <form onSubmit={handleSubmit} autoComplete="on" className="space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          autoComplete="tel"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          autoComplete="street-address"
          required
        />
        <div style={{ display: "flex", gap: "8px" }}>
          <button type="submit">Add Contact</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
