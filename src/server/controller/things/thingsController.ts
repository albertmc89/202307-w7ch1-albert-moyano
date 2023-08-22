import { type NextFunction, type Request, type Response } from "express";
import { things } from "../../../data/data.js";

export const getThings = (_req: Request, res: Response) => {
  res.status(200);
  res.json({ things });
};

export const getThingById = (req: Request, res: Response) => {
  const { idThing } = req.params;

  const thingById = things.find((thing) => thing.id === Number(idThing));

  res.status(200).json(thingById);
};

export const deleteThingById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idThing } = req.params;

  const thingToDeletePosition = things.findIndex(
    (thing) => thing.id === Number(idThing)
  );

  next(new Error());

  if (thingToDeletePosition === -1) {
    res.status(404).json({ message: "User not found" });
  }

  things.splice(thingToDeletePosition, 1);

  res.status(200).json({ message: "Thing deleted" });
};
