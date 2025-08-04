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
import AddContactPage from "./pages/AddContactPage";
import EditContact from "./pages/EditContact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      {/* Existing routes */}
      <Route path="/" element={<Home />} />
      <Route path="/edit/:contactId" element={<EditContact />} />
      <Route path="/demo" element={<Demo />} />

      {/* Add standalone /add route */}
      <Route path="/add" element={<AddContactPage />} />

      {/* Contact app routes */}
    
    </Route>
  )
);
