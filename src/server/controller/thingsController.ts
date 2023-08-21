import { type NextFunction, type Request, type Response } from "express";
import { things } from "../../data/data.js";

export const getThings = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).json({ things });
};

export const deleteThingById = (req: Request, _res: Response) => {
  const { idThing } = req.params;

  const thingToDeletePosition = things.findIndex(
    (thing) => thing.id === Number(idThing)
  );

  things.splice(thingToDeletePosition, 1);
};
