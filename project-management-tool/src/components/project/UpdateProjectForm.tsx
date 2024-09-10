import React from "react";
import { useState } from "react";
import { Project, updateProject } from "../../redux/slices/projectSlice";
import { useAppDispatch } from "../../redux/store/store";
interface projectProps {
  project: Project;
  setShowUpdateProjectForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const UpdateProjectForm: React.FC<projectProps> = ({
  project,
  setShowUpdateProjectForm,
}) => {
  const [title, setTilte] = useState(project.title);
  const [status, setStatus] = useState(project.status);
  const [description, setDescription] = useState(project.description);
  const dispatch = useAppDispatch();
  const handleUpdate = () => {
    dispatch(
      updateProject({
        id: project._id,
        title: title,
        description: description,
        status: status,
      })
    );
    setShowUpdateProjectForm(false);
  };
  return (
    <div className="dialog">
      <div className="dialog-content">
        <h3>Edit Project</h3>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTilte(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"></textarea>
        </label>
        <br />
        <label>
          Status:
          <select
            name="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}>
            <option value="active">active</option>
            <option value="finished">finished</option>
          </select>
        </label>
        <br />
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default UpdateProjectForm;
