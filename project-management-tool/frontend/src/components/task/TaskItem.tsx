import React, { useState } from "react";
import { deleteTask, updateTask } from "../../redux/slices/taskSlice";
import { useAppDispatch } from "../../redux/store/store";
import { Task } from "../../redux/slices/taskSlice";
import { format } from "date-fns";
import { motion } from "framer-motion";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskItemContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 250px;
  margin-bottom: 3rem;

  &:hover {
    background: linear-gradient(45deg, #2c3e50, #3498db);
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const TaskTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  word-break: break-word;
`;

const TaskInfo = styled.div`
  margin-bottom: 15px;
  font-size: 0.9rem;
  word-break: break-word;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  background-color: ${(props) =>
    props.status === "pending"
      ? "#f39c12"
      : props.status === "in_progress"
      ? "#3498db"
      : props.status === "completed"
      ? "#2ecc71"
      : "#95a5a6"};
`;

const PriorityBadge = styled.span<{ priority: string }>`
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  background-color: ${(props) =>
    props.priority === "High"
      ? "#e74c3c"
      : props.priority === "Medium"
      ? "#f39c12"
      : props.priority === "Low"
      ? "#3498db"
      : "#95a5a6"};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: auto;
`;

const Button = styled(motion.button)`
  padding: 5px 10px;
  background: linear-gradient(45deg, #2c3e50, #3498db);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #3498db, #2c3e50);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.9rem;
`;

const StyledDatePicker = styled(DatePicker as any)`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.9rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  dateFormat: string;
  placeholderText: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selected,
  onChange,
  dateFormat,
  placeholderText,
}) => (
  <StyledDatePicker
    selected={selected}
    onChange={onChange}
    dateFormat={dateFormat}
    placeholderText={placeholderText}
  />
);

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleUpdate = () => {
    dispatch(
      updateTask({
        id: editedTask._id,
        title: editedTask.title,
        description: editedTask.description,
        dueDate: editedTask.dueDate,
        priority: editedTask.priority,
        status: editedTask.status,
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  if (isEditing) {
    return (
      <TaskItemContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}>
        <Input
          type="text"
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask({ ...editedTask, title: e.target.value })
          }
          placeholder="Task Title"
        />
        <Textarea
          value={editedTask.description}
          onChange={(e) =>
            setEditedTask({ ...editedTask, description: e.target.value })
          }
          placeholder="Task Description"
          rows={3}
        />
        <CustomDatePicker
          selected={editedTask.dueDate ? new Date(editedTask.dueDate) : null}
          onChange={(date: Date | null) =>
            setEditedTask({
              ...editedTask,
              dueDate: date ? date.toISOString() : editedTask.dueDate,
            })
          }
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a due date"
        />
        <Select
          value={editedTask.priority}
          onChange={(e) =>
            setEditedTask({ ...editedTask, priority: e.target.value })
          }>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Select>
        <Select
          value={editedTask.status}
          onChange={(e) =>
            setEditedTask({ ...editedTask, status: e.target.value })
          }>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>
        <ButtonContainer>
          <Button onClick={handleUpdate}>Save</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </ButtonContainer>
      </TaskItemContainer>
    );
  }

  return (
    <TaskItemContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}>
      <TaskTitle>{task.title}</TaskTitle>
      <TaskInfo>Description: {task.description}</TaskInfo>
      <TaskInfo>
        Status: <StatusBadge status={task.status}>{task.status}</StatusBadge>
      </TaskInfo>
      <TaskInfo>
        Priority:{" "}
        <PriorityBadge priority={task.priority}>{task.priority}</PriorityBadge>
      </TaskInfo>
      <TaskInfo>
        Due Date:{" "}
        {task.dueDate
          ? format(new Date(task.dueDate), "yyyy-MM-dd")
          : "Not set"}
      </TaskInfo>
      <ButtonContainer>
        <Button
          onClick={() => setIsEditing(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          Edit
        </Button>
        <Button
          onClick={handleDelete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          Delete
        </Button>
      </ButtonContainer>
    </TaskItemContainer>
  );
};

export default TaskItem;

// const StyledDatePicker = styled(DatePicker as any)`
//   width: 100%;
//   padding: 8px;
//   margin-bottom: 15px;
//   border: none;
//   border-radius: 5px;
//   background: rgba(255, 255, 255, 0.2);
//   color: white;
//   font-size: 0.9rem;

//   &::placeholder {
//     color: rgba(255, 255, 255, 0.7);
//   }
// `;

// interface CustomDatePickerProps {
//   selected: Date | null;
//   onChange: (date: Date | null) => void;
//   dateFormat: string;
//   placeholderText: string;
// }

// const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
//   selected,
//   onChange,
//   dateFormat,
//   placeholderText,
// }) => (
//   <StyledDatePicker
//     selected={selected}
//     onChange={onChange}
//     dateFormat={dateFormat}
//     placeholderText={placeholderText}
//   />
// );

//         <CustomDatePicker
//           selected={editedTask.dueDate ? new Date(editedTask.dueDate) : null}
//           onChange={(date: Date | null) =>
//             setEditedTask({
//               ...editedTask,
//               dueDate: date ? date.toISOString() : editedTask.dueDate,
//             })
//           }
//           dateFormat="yyyy-MM-dd"
//           placeholderText="Select a due date"
//         />
