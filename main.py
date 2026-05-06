from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os

app = FastAPI(title="Agri-Safe API")

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static frontend files
frontend_dir = os.path.join(os.path.dirname(__file__), "..", "frontend")
app.mount("/static", StaticFiles(directory=frontend_dir), name="static")

@app.get("/")
async def serve_frontend():
    return FileResponse(os.path.join(frontend_dir, "index.html"))


# ─────────────────────────────────────────────
# 1. POST /api/detect/scan
# ─────────────────────────────────────────────
@app.post("/api/detect/scan")
async def detect_scan(image: UploadFile = File(...)):
    filename = (image.filename or "").lower()

    if "leaf" in filename:
        prediction = "Healthy Crop"
        advisory = (
            "Your crop looks healthy! Continue regular watering and monitor for pests weekly. "
            "Apply a balanced NPK fertilizer if leaves start yellowing."
        )
    elif "disease" in filename:
        prediction = "Leaf Blight"
        advisory = (
            "Leaf Blight detected. Remove infected leaves immediately to prevent spread. "
            "Apply a copper-based fungicide every 7–10 days. Avoid overhead irrigation."
        )
    else:
        prediction = "Unknown"
        advisory = (
            "Could not identify a specific condition. Ensure the image is clear and well-lit. "
            "Consult your local agricultural extension officer for an in-person diagnosis."
        )

    return {
        "prediction": prediction,
        "confidence": "85%",
        "advisory": advisory,
    }


# ─────────────────────────────────────────────
# 2. POST /api/chat/ask
# ─────────────────────────────────────────────
class ChatRequest(BaseModel):
    question: str

@app.post("/api/chat/ask")
async def chat_ask(payload: ChatRequest):
    q = payload.question.lower()

    if "yield" in q:
        reply = (
            "To improve crop yield: use certified quality seeds, maintain proper plant spacing, "
            "ensure consistent irrigation, and apply soil-tested fertilizers at the right growth stage."
        )
    elif "fertilizer" in q:
        reply = (
            "Use NPK fertilizer based on your soil test results. As a general guide: "
            "apply Nitrogen (N) for leaf growth, Phosphorus (P) for root development, "
            "and Potassium (K) for overall plant health and disease resistance."
        )
    elif "weather" in q:
        reply = (
            "Check the weather section on our platform for real-time conditions. "
            "Avoid spraying pesticides if rain is forecast within 24 hours — "
            "it reduces effectiveness and wastes resources."
        )
    else:
        reply = (
            "I'm your basic agriculture assistant. You can ask me about crop yield, "
            "fertilizers, weather-based spraying advice, or common crop diseases."
        )

    return {"reply": reply}


# ─────────────────────────────────────────────
# 3. GET /api/weather/current
# ─────────────────────────────────────────────
@app.get("/api/weather/current")
async def weather_current():
    return {
        "temperature": "28°C",
        "humidity": "72%",
        "condition": "Partly Cloudy",
        "wind_speed": "14 km/h",
        "rain_forecast": "No rain expected in the next 24 hours. Safe to spray.",
        "icon": "cloud-sun",
    }
