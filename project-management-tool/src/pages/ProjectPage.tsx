import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchTasks } from "../redux/slices/taskSlice";
import { RootState, useAppDispatch } from "../redux/store/store";

const ProjectPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);

  useEffect(() => {
    dispatch(fetchTasks(id!));
  }, [dispatch, id]);

  return (
    <div className="project-page">
      <h2>Tasks for Project {id}</h2>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectPage;
