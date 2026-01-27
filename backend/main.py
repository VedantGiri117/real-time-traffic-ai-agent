import random

CITY_COORDS = {
    "delhi": (28.6139, 77.2090),
    "noida": (28.5355, 77.3910),
    "gurgaon": (28.4595, 77.0266),
    "faridabad": (28.4089, 77.3178)
}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def get_alternative_route(coords):
    lat, lon = coords
    return (lat + 0.01, lon + 0.01)


@app.get("/")
def home():
    return {"status": "Backend is running 🚦"}

@app.get("/route")
def get_route(source: str, destination: str):
    src = source.lower()
    dest = destination.lower()

    if src not in CITY_COORDS or dest not in CITY_COORDS:
        return {"error": "City not supported yet"}

    traffic_level = random.choice(["LOW", "MODERATE", "HIGH"])

    source_coords = CITY_COORDS[src]
    destination_coords = CITY_COORDS[dest]

    rerouted = False

    # 🧠 AGENT DECISION
    if traffic_level == "HIGH":
        destination_coords = get_alternative_route(destination_coords)
        rerouted = True

    return {
        "source": source,
        "destination": destination,
        "source_coords": source_coords,
        "destination_coords": destination_coords,
        "traffic": traffic_level,
        "rerouted": rerouted,
        "message": "Route updated by agent"
    }


