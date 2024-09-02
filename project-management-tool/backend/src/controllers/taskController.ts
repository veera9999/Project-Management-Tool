import { Request, Response } from "express";
import Task from "../models/Task";

export const createTask = async (req: Request, res: Response) => {
  const { title, description, dueDate, priority, status, projectId } = req.body;
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      project: projectId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.find({ project: projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = Task.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task Not Found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, status } = req.body;
  try {
    const task = Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        dueDate,
        priority,
        status,
      },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
