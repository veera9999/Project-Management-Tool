import React from "react";

interface CreateProjectProps {
  newProjectTitle: string;
  setNewProjectTitle: React.Dispatch<React.SetStateAction<string>>;
  newProjectDescription: string;
  setNewProjectDescription: React.Dispatch<React.SetStateAction<string>>;
  handleCreateProject: () => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({
  newProjectTitle,
  setNewProjectTitle,
  newProjectDescription,
  setNewProjectDescription,
  handleCreateProject,
}) => {
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
