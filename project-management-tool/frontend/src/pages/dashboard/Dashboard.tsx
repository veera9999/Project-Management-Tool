import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store/store";
import CreateProject from "../../components/project/CreateProject";
import CreateTask from "../../components/task/CreateTask";
import Logout from "../../components/authorization/Logout";
import { fetchProjects } from "../../redux/slices/projectSlice";
import { fetchTasks } from "../../redux/slices/taskSlice";
import ProjectItem from "../../components/project/ProjectItem";
import TaskItem from "../../components/task/TaskItem";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const DashboardWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(45deg, #2c3e50, #3498db);
  color: white;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
  position: relative;
`;

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const AnimatedShape = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const DashboardTitle = styled.h1`
  font-family: "Noto Sans JP", sans-serif;
  font-size: 2.5rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  flex: 1;
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  overflow-y: auto;
  max-width: 300px;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const TaskContainer = styled.main`
  flex: 2;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const TaskHeader = styled.div`
  margin-bottom: 1rem;
`;

const TaskListContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const TaskList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 4rem;
  padding: 1rem;
  padding-bottom: 2rem;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Button = styled(motion.button)`
  padding: 12px 24px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 1rem;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useSelector((state: RootState) => state.project);
  const { tasks } = useSelector((state: RootState) => state.task);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProjectId) {
      dispatch(fetchTasks(selectedProjectId));
    }
  }, [dispatch, selectedProjectId]);

  const handleProjectClick = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
  }, []);

  const shapes = Array.from({ length: 15 }, () => ({
    size: Math.random() * 80 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <DashboardWrapper>
      <StyledBackground>
        {shapes.map((shape, index) => (
          <AnimatedShape
            key={index}
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
            }}
            animate={{
              x: ["0%", "100%", "0%"],
              y: ["0%", "100%", "0%"],
              rotate: [0, 360],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </StyledBackground>
      <ContentWrapper>
        <Navbar>
          <DashboardTitle>Dashboard</DashboardTitle>
          <Logout />
        </Navbar>
        <MainContent>
          <Sidebar>
            <h2>Projects</h2>
            <Button
              style={{ background: "linear-gradient(45deg, #2c3e50, #3498db)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProjectForm(!showProjectForm)}>
              Create Project
            </Button>
            <AnimatePresence>
              {showProjectForm && (
                <CreateProject setShowProjectForm={setShowProjectForm} />
              )}
            </AnimatePresence>
            <ProjectList>
              {projects.map((project) => (
                <ProjectItem
                  key={project._id}
                  project={project}
                  setSelectedProjectId={handleProjectClick}
                  isSelected={project._id === selectedProjectId}
                />
              ))}
            </ProjectList>
          </Sidebar>
          <TaskContainer>
            <TaskHeader>
              <h2>Tasks</h2>
              {selectedProjectId && (
                <Button
                  style={{
                    background: "linear-gradient(45deg, #2c3e50, #3498db)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTaskForm(!showTaskForm)}>
                  Create Task
                </Button>
              )}
              <AnimatePresence>
                {showTaskForm && (
                  <CreateTask
                    selectedProjectId={selectedProjectId}
                    setShowTaskForm={setShowTaskForm}
                  />
                )}
              </AnimatePresence>
            </TaskHeader>
            <TaskListContainer>
              <TaskList>
                {tasks.map((task) => (
                  <TaskItem key={task._id} task={task} />
                ))}
              </TaskList>
            </TaskListContainer>
          </TaskContainer>
        </MainContent>
      </ContentWrapper>
    </DashboardWrapper>
  );
};

export default Dashboard;
