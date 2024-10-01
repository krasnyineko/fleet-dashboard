import React, { useState } from "react";
import { Actor, Task, tasks } from "../types";

interface ActorListProps {
  actors: Actor[];
  onSelect: (actor: Actor) => void;
  onTaskChange: (actor: Actor, newTask: Task) => void;
}

// Utility function to get color by status
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
const ActorList: React.FC<ActorListProps> = ({
  actors,
  onSelect,
  onTaskChange,
}) => {
  const [selectedActorId, setSelectedActorId] = useState<number | null>(null);

  const handleTaskChange = (
    actor: Actor,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newTask = event.target.value as Task;
    onTaskChange(actor, newTask);
  };

  return (
    <div className="actor-list">
      <h3>Fleet</h3>
      <ul>
        {actors.map((actor) => (
          <li
            key={actor.id}
            className="actor-item"
            onClick={() => onSelect(actor)}
          >
            <div className="actor-info">
              <span
                className="status-indicator"
                style={{ backgroundColor: getColorByStatus(actor.status) }}
              ></span>
              <div className="actor-details">
                <span className="actor-name">
                  {actor.name} - {actor.status}
                </span>
              </div>
            </div>
            <select
              className="task-dropdown"
              value={actor.status}
              onChange={(e) => handleTaskChange(actor, e)}
            >
              {tasks.map((task) => (
                <option key={task} value={task}>
                  {task}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActorList;
