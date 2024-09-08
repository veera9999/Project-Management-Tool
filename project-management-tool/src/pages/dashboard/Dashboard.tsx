import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store/store";
import CreateProject from "../../components/project/CreateProject";
import CreateTask from "../../components/task/CreateTask";
// import UpdateTask from "../../components/task/UpdateTask";
import Logout from "../../components/authorization/Logout";
import { fetchProjects } from "../../redux/slices/projectSlice";
import { fetchTasks } from "../../redux/slices/taskSlice";
import ProjectItem from "../../components/project/ProjectItem";
import TaskItem from "../../components/task/TaskItem";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useSelector((state: RootState) => state.project);
  const { tasks } = useSelector((state: RootState) => state.task);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  // const [showUpdateTaskForm, setShowUpdateTaskForm] = useState(false);
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProjectId) {
      dispatch(fetchTasks(selectedProjectId));
    }
  }, [dispatch, selectedProjectId]);

  const projectProps = {
    setShowProjectForm,
  };

  const taskProps = {
    selectedProjectId,
    setShowTaskForm,
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="navbar">
        <h1>Dashboard</h1>
        <Logout />
      </nav>
      <div className="dashboard">
        <aside className="sidebar">
          <div className="project-header">
            <h2>Projects</h2>
            <button onClick={() => setShowProjectForm(!showProjectForm)}>
              Create Project
            </button>
          </div>
          {showProjectForm && <CreateProject {...projectProps} />}
          <div className="project-list">
            <ul>
              {projects.map((project) => (
                <ProjectItem
                  key={project._id}
                  project={project}
                  setSelectedProjectId={setSelectedProjectId}
                />
              ))}
            </ul>
          </div>
        </aside>
        <main className="task-list">
          <h2>Tasks</h2>
          {selectedProjectId && (
            <div>
              <button onClick={() => setShowTaskForm(!showTaskForm)}>
                Create Task
              </button>
              {showTaskForm && <CreateTask {...taskProps} />}
              <ul>
                {tasks.map((task) => (
                  <TaskItem key={task._id} task={task} />
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
