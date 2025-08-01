import React from "react";

const API_BASE_URL = "https://playground.4geeks.com/contact/agendas/kelvinL/contacts";

const AddContactForm = () => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

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

    // const contactData = {
    //   ...form,
    //   agenda_slug: AGENDA_SLUG,
    // };

    fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...form}),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        alert("Contact added!");
        
        setForm({ name: "", email: "", phone: "", address: "" });
      })
      .catch((err) => {
        console.error("Failed to add contact:", err);
        alert("Failed to add contact. Please try again.");
      });
  };

  return (
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
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContactForm;
