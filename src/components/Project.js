// src/pages/Project.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Project() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("https://rma-backend-j9ew.onrender.com/albums")
      .then(res => res.json())
      .then(data => setAlbums(data))
      .catch(err => console.error("Error cargando álbumes:", err));
  }, []);

  function chunkArray(array, chunkSize) {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  }

  const albumChunks = chunkArray(albums, 3);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-white">Catálogo de Álbumes</h2>

      {albums.length === 0 ? (
        <p className="text-center text-white">Cargando álbumes...</p>
      ) : (
        <div id="albumsCarousel" className="carousel slide" data-bs-ride="false" data-bs-interval="false">

          <div className="carousel-indicators">
            {albumChunks.map((_, idx) => (
              <button
                key={idx}
                type="button"
                data-bs-target="#albumsCarousel"
                data-bs-slide-to={idx}
                className={idx === 0 ? "active" : ""}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="carousel-inner">
            {albumChunks.map((chunk, idx) => (
              <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
                <div className="row justify-content-center">
                  {chunk.map(album => (
                    <div className="col-md-4 mb-4 d-flex justify-content-center" key={album.id}>
                      <div className="card" style={{ width: "22rem" }}>
                        <img src={album.cover} className="card-img-top" alt={album.title} />

                        <div className="card-body">
                          <h5 className="card-title">{album.title}</h5>
                          <p className="card-text">
                            {album.artist} ({album.releaseYear})
                          </p>
                          <Link to={`/album/${album.id}`} className="btn btn-primary">
                            Hacer una reseña
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#albumsCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
            <span className="visually-hidden">Anterior</span>
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#albumsCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      )}
    </div>
  );
}
