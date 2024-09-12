import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await api.get("/projects/getProjects");
    return response.data;
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData: { title: string; description: string }) => {
    const response = await api.post("/projects/createProject", projectData);
    return response.data;
  }
);
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (projectData: {
    id: string;
    title: string;
    description: string;
    status: string;
  }) => {
    const response = await api.patch(
      `/projects/updateProject/${projectData.id}`,
      projectData
    );
    return response.data;
  }
);
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string) => {
    await api.delete(`/projects/deleteProject/${id}`);
    return id;
  }
);

export interface Project {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface ProjectState {
  projects: Project[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: "idle",
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.projects = action.payload;
          state.loading = "succeeded";
        }
      )
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.projects.push(action.payload);
        }
      )
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.projects = state.projects.map((project) =>
            project._id === action.payload._id ? action.payload : project
          );
        }
      )
      .addCase(
        deleteProject.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.projects = state.projects.filter(
            (project) => project._id !== action.payload
          );
        }
      );
  },
});

export default projectSlice.reducer;
