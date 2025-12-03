// src/components/Contact.js
import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", file: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Tus datos fueron enviados exitosamente y en los próximos días recibirás una respuesta al mail que nos proporcionaste 🙌");
    setForm({ name: "", email: "", message: "", file: null });
  };

  const labelStyle = { textAlign: "left", fontSize: "1rem", fontWeight: "500", marginTop: "0.5rem" };

  return (
    <section 
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "4rem 2rem",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", fontWeight: "600" }}>
        Contacto 📬
      </h1>

      <p style={{ fontSize: "1.15rem", opacity: 0.9, marginBottom: "2rem" }}>
        ¿Te gustaría ser parte de Rate My Album? Dejanos tus datos 👇
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

        {/* Nombre */}
        <label style={labelStyle}>NOMBRE</label>
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            padding: "0.9rem",
            borderRadius: "8px",
            border: "1px solid #333",
            background: "#1e293b",
            color: "#fff",
            fontSize: "1rem"
          }}
        />

        {/* Email */}
        <label style={labelStyle}>EMAIL</label>
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            padding: "0.9rem",
            borderRadius: "8px",
            border: "1px solid #333",
            background: "#1e293b",
            color: "#fff",
            fontSize: "1rem"
          }}
        />

        {/* CV */}
        <label style={labelStyle}>TU CV</label>
        <input
          type="file"
          name="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          style={{
            padding: "0.9rem",
            borderRadius: "8px",
            border: "1px solid #333",
            background: "#0f172a",
            color: "#fff",
            fontSize: "1rem"
          }}
        />

        {/* Mensaje */}
        <label style={labelStyle}>DEJANOS UN MENSAJE (OPCIONAL)</label>
        <textarea
          name="message"
          placeholder="Escribí un mensaje..."
          value={form.message}
          onChange={handleChange}
          required
          rows="5"
          style={{
            padding: "0.9rem",
            borderRadius: "8px",
            border: "1px solid #333",
            background: "#1e293b",
            color: "#fff",
            fontSize: "1rem"
          }}
        ></textarea>

        <button
          type="submit"
          style={{
            background: "#ff4b2b",
            padding: "0.9rem",
            borderRadius: "8px",
            fontSize: "1.1rem",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseOver={(e) => (e.target.style.background = "#ff3a1a")}
          onMouseOut={(e) => (e.target.style.background = "#ff4b2b")}
        >
          Enviar ✅
        </button>
      </form>
    </section>
  );
}

export default Contact;
