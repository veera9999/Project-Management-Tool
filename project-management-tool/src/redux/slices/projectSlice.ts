import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await axios.get("/api/projects");
    return response.data;
  }
);

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface ProjectState {
  projects: Project[]; // Ensure this is an array type
}

const initialState: ProjectState = {
  projects: [], // Initialize with an empty array
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
    });
  },
});

export default projectSlice.reducer;
