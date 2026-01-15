import { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";

function DesignResults() {
  // Read localStorage once
  const savedRoomData = localStorage.getItem("roomData");
  const roomData = savedRoomData ? JSON.parse(savedRoomData) : null;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Stop if roomData is missing
    if (!roomData) return;

    console.log("Sending fetch request with:", roomData);

    fetch("http://localhost:5001/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data);
        setImages(data.images || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []); // <-- empty dependency array prevents infinite requests

  // Handle no roomData
  if (!roomData) {
    return <p>Please submit room details from Home page first.</p>;
  }

  return (
    <div className="page">
      <h1>Design Results</h1>

      {loading && <p>Generating designs...</p>}

      {images.length === 0 && !loading && (
  <p>No images returned. Please try again.</p>
)}

<div className="grid">
  {images.map((url, index) => (
    <ImageCard
      key={index}
      imageUrl={url.startsWith("data:image") ? url : url}
      onSave={() => {
        const existing = JSON.parse(localStorage.getItem("favorites")) || [];
        localStorage.setItem("favorites", JSON.stringify([...existing, url]));
        alert("Saved to favorites!");
      }}
    />
  ))}
</div>

    </div>
  );
}

export default DesignResults;
