import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "./CustomError/CustomError.js";

export const endPointNotFound = (_req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const generalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errorMessage = error.message || "Error";
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({ errorMessage });
};
