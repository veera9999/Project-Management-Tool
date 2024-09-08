import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface CreateTaskProps {
  newTaskTitle: string;
  setNewTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  newTaskDescription: string;
  setNewTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  newTaskDueDate: Date | null;
  setNewTaskDueDate: React.Dispatch<React.SetStateAction<Date | null>>;
  handleCreateTask: () => void;
}

const CreateProject: React.FC<CreateTaskProps> = ({
  newTaskTitle,
  setNewTaskTitle,
  newTaskDescription,
  setNewTaskDescription,
  newTaskDueDate,
  setNewTaskDueDate,
  handleCreateTask,
}) => {
  return (
    <div className="dialog">
      <div className="dialog-content">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Task Title"
        />
        <textarea
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Task Description"></textarea>
        <DatePicker
          selected={newTaskDueDate}
          onChange={(date: Date | null) => setNewTaskDueDate(date)}
          dateFormat="yyyy-MM-dd" // This formats the date in the input field
          placeholderText="Select due date"
        />
        <button onClick={handleCreateTask}>Save Task</button>
      </div>
    </div>
  );
};

export default CreateProject;
