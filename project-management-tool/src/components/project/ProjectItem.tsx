import React from "react";
import { Project } from "../../redux/slices/projectSlice"; // Import Project type if it's exported
import { useAppDispatch } from "../../redux/store/store";
import { updateProject, deleteProject } from "../../redux/slices/projectSlice";

// Define the prop types for the component
interface ProjectItemProps {
  project: Project;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  setSelectedProjectId,
}) => {
  const dispatch = useAppDispatch();

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    dispatch(
      updateProject({
        id: project._id,
        title: project.title,
        description: project.description,
        status: newStatus,
      })
    );
  };

  return (
    <li key={project._id} onClick={() => setSelectedProjectId(project._id)}>
      {project.title}
      <select
        className="project-status"
        value={project.status}
        onChange={handleStatusChange}>
        <option value="active">Active</option>
        <option value="finished">Finished</option>
      </select>
      <button onClick={() => dispatch(deleteProject(project._id))}>
        Delete
      </button>
    </li>
  );
};

export default ProjectItem;
