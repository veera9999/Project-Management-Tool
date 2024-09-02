import { Request, Response } from "express";
import Project from "../models/Project";
import { CustomRequest } from "../types/CustomRequest";
export const createProject = async (req: CustomRequest, res: Response) => {
  const { title, description, status } = req.body;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user.id;
  try {
    const project = new Project({
      title,
      description,
      status,
      createdBy: userId,
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProjects = async (req: CustomRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const projects = await Project.find({ createdBy: req.user.id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const project = await Project.findById(id);
    if (!project) {
      res.status(404).json({ message: "Project Not Found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    if (!project) {
      res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      res.status(404).json({ message: "Project Not Found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
