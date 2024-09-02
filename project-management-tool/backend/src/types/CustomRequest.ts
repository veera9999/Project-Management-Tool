import { Request } from "express";

export interface CustomRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}
