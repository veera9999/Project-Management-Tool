import { Tuple } from "@reduxjs/toolkit";
import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;
  project: mongoose.Schema.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    requiured: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;
