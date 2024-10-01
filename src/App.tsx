import React, { useEffect, useState } from "react";
import "./App.css";
import { Actor, Task } from "./types";
import ActorMap from "./components/ActorMap";
import ActorList from "./components/ActorList";
import ActorDetailsPanel from "./components/ActorDetailsPanel";

const austinCenter = { lat: 30.2672, lng: -97.7431 };

// Simulate random movement in coordinates
const getRandomCoordinate = (base: number, range: number) => {
  return base + (Math.random() - 0.5) * range;
};

// Cycle through task statuses for realism
const cycleStatus = (currentStatus: Task): Task => {
  const statuses: Task[] = ["Idle", "Working", "Charging", "Unpacking"];
  const currentIndex = statuses.indexOf(currentStatus);
  return statuses[(currentIndex + 1) % statuses.length];
};

const mockActors: Actor[] = [
  {
    id: 1,
    name: "Actor 1",
    status: "Idle",
    location: {
      lat: getRandomCoordinate(austinCenter.lat, 0.02),
      lng: getRandomCoordinate(austinCenter.lng, 0.02),
    },
  },
  {
    id: 2,
    name: "Actor 2",
    status: "Working",
    location: {
      lat: getRandomCoordinate(austinCenter.lat, 0.02),
      lng: getRandomCoordinate(austinCenter.lng, 0.02),
    },
  },
  {
    id: 3,
    name: "Actor 3",
    status: "Charging",
    location: {
      lat: getRandomCoordinate(austinCenter.lat, 0.02),
      lng: getRandomCoordinate(austinCenter.lng, 0.02),
    },
  },
];

const App: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>(mockActors);
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActors((prevActors) =>
        prevActors.map((actor) => ({
          ...actor,
          location: {
            lat: getRandomCoordinate(actor.location.lat, 0.01),
            lng: getRandomCoordinate(actor.location.lng, 0.01),
          },
          status: cycleStatus(actor.status), // Change the status cyclically
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  const handleSelect = (actor: Actor) => {
    setSelectedActor(actor);
  };

  const handleTaskChange = (actor: Actor, newTask: Task) => {
    setActors((prevActors) =>
      prevActors.map((a) =>
        a.id === actor.id ? { ...a, status: newTask } : a
      )
    );
  };

  const closeDetailsPanel = () => {
    setSelectedActor(null);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-title">Fleet Dashboard</div>
        <div className="navbar-buttons">
          <button className="nav-button">Settings</button>
          <button className="nav-button">Help</button>
        </div>
      </nav>

      <div className="dashboard">
        <ActorList
          actors={actors}
          onSelect={handleSelect}
          onTaskChange={handleTaskChange}
        />
        <ActorMap actors={actors} selectedActorId={selectedActor?.id || null} />
        <ActorDetailsPanel actor={selectedActor} onClose={closeDetailsPanel} />
      </div>
    </div>
  );
};

export default App;
