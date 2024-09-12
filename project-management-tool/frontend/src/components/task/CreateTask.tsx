import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "../../redux/store/store";
import { createTask } from "../../redux/slices/taskSlice";
import { motion } from "framer-motion";
import styled from "styled-components";

const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  resize: vertical;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const StyledDatePickerInput = styled(Input)`
  width: 100%;
  z-index: 5;
`;
const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: #4a4e69;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6896;
  }
`;

interface CreateTaskProps {
  selectedProjectId: string | null;
  setShowTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  selectedProjectId,
  setShowTaskForm,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();

  const handleCreateTask = () => {
    if (selectedProjectId) {
      dispatch(
        createTask({
          title: title,
          description: description,
          dueDate: dueDate ? dueDate.toISOString() : null,
          priority: "Medium",
          status: "pending",
          projectId: selectedProjectId,
        })
      );
      setTitle("");
      setDescription("");
      setDueDate(null);
      setShowTaskForm(false);
    }
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        rows={4}
      />
      <DatePicker
        selected={dueDate}
        onChange={(date: Date | null) => setDueDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select due date"
        customInput={<StyledDatePickerInput />}
      />
      <Button
        onClick={handleCreateTask}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        Create Task
      </Button>
    </FormContainer>
  );
};

export default CreateTask;
