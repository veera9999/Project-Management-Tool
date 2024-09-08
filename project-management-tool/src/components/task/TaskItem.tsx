import React from "react";
import { deleteTask } from "../../redux/slices/taskSlice";
import { useAppDispatch } from "../../redux/store/store";
import { Task } from "../../redux/slices/taskSlice";
import { format } from "date-fns";
import { useState } from "react";
import UpdateTask from "../../components/task/UpdateTask";
interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [showUpdateTaskForm, setShowUpdateTaskForm] = useState(false);

  const handleUpdateTask = () => {
    setShowUpdateTaskForm(true);
  };
  const taskProps = {
    task,
    setShowUpdateTaskForm,
  };
  return (
    <div>
      <li key={task._id}>
        <strong>{task.title}</strong>
        <p>{task.status}</p>
        <p>{task.priority}</p>
        <p>Due Date: {format(new Date(task.dueDate), "yyyy-MM-dd")}</p>
        <button onClick={handleUpdateTask}>update</button>
        <button onClick={() => dispatch(deleteTask(task._id))}>Delete</button>
      </li>
      {showUpdateTaskForm && <UpdateTask {...taskProps} />}
    </div>
  );
};

export default TaskItem;
