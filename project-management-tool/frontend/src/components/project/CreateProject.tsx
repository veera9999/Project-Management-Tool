import React, { useState } from "react";
import { useAppDispatch } from "../../redux/store/store";
import { createProject } from "../../redux/slices/projectSlice";
import { motion } from "framer-motion";
import styled from "styled-components";

const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
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

interface CreateProjectProps {
  setShowProjectForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProject: React.FC<CreateProjectProps> = ({
  setShowProjectForm,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();

  const handleCreateProject = () => {
    dispatch(createProject({ title, description }));
    setTitle("");
    setDescription("");
    setShowProjectForm(false);
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
        placeholder="Project Title"
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Project Description"
        rows={4}
      />
      <Button
        onClick={handleCreateProject}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        Create Project
      </Button>
    </FormContainer>
  );
};

export default CreateProject;
