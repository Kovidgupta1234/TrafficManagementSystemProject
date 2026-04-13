from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict

app = FastAPI(title="Traffic Management Analytics API")

# Allow CORS for all origins for simplicity in development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/analytics/metrics")
def get_dashboard_metrics() -> Dict:
    return {
        "vehicles": 14280,
        "congestion": 42,
        "trafficData": [45, 52, 38, 61, 55, 70, 65, 80, 74, 68, 73, 78],
        "speedData": [60, 55, 48, 62, 58, 40, 45, 52, 58, 61, 63, 60]
    }

@app.get("/analytics/hourly-traffic")
def get_hourly_traffic() -> Dict:
    return {
        "hours": ["6AM","7AM","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM"],
        "volumes": [1200,2800,4200,5800,4100,3800,4500,4800,4200,4600,5900,6200,5400,4800,3200,2100],
        "max_volume": 6200
    }

@app.get("/analytics/zone-performance")
def get_zone_performance() -> List[Dict]:
    return [
        { "name": "North Zone", "congestion": 68, "speed": 42, "accidents": 3, "color": "#00d4ff" },
        { "name": "South Zone", "congestion": 45, "speed": 58, "accidents": 1, "color": "#00ff88" },
        { "name": "East Zone", "congestion": 82, "speed": 28, "accidents": 5, "color": "#ff3366" },
        { "name": "West Zone", "congestion": 31, "speed": 65, "accidents": 0, "color": "#ffcc00" },
    ]

@app.get("/analytics/route-performance")
def get_route_performance() -> List[Dict]:
    return [
        { "route": "NH-44 Corridor", "speed": 65, "cong": 28, "time": "22 min", "inc": 0, "perf": 94 },
        { "route": "Ring Road East", "speed": 42, "cong": 61, "time": "38 min", "inc": 2, "perf": 67 },
        { "route": "MG Road", "speed": 28, "cong": 85, "time": "55 min", "inc": 4, "perf": 32 },
        { "route": "Outer Ring Road", "speed": 72, "cong": 19, "time": "18 min", "inc": 0, "perf": 98 },
        { "route": "Brigade Road", "speed": 18, "cong": 92, "time": "70 min", "inc": 6, "perf": 14 },
    ]

@app.get("/analytics/weekly-congestion")
def get_weekly_congestion() -> List[Dict]:
    return [
        { "day": "Mon", "peak": 82, "off": 34 },
        { "day": "Tue", "peak": 76, "off": 28 },
        { "day": "Wed", "peak": 88, "off": 31 },
        { "day": "Thu", "peak": 71, "off": 25 },
        { "day": "Fri", "peak": 95, "off": 38 },
        { "day": "Sat", "peak": 62, "off": 22 },
        { "day": "Sun", "peak": 45, "off": 18 },
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
