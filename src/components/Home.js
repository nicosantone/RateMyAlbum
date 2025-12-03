// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section
      className="home-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Rate My Album 💽🎧
      </h1>

      <p style={{ fontSize: "1.2rem", maxWidth: "600px", marginBottom: "2rem" }}>
        Descubrí, calificá y escribí reseñas de tus discos favoritos.
        Convertite en el crítico musical que siempre fuiste 🎵
      </p>

      <Link
        to="/project"
        style={{
          background: "#ff4b2b",
          padding: "0.9rem 2rem",
          borderRadius: "8px",
          fontSize: "1.1rem",
          color: "#fff",
          textDecoration: "none",
          transition: "0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.background = "#ff3a1a")}
        onMouseOut={(e) => (e.target.style.background = "#ff4b2b")}
      >
        ⚡ Hacé tu reseña
      </Link>

      <footer style={{ marginTop: "3rem", opacity: 0.8 }}>
        <p>© 2025 Rate My Album - By Nicolás Santone</p>
      </footer>
    </section>
  );
}

export default Home;
