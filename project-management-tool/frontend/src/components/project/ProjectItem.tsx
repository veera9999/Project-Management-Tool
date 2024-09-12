import React, { useState } from "react";
import { Project } from "../../redux/slices/projectSlice";
import { useAppDispatch } from "../../redux/store/store";
import { deleteProject } from "../../redux/slices/projectSlice";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import UpdateProject from "./UpdateProject";

const ProjectItemContainer = styled(motion.div)<{ isSelected: boolean }>`
  background: ${(props) =>
    props.isSelected ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"};
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 1rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background: linear-gradient(45deg, #2c3e50, #3498db);
  }
`;

const ProjectTitle = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  margin: 0.5rem 0;
`;

const ProjectStatus = styled.span<{ status: string }>`
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  background-color: ${(props) =>
    props.status === "active"
      ? "#4a4e69"
      : props.status === "finished"
      ? "#9fb1d4"
      : "#bccad6"};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  background: linear-gradient(45deg, #2c3e50, #3498db);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
  cursor: pointer;
`;

interface ProjectItemProps {
  project: Project;
  setSelectedProjectId: (id: string) => void;
  isSelected: boolean;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  setSelectedProjectId,
  isSelected,
}) => {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUpdating(true);
  };

  return (
    <>
      <ProjectItemContainer
        isSelected={isSelected}
        onClick={() => setSelectedProjectId(project._id)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectStatus status={project.status}>{project.status}</ProjectStatus>
        <ProjectDescription>{project.description}</ProjectDescription>
        <ButtonContainer>
          <Button
            onClick={handleUpdateClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            Update
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteProject(project._id));
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            Delete
          </Button>
        </ButtonContainer>
      </ProjectItemContainer>
      <AnimatePresence>
        {isUpdating && (
          <UpdateProject project={project} setIsUpdating={setIsUpdating} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectItem;
