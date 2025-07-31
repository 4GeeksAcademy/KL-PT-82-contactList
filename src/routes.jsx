import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

// Import your contact app pages here
import ContactListPage from "./pages/ContactListPage";
import ContactDetailPage from "./pages/ContactDetailsPage";
import AddContactPage from "./pages/AddContactPage";
import EditContactPage from "./pages/EditContactPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      {/* Existing routes */}
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />

      {/* Add standalone /add route */}
      <Route path="/add" element={<AddContactPage />} />

      {/* Contact app routes */}
      <Route path="/contacts" element={<ContactListPage />} />
      <Route path="/contacts/contact/:id" element={<ContactDetailPage />} />
      {/* <Route path="/contacts/add" element={<AddContactPage />} /> */}
      <Route path="/contacts/edit/:id" element={<EditContactPage />} />
    </Route>
  )
);
