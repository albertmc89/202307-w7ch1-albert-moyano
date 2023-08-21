import { type Request, type Response } from "express";
import { things } from "../../data/data";

const getThings = (_req: Request, res: Response) => {
  res.status(200).json({ things });
};

export default getThings;
