import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function AlbumDetail() {
  const { id } = useParams();

  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  const storageKey = `reviews_${id}`;
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/albums/${id}`)
      .then(res => res.json())
      .then(data => {
        setAlbum(data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey)) || [];
    setReviews(stored);
  }, [id]);

  const saveToStorage = (data) =>
    localStorage.setItem(storageKey, JSON.stringify(data));

  const handleSubmit = () => {
    if (rating === 0 || reviewText.trim() === "") {
      alert("Seleccioná estrellas y escribí una reseña.");
      return;
    }

    const newReview = { rating, review: reviewText };
    let updatedReviews = [...reviews];

    if (editIndex !== null) {
      updatedReviews[editIndex] = newReview;
      setEditIndex(null);
    } else {
      updatedReviews.push(newReview);
    }

    setReviews(updatedReviews);
    saveToStorage(updatedReviews);

    setRating(0);
    setHover(0);
    setReviewText("");
  };

  const handleDelete = (index) => {
    const updated = [...reviews];
    updated.splice(index, 1);
    setReviews(updated);
    saveToStorage(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setRating(reviews[index].rating);
    setReviewText(reviews[index].review);
  };

  if (loading) return <h2 style={{ color: "white" }}>Cargando...</h2>;
  if (!album) return <h2 style={{ color: "white" }}>Disco no encontrado</h2>;

  const average =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
      <div
        style={{
          background: "#222",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "600px",
        }}
      >
        <h2>{album.title}</h2>
        <p><strong>{album.artist}</strong> — {album.releaseYear}</p>

        <img
          src={album.cover}
          alt={album.title}
          style={{
            width: "250px",
            display: "block",
            margin: "0 auto 20px auto",
            borderRadius: "10px",
          }}
        />
        {average && (
          <div
            style={{
              background: "#444",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            ⭐ <strong>{average}</strong> / 5
            <br />
            <small>({reviews.length} reseña{reviews.length !== 1 ? "s" : ""})</small>
          </div>
        )}

        <div style={{ fontSize: "28px", textAlign: "center", marginBottom: "10px" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: "pointer",
                color: (hover || rating) >= star ? "#ffcc00" : "gray",
              }}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Escribí tu reseña..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          style={{ width: "100%", height: "80px", marginBottom: "10px", padding: "8px" }}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "8px",
            background: "#0d6efd",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          {editIndex !== null ? "Guardar cambios" : "Enviar reseña"}
        </button>

        {reviews.length === 0 ? (
          <p style={{ color: "#bbb" }}>Todavía no hay reseñas para este disco.</p>
        ) : (
          reviews.map((r, i) => (
            <div
              key={i}
              style={{
                background: "#333",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              ⭐ {r.rating} / 5
              <p style={{ margin: "5px 0" }}>{r.review}</p>

              <button
                onClick={() => handleEdit(i)}
                style={{
                  marginRight: "10px",
                  background: "#ffc107",
                  border: "none",
                  padding: "5px 8px",
                  borderRadius: "4px",
                }}
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(i)}
                style={{
                  background: "#dc3545",
                  border: "none",
                  padding: "5px 8px",
                  borderRadius: "4px",
                  color: "white",
                }}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AlbumDetail;
