import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (projectId: string) => {
    const response = await api.get(`/tasks/getTasks/${projectId}`);
    return response.data;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData: {
    title: string;
    description: string;
    dueDate: string | null;
    priority: string;
    status: string;
    projectId: string;
  }) => {
    const response = await api.post("/tasks/createTask", taskData);
    return response.data;
  }
);
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
  }) => {
    const { id, ...updateData } = taskData;
    const response = await api.patch(`/tasks/updateTask/${id}`, updateData);
    return response.data;
  }
);
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    await api.delete(`/tasks/deleteTask/${id}`);
    return id;
  }
);

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

interface TaskState {
  tasks: Task[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: "idle",
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.loading = "succeeded";
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
