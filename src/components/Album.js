import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StarRating from "./StarRating";

const reviewsKey = (id) => `reviews_${id}`;

function escapeHtml(unsafe) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default function Album() {
  const { id } = useParams();
  const albumId = parseInt(id, 10);

  const [album, setAlbum] = useState(null);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://rma-backend-j9ew.onrender.com/albums/${albumId}`)
      .then(res => res.json())
      .then(data => {
        setAlbum(data);
        setLoading(false);
      });

    load();
  }, [albumId]);

  function load() {
    const stored = JSON.parse(localStorage.getItem(reviewsKey(albumId))) || [];
    setList(stored);
  }

  function save() {
    if (rating === 0 || text.trim() === "") {
      alert("Seleccioná una calificación y escribí una reseña.");
      return;
    }

    const stored = JSON.parse(localStorage.getItem(reviewsKey(albumId))) || [];
    if (editIndex !== null) {
      stored[editIndex] = { rating, review: text };
      setEditIndex(null);
    } else {
      stored.push({ rating, review: text });
    }

    localStorage.setItem(reviewsKey(albumId), JSON.stringify(stored));
    setText("");
    setRating(0);
    load();
  }

  function remove(i) {
    const stored = JSON.parse(localStorage.getItem(reviewsKey(albumId))) || [];
    stored.splice(i, 1);
    localStorage.setItem(reviewsKey(albumId), JSON.stringify(stored));
    load();
  }

  function edit(i) {
    const stored = JSON.parse(localStorage.getItem(reviewsKey(albumId))) || [];
    const r = stored[i];
    if (!r) return;
    setText(r.review);
    setRating(r.rating);
    setEditIndex(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (loading) return <p className="text-white">Cargando...</p>;
  if (!album) return <p className="text-white">Álbum no encontrado.</p>;

  const totalStars = list.reduce((s, r) => s + r.rating, 0);
  const avg = list.length ? (totalStars / list.length).toFixed(1) : null;

  return (
    <div>
      <Link to="/project" className="btn btn-link mb-3">← Volver</Link>

      <div className="card mx-auto bg-dark text-white" style={{ maxWidth: 900 }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={album.cover} className="img-fluid rounded-start" alt={album.title} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{album.title}</h3>
              <p className="card-text"><strong>{album.artist}</strong> — {album.releaseYear}</p>

              <div className="mb-2">
                <StarRating value={rating} onChange={setRating} />
              </div>

              <textarea
                className="form-control mb-2"
                rows="4"
                placeholder="Escribí tu reseña"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <button className="btn btn-primary" onClick={save}>
                {editIndex !== null ? "Actualizar reseña" : "Enviar reseña"}
              </button>

              <div className="mt-3" id="output">
                {list.length > 0 ? (
                  <>
                    <div className="mb-3 p-2 rounded bg-secondary text-white">
                      ⭐ <strong>{avg}</strong> / 5 <small>({list.length} reseña{list.length > 1 ? "s" : ""})</small>
                    </div>

                    {list.map((r, i) => (
                      <div key={i} className="border p-2 mb-2 rounded bg-dark text-white d-flex justify-content-between align-items-start">
                        <div>
                          ⭐ {r.rating} estrellas<br />
                          <div dangerouslySetInnerHTML={{ __html: escapeHtml(r.review).replace(/\n/g, "<br/>") }} />
                        </div>
                        <div>
                          <button className="btn btn-sm btn-warning me-1" onClick={() => edit(i)}>✏️</button>
                          <button className="btn btn-sm btn-danger" onClick={() => remove(i)}>🗑️</button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <span className="text-muted">Todavía no hay reseñas para este disco.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
