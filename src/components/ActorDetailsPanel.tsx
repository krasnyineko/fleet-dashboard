import React from "react";
import { Actor } from "../types";

interface ActorDetailsPanelProps {
  actor: Actor | null;
  onClose: () => void;
}

const ActorDetailsPanel: React.FC<ActorDetailsPanelProps> = ({ actor, onClose }) => {
  if (!actor) {
    return null;
  }

  return (
    <div className={`actor-details-panel ${actor ? "open" : ""}`}>
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <h2>{actor.name}</h2>
      <p><strong>Status:</strong> {actor.status}</p>
      <p><strong>Location:</strong> {actor.location.lat.toFixed(4)}, {actor.location.lng.toFixed(4)}</p>
      <p><strong>Battery:</strong> {Math.floor(Math.random() * 100)}%</p>
      <p><strong>Task History:</strong></p>
      <ul>
        <li>{actor.status} at {new Date().toLocaleTimeString()}</li>
      </ul>
    </div>
  );
};

export default ActorDetailsPanel;
