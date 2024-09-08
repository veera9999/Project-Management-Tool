import React from "react";
import { deleteTask, updateTask } from "../../redux/slices/taskSlice";
import { useAppDispatch } from "../../redux/store/store";
import { Task } from "../../redux/slices/taskSlice";
import { format } from "date-fns";
interface TaskItemProps {
  task: Task;
}
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    dispatch(
      updateTask({
        id: task._id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        status: newStatus,
      })
    );
  };

  return (
    <li key={task._id}>
      <strong>{task.title}</strong>
      <select
        className="task-status"
        value={task.status}
        onChange={handleStatusChange}>
        <option value="pending">pending</option>
        <option value="finished">finished</option>
      </select>
      <p>{task.priority}</p>
      <p>Due Date: {format(new Date(task.dueDate), "yyyy-MM-dd")}</p>
      <button>update</button>
      <button onClick={() => dispatch(deleteTask(task._id))}>Delete</button>
    </li>
  );
};

export default TaskItem;
