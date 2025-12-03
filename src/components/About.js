// src/components/About.js
import React from "react";

function About() {
  return (
    <section 
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "4rem 2rem",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "600" }}>
        Sobre Rate My Album 🎧
      </h1>

      <p style={{ fontSize: "1.15rem", opacity: 0.9, lineHeight: "1.8" }}>
        Rate My Album es una plataforma simple y moderna donde podés explorar discos,
        calificarlos y dejar tus reseñas como si fueras un verdadero crítico musical.
      </p>

      <p style={{ fontSize: "1.15rem", opacity: 0.9, lineHeight: "1.8", marginTop: "1rem" }}>
        Este proyecto fue creado con React como parte del aprendizaje y crecimiento
        en desarrollo web, combinando estética, funcionalidad y pasión por la música.
      </p>

      <h3 style={{ marginTop: "2.5rem", fontSize: "1.6rem", fontWeight: "500" }}>
        Tecnologías utilizadas 🚀
      </h3>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem", fontSize: "1.1rem", opacity: 0.9 }}>
        <li>⚛️ React</li>
        <li>🎨 CSS y estilos modernos</li>
        <li>📦 React Router</li>
        <li>💾 LocalStorage para reseñas</li>
      </ul>

      <p style={{ marginTop: "3rem", fontSize: "0.95rem", opacity: 0.7 }}>
        © {new Date().getFullYear()} Rate My Album — Desarrollado por Nicolás Santone 🎵
      </p>
    </section>
  );
}

export default About;
