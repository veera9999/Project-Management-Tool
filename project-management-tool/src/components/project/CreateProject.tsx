import React from "react";
import { useState } from "react";
import { useAppDispatch } from "../../redux/store/store";
import { createProject } from "../../redux/slices/projectSlice";

interface CreateProjectProps {
  setShowProjectForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProject: React.FC<CreateProjectProps> = ({
  setShowProjectForm,
}) => {
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const dispatch = useAppDispatch();
  const handleCreateProject = () => {
    dispatch(
      createProject({
        title: newProjectTitle,
        description: newProjectDescription,
      })
    );
    setNewProjectTitle("");
    setNewProjectDescription("");
    setShowProjectForm(false);
  };
  return (
    <div className="dialog">
      <div className="dialog-content">
        <input
          type="text"
          value={newProjectTitle}
          onChange={(e) => setNewProjectTitle(e.target.value)}
          placeholder="Project Title"
        />
        <textarea
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
          placeholder="Project Description"
        />
        <button onClick={handleCreateProject}>Save Project</button>
      </div>
    </div>
  );
};

export default CreateProject;
