import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store/store";
import { fetchProjects } from "../redux/slices/projectSlice";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects = useSelector((state: RootState) => state.project.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <h1>Project Dashboard</h1>
      <ul>
        {projects?.length ? (
          projects.map((project) => (
            <li key={project.id}>
              <Link to={`/project/${project.id}`}>{project.title}</Link>
            </li>
          ))
        ) : (
          <p>No projects available.</p> // Fallback content
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
