import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Actor } from "../types";
import L from "leaflet";

interface ActorMapProps {
  actors: Actor[];
  selectedActorId: number | null; // Receive the selected actor ID
}

// Function to assign colors based on actor status
const getColorByStatus = (status: string) => {
    switch (status) {
      case "Idle":
        return "#4a90e2"; // Light blue for modern feel
      case "Working":
        return "#50e3c2"; // Modern green
      case "Charging":
        return "#f5a623"; // Orange
      case "Unpacking":
        return "#e94e77"; // Pinkish red
      default:
        return "#9b9b9b"; // Gray for unknown status
    }
  };

  const createCustomIcon = (status: string, isSelected: boolean) => {
    const color = getColorByStatus(status);
    const selectedClass = isSelected ? "selected" : "";
    return L.divIcon({
      className: `custom-icon ${selectedClass}`,
      html: `
        <div style="
          background-color: ${color}; 
          width: 20px; 
          height: 20px; 
          border-radius: 50%; 
          transition: transform 0.3s ease;
        "></div>`,
      iconAnchor: [10, 10], // Center the icon
    });
  };
  

const ActorMap: React.FC<ActorMapProps> = ({ actors, selectedActorId }) => {
  return (
    <MapContainer
      center={[30.2672, -97.7431]}
      zoom={13}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {actors.map((actor) => (
        <Marker
          key={actor.id}
          position={[actor.location.lat, actor.location.lng]}
          icon={createCustomIcon(actor.status, actor.id === selectedActorId)} // Highlight selected actor
        >
          <Popup>
            <strong>{actor.name}</strong> <br />
            Status: {actor.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ActorMap;
