import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Actor } from "../types";
import L from "leaflet";

interface ActorMapProps {
  actors: Actor[];
  selectedActorId: number | null; 
}


const getColorByStatus = (status: string) => {
    switch (status) {
      case "Idle":
        return "#4a90e2"; 
      case "Working":
        return "#50e3c2";
      case "Charging":
        return "#f5a623";
      case "Unpacking":
        return "#e94e77";
      default:
        return "#9b9b9b";
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
      iconAnchor: [10, 10],
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
          icon={createCustomIcon(actor.status, actor.id === selectedActorId)} 
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
