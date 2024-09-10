import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { updateTask } from "../../redux/slices/taskSlice";
import { useAppDispatch } from "../../redux/store/store";
import { Task } from "../../redux/slices/taskSlice";
import { format } from "date-fns";
import "./UpdateTask.css";
interface taskProperties {
  task: Task;
  setShowUpdateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const UpdateTask: React.FC<taskProperties> = ({
  task,
  setShowUpdateTaskForm,
}) => {
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const [newTaskDescription, setNewTaskDescription] = useState(
    task.description
  );
  const [newPriority, setNewPriority] = useState(task.priority);
  const [newStatus, setNewStatus] = useState(task.status);
  const dispatch = useAppDispatch();
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(event.target.value);
  };
  const handleUpdateTask = () => {
    dispatch(
      updateTask({
        id: task._id,
        title: newTaskTitle,
        description: newTaskDescription,
        dueDate: newTaskDueDate ? newTaskDueDate.toISOString() : null,
        status: newStatus,
        priority: newPriority,
      })
    );
    setShowUpdateTaskForm(false);
  };
  return (
    <div className="dialog">
      <div className="dialog-content">
        <h3>Update Task</h3>
        <label htmlFor="input">Title</label>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Task Title"
        />

        <label htmlFor="description">description:</label>
        <textarea
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Task Description"></textarea>

        <label htmlFor="dueDate">
          Current dueDate: {format(new Date(task.dueDate), "yyyy-MM-dd")}
        </label>
        <DatePicker
          selected={newTaskDueDate}
          onChange={(date: Date | null) => setNewTaskDueDate(date)}
          dateFormat="yyyy-MM-dd" // This formats the date in the input field
          placeholderText="Select due date"
        />
        <div className="task-selector-attr">
          <div className="task-attr">
            <label htmlFor="status">Status: </label>
            <select
              className="selector-attr"
              value={newStatus}
              onChange={handleStatusChange}>
              <option value="pending">pending</option>
              <option value="finished">finished</option>
            </select>
          </div>
          <div className="task-attr">
            <label htmlFor="priority">Priority: </label>
            <select
              className="selector-attr"
              value={newPriority}
              onChange={(e) => {
                setNewPriority(e.target.value);
              }}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        <button onClick={handleUpdateTask}>Save Task</button>
      </div>
    </div>
  );
};

export default UpdateTask;
