import { type Request, type Response } from "express";
import { things } from "../../data/data.js";

export const getThings = (_req: Request, res: Response) => {
  res.status(200).json({ things });
};

export const deleteThingById = (req: Request, res: Response) => {
  const { idThing } = req.params;

  const thingToDeletePosition = things.findIndex(
    (thing) => thing.id === Number(idThing)
  );

  things.splice(thingToDeletePosition, 1);

  res.status(200).json({ thingToDeletePosition });
};
