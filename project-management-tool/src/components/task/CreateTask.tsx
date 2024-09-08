import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "../../redux/store/store";
import { createTask } from "../../redux/slices/taskSlice";
import { useState } from "react";
interface CreateTaskProps {
  selectedProjectId: string | null;
  setShowTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  selectedProjectId,
  setShowTaskForm,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();
  const handleCreateTask = () => {
    if (selectedProjectId) {
      dispatch(
        createTask({
          title: newTaskTitle,
          description: newTaskDescription,
          dueDate: newTaskDueDate ? newTaskDueDate.toISOString() : null,
          priority: "Medium",
          status: "pending",
          projectId: selectedProjectId,
        })
      );
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskDueDate(null);
      setShowTaskForm(false);
    }
  };
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

export default CreateTask;
