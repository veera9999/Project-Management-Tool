import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import projectReducer from "../slices/projectSlice";
import taskReducer from "../slices/taskSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
