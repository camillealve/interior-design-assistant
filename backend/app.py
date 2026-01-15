import os
import time
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")

print("Loaded Replicate API key:", REPLICATE_API_TOKEN[:4] + "****")


app = Flask(__name__)
CORS(app)

HEADERS = {
    "Authorization": f"Token {REPLICATE_API_TOKEN}",
    "Content-Type": "application/json",
}

API_URL = "https://api.replicate.com/v1/predictions"

@app.route("/generate", methods=["POST"])
def generate_design():
    data = request.json
    room_type = data.get("roomType", "Room")
    style = data.get("style", "Modern")
    prompt = f"{style} {room_type} interior design, photorealistic"

    # Step 1: Create prediction
    payload = {
        "version": "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",  # Stable Diffusion v1.5 model
        "input": {"prompt": prompt, "num_outputs": 3}
    }

    try:
        response = requests.post(API_URL, headers=HEADERS, json=payload)
        prediction = response.json()
        prediction_id = prediction.get("id")
        if not prediction_id:
            return jsonify({"error": "Failed to start prediction"}), 500
    except Exception as e:
        return jsonify({"error": f"Error starting prediction: {e}"}), 500

    # Step 2: Poll until finished
    for _ in range(60):  # max 60 polls
        time.sleep(2)  # wait 2 seconds between polls
        poll = requests.get(f"{API_URL}/{prediction_id}", headers=HEADERS).json()
        status = poll.get("status")
        if status == "succeeded":
            images = poll.get("output", [])
            return jsonify({
                "roomType": room_type,
                "style": style,
                "images": images
            })
        elif status == "failed":
            return jsonify({"error": "AI generation failed"}), 500

    # Timeout
    return jsonify({"error": "AI generation timed out"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)

