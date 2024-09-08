import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store/store";
import CreateProject from "../../components/project/CreateProject";
import CreateTask from "../../components/task/CreateTask";
import Logout from "../../components/authorization/Logout";
import { fetchProjects, createProject } from "../../redux/slices/projectSlice";
import {
  fetchTasks,
  deleteTask,
  createTask,
} from "../../redux/slices/taskSlice";
import ProjectItem from "../../components/project/ProjectItem";
import TaskItem from "../../components/task/TaskItem";
import "./Dashboard.css";
import taskninja from "./taskninja.png";
import { format } from "date-fns";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useSelector((state: RootState) => state.project);
  const { tasks } = useSelector((state: RootState) => state.task);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | null>(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProjectId) {
      dispatch(fetchTasks(selectedProjectId));
    }
  }, [dispatch, selectedProjectId]);

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

  const handleCreateTask = () => {
    if (selectedProjectId) {
      dispatch(
        createTask({
          title: newTaskTitle,
          description: newTaskDescription,
          dueDate: newTaskDueDate ? newTaskDueDate.toISOString() : null,
          priority: "Medium",
          status: "pending",
          projectId: selectedProjectId,
        })
      );
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskDueDate(null);
      setShowTaskForm(false);
    }
  };

  const projectProps = {
    newProjectTitle,
    setNewProjectTitle,
    newProjectDescription,
    setNewProjectDescription,
    handleCreateProject,
  };

  const taskProps = {
    newTaskTitle,
    setNewTaskTitle,
    newTaskDescription,
    setNewTaskDescription,
    newTaskDueDate,
    setNewTaskDueDate,
    handleCreateTask,
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="navbar">
        <img src={taskninja} alt="taskninja" />
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
