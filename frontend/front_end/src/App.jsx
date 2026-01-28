import { useState, useEffect } from "react";
import MapView from "./MapView";
import Snow from "./snow";

function App() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routeData, setRouteData] = useState(null);

  const findRoute = async () => {
    if (!source || !destination) return;

    const res = await fetch(
      `http://localhost:8000/route?source=${source}&destination=${destination}`
    );
    const data = await res.json();
    setRouteData(data);
  };

  useEffect(() => {
    if (!source || !destination) return;
    const i = setInterval(findRoute, 5000);
    return () => clearInterval(i);
  }, [source, destination]);

  const trafficColor =
    routeData?.traffic === "HIGH"
      ? "red"
      : routeData?.traffic === "MODERATE"
      ? "orange"
      : "lightgreen";

  return (
    <div className="app-container">
      <Snow />

      <header className="header">
        <h1>🚦 Traffic AI Agent</h1>
        <p>Real-time route optimization system</p>
      </header>

      <div className="card">
        <div className="input-row">
          <input
            placeholder="Source (e.g. Delhi)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <input
            placeholder="Destination (e.g. Noida)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button onClick={findRoute}>Find Route</button>
        </div>

        {routeData && (
          <div className="status-row">
            <div className="status-box">
              <span className="label">Traffic</span>
              <div className="value" style={{ color: trafficColor }}>
                {routeData.traffic}
              </div>
            </div>

            <div className="status-box">
              <span className="label">Agent</span>
              <div className="value">
                {routeData.rerouted ? "🚨 Rerouted" : "✅ Stable"}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="map-wrapper">
        <MapView
          sourceCoords={routeData?.source_coords}
          destinationCoords={routeData?.destination_coords}
        />
      </div>
    </div>
  );
}

export default App;
