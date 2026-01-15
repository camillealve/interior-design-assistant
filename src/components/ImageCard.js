function ImageCard({ imageUrl, onSave }) {
  return (
    <div className="card">
      <img src={imageUrl} alt="Interior design idea" />
      <button onClick={onSave}>Save to Favorites</button>
    </div>
  );
}

export default ImageCard;
