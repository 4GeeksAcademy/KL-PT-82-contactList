import React from "react";

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("");

export default function ContactItem({ contact, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 15px",
        cursor: "pointer",
        backgroundColor: isSelected ? "#eef6fb" : "transparent",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "#3498db",
          color: "#fff",
          fontWeight: "700",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 15,
          userSelect: "none",
        }}
      >
        {getInitials(contact.name)}
      </div>
      <div>{contact.name}</div>
    </div>
  );
}
