# Interior Design Assistant

A full-stack React + Python app that generates AI-powered interior design ideas using Replicate’s Stable Diffusion model.

---

## Features

- Submit a room type and style via a React frontend form.
- Backend (Flask) calls Replicate AI to generate photorealistic interior design images.
- Results page displays generated images and allows saving favorites.
- Placeholder fallback for testing before AI integration.

---

## Tech Stack

- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Python, Flask, Flask-CORS, Requests
- **AI:** Replicate Stable Diffusion API
- **Storage:** LocalStorage (for favorites)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/camillealve/interior-design-assistant.git
cd interior-design-assistant
```

---

### 2. Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# On Windows: venv\Scripts\activate

pip install -r requirements.txt
```

> If `requirements.txt` does not exist, install manually:

```bash
pip install flask flask-cors requests python-dotenv
```

#### 2a. Add Replicate API Key

1. Create a `.env` file in the `backend/` folder:

```
REPLICATE_API_TOKEN=sk_your_api_key_here
```

2. **Do NOT commit `.env` to Git.** `.env` is ignored via `.gitignore`.

---

### 3. Frontend Setup

```bash
cd ../frontend  # or wherever your React app is
npm install
```

---

### 4. Running the Application

#### Backend:

```bash
cd backend
source venv/bin/activate  # activate virtual environment
python3 app.py
```

- Backend runs on: `http://localhost:5001`

#### Frontend:

```bash
cd frontend
npm start
```

- Frontend runs on: `http://localhost:3000`

> Make sure the frontend fetch URL matches your backend port (`5001`).

---

### 5. Using the App

1. Open the app in your browser (`http://localhost:3000`)
2. Fill out **Room Type** and **Style** on the Home page.
3. Submit → redirected to **Design Results** page.
4. Wait a few seconds while AI generates images.
5. Click **Save to Favorites** on images you like.

---

### 6. Testing API Independently

You can test the backend independently with `curl`:

```bash
curl -X POST http://localhost:5001/generate \
-H "Content-Type: application/json" \
-d '{"roomType":"Bedroom","style":"Modern"}'
```

- Should return JSON with `images` array once AI finishes.

---

### 7. Notes & Best Practices

- Never commit `.env` with API keys.
- If using GitHub, add `.env` to `.gitignore`.
- AI generation may take several seconds — frontend shows a loading message during this time.
- For deployment, set the API key in environment variables of your hosting platform (Vercel, Heroku, etc.).

