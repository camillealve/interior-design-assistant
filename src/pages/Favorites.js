function Favorites() {
  const favorites =
    JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <div className="page">
      <h1>Favorites</h1>

      {favorites.length === 0 && (
        <p>No saved designs yet.</p>
      )}

      <div className="grid">
        {favorites.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="Saved design"
            className="card"
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
