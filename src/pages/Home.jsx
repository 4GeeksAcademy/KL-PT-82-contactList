import React from "react";
import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Home = () => {
  return (
    <div className="text-center mt-5" style={styles.container}>
      <p style={styles.subtitle}>
        Manage your contacts smarter and faster.
      </p>
      <Link to="/contacts" className="btn btn-primary" style={styles.button}>
        Go to Contacts
      </Link>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: "0 auto",
    padding: 20,
  },
  title: {
    fontSize: "3rem",
    marginBottom: 20,
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
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
