import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";

function MapView({ sourceCoords, destinationCoords }) {
  const center = sourceCoords || [28.6139, 77.2090];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "400px", width: "100%", marginTop: "30px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {sourceCoords && <Marker position={sourceCoords} />}
      {destinationCoords && <Marker position={destinationCoords} />}

      {sourceCoords && destinationCoords && (
        <Polyline positions={[sourceCoords, destinationCoords]} />
      )}
    </MapContainer>
  );
}

export default MapView;
