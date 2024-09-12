import React, { useState } from "react";
import { useAppDispatch } from "../../redux/store/store";
import { updateProject, Project } from "../../redux/slices/projectSlice";
import { motion } from "framer-motion";
import styled from "styled-components";

const UpdateFormOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
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

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;

  &:hover {
    background-color: #c0392b;
  }
`;

interface UpdateProjectProps {
  project: Project;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProject: React.FC<UpdateProjectProps> = ({
  project,
  setIsUpdating,
}) => {
  const [editedProject, setEditedProject] = useState(project);
  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    dispatch(
      updateProject({
        id: editedProject._id,
        title: editedProject.title,
        description: editedProject.description,
        status: editedProject.status,
      })
    );
    setIsUpdating(false);
  };

  return (
    <UpdateFormOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <FormContainer
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}>
        <Input
          type="text"
          value={editedProject.title}
          onChange={(e) =>
            setEditedProject({ ...editedProject, title: e.target.value })
          }
          placeholder="Project Title"
        />
        <Textarea
          value={editedProject.description}
          onChange={(e) =>
            setEditedProject({ ...editedProject, description: e.target.value })
          }
          placeholder="Project Description"
          rows={4}
        />
        <Select
          value={editedProject.status}
          onChange={(e) =>
            setEditedProject({ ...editedProject, status: e.target.value })
          }>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="on_hold">On Hold</option>
        </Select>
        <Button onClick={handleUpdate}>Update Project</Button>
        <Button onClick={() => setIsUpdating(false)}>Cancel</Button>
      </FormContainer>
    </UpdateFormOverlay>
  );
};

export default UpdateProject;
